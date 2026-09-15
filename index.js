import express from "express";
import { router as UrlRoute } from "./routes/url.js";
import { connectMongo } from "./connection.js";
import { URL } from "./model/url.js";

const app = express();
const PORT = process.env.PORT || 4000;

// Connect to Database
connectMongo("mongodb://127.0.0.1:27017/short-url")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Middleware for parsing request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/url", UrlRoute);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;

  try {
    const entry = await URL.findOneAndUpdate(
      { shortId },
      {
        $push: {
          visitHistory: { timestamp: Date.now() },
        },
      },
      { new: true }
    );

    if (!entry) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    return res.redirect(entry.redirectUrl);
  } catch (error) {
    console.error("Error updating visit history:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => console.log(`Server is running on Port: ${PORT}`));