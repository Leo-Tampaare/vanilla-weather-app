let apiKey = "349d90e7a285f14e8d2236c5925edbde";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric`;

function showWeather(response) {
  console.log(response.data);
}

axios.get(apiUrl).then(showWeather);
