const express = require("express")
const router = express.Router()
const config = require("../config")

router.get("/", (req, res) => {
    res.sendFile(__dirname + "/content/home/home.html")
})
router.get("/style.css", (req, res) => {
    res.sendFile(__dirname + "/content/home/style.css")
})
router.get("/script.js", (req, res) => {
    res.sendFile(__dirname + "/content/home/script.js")
})
module.exports = router