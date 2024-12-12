function refreshWeather(response){
let temperatureElement = document.querySelector("#temperature");
let temperature = response.data.temperature.current;
let cityElement = document.querySelector("#city");
let descriptionElement = document.querySelector("#description");
let humidityElement = document.querySelector("#humidity");
let windSpeedElement = document.querySelector("#wind-speed");
let timeElement = document.querySelector("#time");
let date = new Date (response.data.time *1000);
let iconElement = document.querySelector("#icon");



cityElement.innerHTML = response.data.city;
timeElement.innerHTML =  formatDate(date);
descriptionElement.innerHTML = response.data.condition.description;
humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
iconElement.innerHTML = `<img src ="${response.data.condition.icon_url}" class="weather-app-icon"/>`;
temperatureElement.innerHTML = Math.round(temperature);

getForecast(response.data.city);
}

function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ]
    let day = days[date.getDay()];

    if (minutes <10) {
        minutes = `0${minutes}`;
    }
    return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
let apiKey = "3o875719afaefcd9btd0cb97235341b2"
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`
axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event){
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = searchInput.value;
    searchCity(searchInput.value);
}

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
    return days[date.getDay()];
}

function getForecast (city) {
    let apiKey= "3o875719afaefcd9btd0cb97235341b2";
    let apiUrlForecast= `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;    
    axios.get(apiUrlForecast).then(displayForecast);
}

function displayForecast(response){
    let forecastElement = document.querySelector("#forecast");
    let forecastHtml = "";
    response.data.daily.forEach(function(day, index) {
        if (index < 5) {

    forecastHtml = forecastHtml + `
    <div class="weather-forecast-date">
                    <div class="weather-forecast-day">${formatDay(day.time)}</div>
                    <div class="weather-forecast-icon">
                    <img src = "${day.condition.icon_url}" class = "weather-forecast-icon"/>
                    </div>
                <div class="weather-forecast-temp-range">
                    <div class="weather-forecast-temperature">${Math.round(day.temperature.minimum)}°C </div>
                    <div class=" weather-forecast-temperature"><strong>${Math.round(day.temperature.maximum)}°C</strong></div>
                </div>
            </div>
            `;
        }
    })
    forecastElement.innerHTML = forecastHtml
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity ("Perth");
displayForecast();



    