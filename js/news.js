
let newsData = document.getElementById('news-data')
let paginationCont = document.getElementById("pagination")
let paginationLink = document.getElementById("pagination-link")
let numberOfItemsPerPage = 9
let searchInput = document.getElementById("searchInput")
let findBtn = document.getElementById('find-btn')
let queryString = window.location.search
let urlParams = new URLSearchParams(queryString)
let currentPage = Number(urlParams.get("page")) || 1
getWeatherNews('all')


async function getWeatherNews(searchValue) {
    let response = await fetch(`https://newsapi.org/v2/everything?q=weather&apiKey=f55e51c58c5644f18fd0d2a2fa8762f4`)
    let data = await response.json()
  

    let filteredNews = data.articles.filter(function (article) {
        return (article.source.name !== '[Removed]')
            && (article.title !== '[Removed]')
            && (article.description !== '[Removed]')
            && (article.url !== 'https://removed.com')
            && (article.urlToImage != null)
    })


    let numOfPages = Math.ceil((filteredNews.length - 1) / numberOfItemsPerPage)

    if (searchValue) {
        displayNews(filteredNews, currentPage, searchValue)

    } else {
        displayNews(filteredNews, currentPage, 'all')
    }
    displayPagination(numOfPages)





}

function displayNews(news, pageNumber, searchValue) {
    if (searchValue == 'all') {
        searchValue = ' '
    }

    console.log(news);
    

    let cartoona = ``;
    let loopStart = (pageNumber - 1) * numberOfItemsPerPage
    let loopEnd = loopStart + (numberOfItemsPerPage - 1)
    console.log(loopStart, loopEnd);

    for (let i = loopStart; i < loopEnd; i++) {
        if (i == news.length) {
            break;
        }

        if (news[i].title.toLowerCase().includes(searchValue.toLowerCase())
            || news[i].description.toLowerCase().includes(searchValue.toLowerCase())) {
            cartoona += ` 
        
        
        <div class="col-lg-4 col-md-6 col-12 ">
                    <div class="news-item h-100 overflow-hidden">
                        <div class="card border-0 shadow-lg h-100">
                        <a target="_blank" href="${news[i]?.url}" class="float-end">
                        <img src="${news[i]?.urlToImage}" class="card-img-top w-100" alt="...">
                        </a>
                            <div class="card-body   position-relative">
                                <h5 class="card-title h6">${news[i]?.title}</h5>
                                <p class="card-text">
                                ${news[i]?.description.split(' ').slice(0, 15).join(' ')}...
                                </p>

                                <div id="overlay" class=" d-flex align-items-center justify-content-center text-center fs-4 text-capitalize text-white position-absolute end-0 start-0 w-100 bottom-100" >
                                
                                source : ${news[i]?.source.name}


                                </div>


                            </div>
                            <div class="card-footer bg-white border-0 pt-0">
                                <a target="_blank" href="${news[i]?.url}" class="float-end">Read More</a>
                               
                            </div>
                        </div>
                    </div>
                </div>
        
        
        
        `

        }


    }

    newsData.innerHTML = cartoona


}

function displayPagination(numOfPages) {
    let pagination = `<a   href =./news.html?page=${currentPage == 1 ? 1 : currentPage - 1}  >&laquo;</a>`
    for (let i = 1; i <= numOfPages; i++) {
        pagination += `<a onclick="activePage(${i})" id="pagination-link"
         href="./news.html?page=${i}" 
         class="${i == currentPage ? "active" : ""}" >${i}</a>`
    }
    pagination += `<a href=./news.html?page=${currentPage == numOfPages ? numOfPages : currentPage + 1} >&raquo;</a>`
    paginationCont.innerHTML = pagination

}

searchInput.addEventListener('input', function () {
    getWeatherNews(searchInput.value)

})
findBtn.addEventListener('click', function () {
    getWeatherNews(searchInput.value)

})

document.forms[0].addEventListener('submit', function (e) {
    e.preventDefault()
})
