import express from "express"
import { URL } from "../model/url.js";
import { PORT } from "../index.js";
export const router = express.Router();

router.get('/', async (req,res) => {
    const allUrls = await URL.find({})
    return res.render('home', {
        urls :allUrls,
        PORT : PORT,
    })
})
