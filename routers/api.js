const express = require("express")
const router = express.Router()

router.get("/api/get-news", async (req, res) => {
    const news = await require("../news.json")
    res.json(news)
}) 

module.exports = router