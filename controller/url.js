import { nanoid } from "nanoid";
import { URL } from "../model/url.js";

export async function handleGenerateNewUrl(req, res) {
    const body = req.body;
    if (!body?.url) {
        return res.status(400).json({ error: "URL is required" });
    }

    const shortId = nanoid(8); // Generates an 8-character unique ID

    await URL.create({
        shortId: shortId,
        redirectUrl: body.url,
        visitHistory: [],
    });

    return res.render("home", {
        id : shortId,
    });
}
export async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId
    const result = await URL.findOne(shortId)
    return res.json({ clicks: result.visitHistory.length, analytics: result.visitHistory })
}