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
  
  document.querySelector("#current-degrees").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#current-weather-description").innerHTML =
    response.data.weather[0].main;
  
    document.querySelector("#wind-speed").innerHTML = 
    response.data.wind.speed
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
console.log(currentDate);
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
console.log(currentTime);
currentTime.innerHTML = `${currentHour}:${currentMinute}`;


//Celsius/Fahrenheit link
//(celcius*9)/5+32;

function convertToF(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-degrees");
  let currentDegree = temperatureElement.innerHTML;
  temperatureElement.innerHTML = Math.round((currentDegree * 9) / 5 + 32);
}

function convertToC(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-degrees");
  temperatureElement.innerHTML = 19;
}

let fTemp = document.querySelector("#f-temp");
fTemp.addEventListener("click", convertToF);


let cTemp = document.querySelector("#c-temp");
cTemp.addEventListener("click", convertToC);
