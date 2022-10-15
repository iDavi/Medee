const express = require("express")
const app = express()
const config = require("./config")
app.use(express.static("./public"))


require("./services/news-scrapper.js")

setInterval(async () => {
    await require("./services/news-scrapper.js")
}, 1000 * 60 * 30)

app.listen(config.port, () => {
    console.log("Listening on port 3000")
})


const fs = require("fs")
fs.readdirSync("./routers/").forEach(file => {
    if (file.endsWith(".js")) {
        const router = require("./routers/" + file)
        app.use(router)
    }
})

module.exports = app