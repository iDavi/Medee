const jsdom = require("jsdom");
const fetch = require("node-fetch");
const { JSDOM } = jsdom;
const fs = require("fs")

let news = []

let urls = {
    "JOVEM PAN": "https://jovempan.com.br/noticias/politica", // document.querySelectorAll("article")[18]
    "O Antagonista": "https://oantagonista.uol.com.br/mundo/", // document.querySelectorAll("article")[5]
    "BBC": "https://www.bbc.com/portuguese/topics/cvjp2jr0k9rt" // document.querySelector("ul[data-testid='topic-promos']").querySelectorAll("li")[23]
}
async function getNews() {
    //get news from Jovem Pan
    let response = await fetch(urls["JOVEM PAN"])
    let text = await response.text()
    let dom = new JSDOM(text)
    
    let articles = dom.window.document.querySelectorAll("article[class]")

    for (let i = 2; i < 15; i++) {
        let article = articles[i]
        
        let title = article.querySelector(".post-title").textContent
        let link = article.querySelector("a").href
        let image = article.querySelector("img").src
        let source = "Jovem Pan"
        news.push({
            title,
            link,
            image,
            source
        })
    }

    //get news from O Antagonista
    response =  await fetch(urls["O Antagonista"])
    text = await response.text()
    dom = new JSDOM(text)
    articles = dom.window.document.querySelectorAll("article")
    for (let i = 0; i < 6; i++) {
        let article = articles[i]
        let title = article.querySelectorAll("a")[1].textContent
        let link = article.querySelectorAll("a")[1].href
        let image = article.querySelector("img").src
        let source = "UOL"
        news.push({
            title,
            link,
            image,
            source
        })
    }

    //get news from BBC
    response =  await fetch(urls["BBC"])
    text = await response.text()
    dom = new JSDOM(text)
    articles = dom.window.document.querySelector("ul[data-testid='topic-promos']").querySelectorAll("li")
    for (let i = 0; i < articles.length; i++) {
        let article = articles[i]
        let title = article.querySelector("a").textContent
        let link = article.querySelector("a").href
        let image = article.querySelector("img").src
        let source = "BBC"
        news.push({
            title,
            link,
            image,
            source
        })
    }

    news.sort(() => Math.random() - 0.5)
    
    fs.writeFileSync("news.json", JSON.stringify(news))

}

getNews()