
$(document).ready(async () => {
    console.log("hello world")
    let req = await fetch("/api/get-news")
    let news = await req.json()
    for (let i = 0; i < 10; i++) {
        let article = news[i]
        console.log(article.title)
        let articleDiv = `<div class="news-container" onclick='window.open("${article.link}")'>
        <img src="${article.image}" alt="news">
        <div class="news-info-container">
            <p class="news-title">${article.title}</span>
            <p class="news-author">${article.source}</span>
        </div>
    </div>`
        $(".news").append(articleDiv)
    }
    $(window).bind('mousewheel DOMMouseScroll', function(event){
        $(".scroll-info-ux").css("display", "none")
        if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {

            $(".news").scrollLeft($(".news").scrollLeft() + 100)
        }
        else {

            $(".news").scrollLeft($(".news").scrollLeft() - 100)
            
        }
    });
})