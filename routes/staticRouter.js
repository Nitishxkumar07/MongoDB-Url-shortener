import express from "express"
import { URL } from "../model/url.js";
import { PORT } from "../index.js";
import { restrictTo } from "../middlewares/auth.js";
export const router = express.Router();

router.get('/',restrictTo(["NORMAL"]),  async (req,res) => {
    const allUrls = await URL.find({ createdBy : req.user._id});
    return res.render('home', {
        urls :allUrls,
        PORT : PORT,
    })
})
router.get('/admin/urls',restrictTo(["NORMAL", "ADMIN"]),  async (req,res) => {
    const allUrls = await URL.find({});
    return res.render('home', {
        urls :allUrls,
        PORT : PORT,
    })
})

router.get("/signup", (req, res) =>{
    return res.render("signup");
})
router.get("/login", (req, res) =>{
    return res.render("login");
})
