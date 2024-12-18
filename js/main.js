
let forecastData = document.getElementById("forecast-data")
let searchInput = document.getElementById("searchInput")
let searchForm = document.forms[0]
let navLinks = document.querySelectorAll(".nav-link")
let lat, lon;

navigator.geolocation.getCurrentPosition(getPosition)
function getPosition(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    weatherForecast(`${lat},${lon}`)


}


async function weatherForecast(q) {
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=3d99310fda93461c888231221241512&q=${q}&days=3`)
    let data = await response.json()


    displayForecast(data.location.name, data.current, data.forecast.forecastday)
    // displayForecastTest(data.location.name, data.current, data.forecast.forecastday)


}

weatherForecast('cairo')






function displayForecast(locationName, current, forecast) {

    let cartoona = ``


    for (let i = 0; i < forecast.length; i++) {

        let d = new Date(forecast[i].date);
        let dayOfWeek = d.toLocaleString('en-us', { weekday: 'long' });
        let monthOfYear = d.toLocaleString('en-us', { month: 'long' });
        let dayOfMonth = d.getDate()

        cartoona += `
            
            <div class="col-lg-4 col-md-6">
                    <div id="day${i + 1}" class="weather-card shadow h-100 pb-2">
                        <div class="weather-card-header  px-3 py-2 d-flex ${i == 0 ? "justify-content-between" : "justify-content-center"} align-items-center">
                            <p id="dayName" class="mb-0">${dayOfWeek}</p>
                            <p id="day-mon" class="mb-0 ${i != 0 ? "d-none" : "d-block"}">${dayOfMonth}${monthOfYear}</p>
                        </div>
                        <div class="weather-card-body pt-4 pb-3 px-4">
                            <h5 class= "${i != 0 ? "d-none" : "d-block"}">${locationName}</h5>
                            <p class="h1 ${i == 0 ? "my-3" : "mb-0 mt-3 text-center"} text-white" id="temp_c">
                               ${i == 0 ? current.feelslike_c : forecast[i].day.maxtemp_c}<sup>o</sup>C
                            </p>
                            <p class="h6 mb-3 text-white ${i == 0 ? "d-none" : "d-block text-center"}" id="mintemp_c">
                                    ${forecast[i].day.mintemp_c}<sup>o</sup>C
                                </p>
                            <div id="weather-icon" class="${i == 0 ? "text-start" : "text-center my-3"}">
                                <img src="https://${i == 0 ? current.condition.icon : forecast[i].day.condition.icon}" alt="weather icon">

                            </div>
                            <span id="weather-text" class="d-block ${i == 0 ? "text-start" : "text-center"}">
                                ${i == 0 ? current.condition.text : forecast[i].day.condition.text}
                            </span>
                             <div id="hsd"  class="${i == 0? "d-flex text-white column-gap-3 mt-2" : "d-none"}" id="wind">
                                <div id="humidity " class="d-flex column-gap-2 align-items-center">
                                    <i class="fa-solid fa-umbrella"></i>
                                    <span>${current.humidity}%</span>
                                </div>
                                <div id="wind-speed " class="d-flex column-gap-2 align-items-center">
                                <i class="fa-solid fa-gauge"></i>
                                <span>${current.wind_kph} km/h</span>
                                </div>
                                <div id="wind-dir " class="d-flex column-gap-2 align-items-center">
                                <i class="fa-brands fa-nfc-directional"></i>
                                <span>${current.wind_dir}</span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            
            
            
            
            `

    }
    forecastData.innerHTML = cartoona




}




function search() {
    value = searchInput.value.toLowerCase()
    if (value.length > 2) {
        weatherForecast(value)
    } else {
        weatherForecast(`${lat},${lon}`)
    }
}


searchInput?.addEventListener("input", function () {
    search()

})
searchForm?.addEventListener("submit", function (e) {
    e.preventDefault()
    search()

})




for (let i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener('click',function(e){
        navLinks.forEach(function(link){
            link.classList.remove('active')
        })
        e.target.classList.add('active')
    })
    
}