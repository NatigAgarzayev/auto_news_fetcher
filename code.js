window.addEventListener("DOMContentLoaded", () => {
    const currentTime = new Date().toISOString()
    const pastDate = new Date(Date.now() - 60 * 60 * 1000 * 24).toISOString()
    const apikey = 'd32f87286728727d2a8bd772b0d69382'
    const newsList = document.querySelector(".news__list")
    
    const getLastTime = Number(localStorage.getItem("last_time"))
    const getArticles = JSON.parse(localStorage.getItem("fetched_data"))
    
    const params = `top-headlines?category=business&q=AMD OR AMD stock OR Intel or Intel stock&lang=en&from=${pastDate}&to=${currentTime}&max=10`
    const url = `https://gnews.io/api/v4/${params}&apikey=${apikey}`

    function fetchNewData(){
        localStorage.setItem("last_time", currentTime)
            fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                const articles = data.articles;
                localStorage.setItem('fetched_data', JSON.stringify(articles))
                renderData(articles)
            })
    }
    
    function renderData (articles){
        for (i = 0; i < articles.length; i++) {
            newsList.innerHTML += `
                <li class="news__list-list__item">
                    <a href="${articles[i]['url']}">
                        <img src="${articles[i]['image']}" alt="news__image">
                        <h3>${articles[i]['title']}</h3>
                        <p>${articles[i]['description']}</p>
                    </a>
                </li>
            `
        }
    }

    // basically every 1 hour
    if(!getLastTime || (currentTime - getLastTime) > (60000 * 60)){
        console.log("new_data_1")
        fetchNewData()
    }
    else if(getArticles && getArticles.length > 0 ){
        console.log("old_data")
        renderData(getArticles)
    }
    else{
        console.log("new_data_2")
        fetchNewData()
    }
})
