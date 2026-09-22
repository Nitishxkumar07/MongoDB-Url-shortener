import express from "express";
import { router as UrlRoute } from "./routes/url.js";
import { router as userRouter } from "./routes/user.js";
import { router } from "./routes/staticRouter.js";
import { connectMongo } from "./connection.js";
import { URL } from "./model/url.js";
import path from "node:path"
import cookieParser from "cookie-parser";
import { checkForAuthentication, restrictTo } from "./middlewares/auth.js";
const app = express();
export const PORT = process.env.PORT || 4000;

// Connect to Database
connectMongo("mongodb://127.0.0.1:27017/short-url")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Middleware for parsing request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication)

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

// app.get('/test',async (req, res) => {
//   const allUrls = await URL.find({});
//   return res.render('home', {
//     urls : allUrls,
//     port: PORT,
//   })
// })
// Routes
app.use("/url",  UrlRoute);
app.use("/user",  userRouter)
app.use("/",  router)
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