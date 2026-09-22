import express from "express";
import { URL } from "../model/url.js";
import { restrictTo } from "../middlewares/auth.js";

export const router = express.Router();

// User dashboard (Only URLs created by current user)
router.get('/', restrictTo(["NORMAL","ADMIN"]), async (req, res) => {
    const allUrls = await URL.find({ createdBy: req.user._id });
    return res.render('home', {
        urls: allUrls,
        user: req.user,
    });
});

// Admin view (All URLs created across all users)
router.get('/admin/urls', restrictTo(["NORMAL", "ADMIN"]), async (req, res) => {
    const allUrls = await URL.find({}).populate("createdBy");
    return res.render('home', {
        urls: allUrls,
        user: req.user, // Passed req.user to prevent EJS ReferenceError
    });
});

router.get("/signup", (req, res) => {
    return res.render("signup");
});

router.get("/login", (req, res) => {
    return res.render("login");
});