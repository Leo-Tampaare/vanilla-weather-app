function showWeather(response) {
  console.log(response.data);

  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let tempElement = document.querySelector("#temperature");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");

  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  tempElement.innerHTML = Math.round(response.data.main.temp);
  humidityElement.innerHTML = `${response.data.main.humidity}%`;
  windElement.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
}

let apiKey = "349d90e7a285f14e8d2236c5925edbde";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(showWeather);
