import express from "express";
import { handleGenerateNewUrl, handleGetAnalytics } from "../controller/url.js"; // Fixed: named import + .js extension

export const router = express.Router();

router.post("/", handleGenerateNewUrl);
router.get("/anylatics/:shortId", handleGetAnalytics )