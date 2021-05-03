//update current location
function searchLocation(position) {
  let apiKey = "291d093572471cc9cd6958074405d546";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${
    position.coords.latitude
  }&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

//update location, temp & description
let currentLocationButton = document.querySelector("#current-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

//Change city
function displayWeatherCondition(response) {
  document.querySelector("#location").innerHTML = response.data.name;
  
  document.querySelector("#current-weather-icon").setAttribute(
    "src", 
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );

  celciusTemperature = Math.round(response.data.main.temp);

  document.querySelector("#current-degrees").innerHTML = Math.round(
    celciusTemperature
  );
  document.querySelector("#current-weather-description").innerHTML =
    response.data.weather[0].main;

  document.querySelector("#humidity-value").innerHTML =
    response.data.main.humidity
  
  document.querySelector("#wind-speed").innerHTML = 
    Math.round(response.data.wind.speed);
}

function searchCity(city) {
  let apiKey = "291d093572471cc9cd6958074405d546";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-box").value;
  searchCity(city);
  


}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

//Date & Time
//date line
let dateAndTime = new Date();

let weekdays = [
  "Sunday", 
  "Monday", 
  "Tuesday", 
  "Wednesday", 
  "Thursday", 
  "Friday", 
  "Saturday"
];
let nowDay = weekdays[dateAndTime.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "November",
  "December"
];
let nowMonth = months[dateAndTime.getMonth()];

let nowDayNumber = dateAndTime.getDate();

let nowYear = dateAndTime.getFullYear();

let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = `${nowDay} ${nowMonth} ${nowDayNumber}, ${nowYear}`;


//time line
let currentHour = dateAndTime.getHours();
if (currentHour <10) {
  currentHour = `0${currentHour}`;
}

let currentMinute = dateAndTime.getMinutes();
if (currentMinute < 10) {
  currentMinute = `0${currentMinute}`;
}

let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = `${currentHour}:${currentMinute}`;


//Celsius/Fahrenheit link
//(celcius*9)/5+32;

function convertToF(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-degrees");
  let currentDegree = temperatureElement.innerHTML;
  temperatureElement.innerHTML = Math.round((celciusTemperature * 9) / 5 + 32);
}

function convertToC(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-degrees");
  temperatureElement.innerHTML = celciusTemperature;
}

let celciusTemperature = null;

let fTemp = document.querySelector("#f-temp");
fTemp.addEventListener("click", convertToF);


let cTemp = document.querySelector("#c-temp");
cTemp.addEventListener("click", convertToC);


//5 day forecast
function displayForecast() {
  let forecastElement = document.querySelector("#five-day-forecast-data");
  let forecastHTML = "";
  let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  days.forEach(function(day) {
    forecastHTML =  forecastHTML + 
    `
               <ul>
                    <li class="card">
                        ${day}
                        <i class="fas fa-sun"></i>
                        10ᵒ / 3ᵒ
                    </li>
                </ul>
            `;
  forecastElement.innerHTML = forecastHTML;
  })
}

//hourly forecast
function displayHourlyForecast () {
  let hourlyForecastElement = document.querySelector("#hourly-forecast");
  let hourlyForecastHTML = `<div class="row">`;
  let hours = ["9:00am", "12:00pm", "3:00pm", "6:00pm", "9:00pm"];
  hours.forEach(function(hour) {
    hourlyForecastHTML = hourlyForecastHTML + `
    <div class="col-sm">
      <i class="fas fa-cloud-sun-rain"></i>
      <br /> ${hour}
      <br /> 5ᵒ
    </div>
  `
  hourlyForecastElement.innerHTML = hourlyForecastHTML;
  }) 
}

searchCity("Vancouver");
displayForecast();
displayHourlyForecast();


