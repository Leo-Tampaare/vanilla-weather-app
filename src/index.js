function formatDate(timestamp) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let day = days[date.getDay()];

  if (hours < 10) {
    hours = `0${hours}`;
  }

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function formatForecastDate(timestamp) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let date = new Date(timestamp);
  let day = days[date.getDay()];

  return day;
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = ``;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2 day-column">
              <span>${formatForecastDate(forecastDay.dt * 1000)}</span>
              <img
                src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"
                alt=""
                width="70"
              />
              <span class="value">
                <strong><span>${Math.round(
                  forecastDay.temp.max
                )}°</span></strong>
                <span>${Math.round(forecastDay.temp.min)}°</span>
              </span>
            </div>`;
      forecastElement.innerHTML = forecastHTML;
    }
  });
}

function getForecast(coords) {
  let apiKey = "349d90e7a285f14e8d2236c5925edbde";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}&units=${tempUnit}`;

  axios.get(apiUrl).then(displayForecast);
}

function showWeather(response) {
  let cityElement = document.querySelector("#city");
  let dateElement = document.querySelector("#date");
  let descriptionElement = document.querySelector("#description");
  let iconElement = document.querySelector("#icon");
  let tempElement = document.querySelector("#temperature");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");

  cityElement.innerHTML = response.data.name;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  descriptionElement.innerHTML = response.data.weather[0].description;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  tempElement.innerHTML = Math.round(response.data.main.temp);
  humidityElement.innerHTML = `${response.data.main.humidity}%`;
  windElement.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;

  getForecast(response.data.coord);
}

function changeToFahrenheit(event) {
  event.preventDefault();
  tempUnit = "imperial";

  let cityElement = document.querySelector("#city");
  let city = cityElement.innerHTML;

  citySearch(city);

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function changeToCelsius(event) {
  event.preventDefault();
  tempUnit = "metric";

  let cityElement = document.querySelector("#city");
  let city = cityElement.innerHTML;

  citySearch(city);

  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

function citySearch(city) {
  let apiKey = "349d90e7a285f14e8d2236c5925edbde";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${tempUnit}`;

  axios.get(apiUrl).then(showWeather);
}

function citySubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#search");

  citySearch(cityInputElement.value);
}

let celsiusTemperature = null;
let tempUnit = "metric";

let form = document.querySelector("#search-form");
form.addEventListener("submit", citySubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", changeToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", changeToCelsius);

citySearch("London");
