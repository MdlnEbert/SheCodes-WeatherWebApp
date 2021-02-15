// Create functions
function saveLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey2 = "f15d01756f0fb22443c2b9ece3cb7eea";
  let apiURLGeo = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey2}`;

  //Call Weather API
  axios.get(apiURLGeo).then(getTempCity);
}

function showLocationTemp(event) {
  event.preventDefault();
  //Geolocation Call
  navigator.geolocation.getCurrentPosition(saveLocation);
}

function getLongLat(response){
  let cityLat = response.data[0].lat;
  let cityLon = response.data[0].lon;
  let apiOneWeatherCall = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&exclude=minutely,hourly,alerts&units=metric&appid=${apiKey}`;  

  searchedCityOutput.innerHTML = response.data[0].name;

  axios.get(apiOneWeatherCall).then(getTempCity)
}

function getTempCity(response) {
  let tempTodayElement = document.querySelector("#temp-today");
  let imageElement = document.querySelector("#image");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let weatherDescrElement = document.querySelector("#weather-description");
  let forecastDays = document.querySelectorAll(".card-header");
  let minTemps = document.querySelectorAll("#min-temp");
  let maxTemps = document.querySelectorAll("#max-temp");
  let cardImages = document.querySelectorAll("#image-card");
   
  //show weather box after search variable was entered
  document.getElementById("weather-box").hidden = false;

  // Update current weather section
  tempTodayElement.innerHTML = Math.round(response.data.current.temp);
   humidityElement.innerHTML = response.data.current.humidity;
   windSpeedElement.innerHTML = Math.round(response.data.current.wind_speed);
   weatherDescrElement.innerHTML = response.data.current.weather[0].description;
   imageElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.current.weather[0].icon}@2x.png`)

   // Update Forecast section
   let index = 0;
   for( index; index < forecastDays.length; index++ ) {
     forecastDays[index].innerHTML = weekdays[day+1+index];
     cardImages[index].setAttribute("src", `http://openweathermap.org/img/wn/${response.data.daily[index].weather[0].icon}@2x.png`, "alt", `${response.data.daily[index].weather[0].description}`);
    minTemps[index].innerHTML = Math.round(response.data.daily[index].temp.min);
    maxTemps[index].innerHTML = Math.round(response.data.daily[index].temp.max);
   }

}


function searchCity(event) {
  event.preventDefault();
  
  if (searchedCity.value) {
    let searchedCityValue = searchedCity.value;
    let apiGeoCode = `http://api.openweathermap.org/geo/1.0/direct?q=${searchedCityValue}&limit=1&appid=${apiKey}`;

    
    //Call Weather API
    axios.get(apiGeoCode).then(getLongLat)

  } else {
    alert(`Please enter a city for which you want to know the weather forecast.`)
  }
}

function convertCelsius(event) {
  event.preventDefault();
 
  document.querySelector("#show-celsius").classList.add("active");
  document.querySelector("#show-fahrenheit").classList.remove("active");
  document.querySelector("#temp-today").innerHTML = tempSearched;
}

function convertFahrenheit(event) {
  event.preventDefault();
 
  document.querySelector("#show-celsius").classList.remove("active");
  document.querySelector("#show-fahrenheit").classList.add("active");
  document.querySelector("#temp-today").innerHTML = Math.round((tempSearched * 9/5) + 32);
}

//Define variables and arrays
let apiKey = "f15d01756f0fb22443c2b9ece3cb7eea";

let dateTimeOutput = document.querySelector("#Date-Time-now");
let searchedCityOutput = document.querySelector("#city-name")
let searchedCity = document.querySelector("#searched-city");
let searchSubmit = document.querySelector("#search-input")
let locationBtn = document.querySelector("#lctn-btn");

let weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let now = new Date();
let hour = now.getHours();
let minutes = now.getMinutes();
let day = now.getDay();

let tempSearched = null;
document.getElementById("weather-box").hidden = true;

// Any other calls
dateTimeOutput.innerHTML = `${weekdays[day]}, ${hour}:${minutes}`;
searchSubmit.addEventListener("submit", searchCity);
locationBtn.addEventListener("click", showLocationTemp);
document.querySelector("#show-celsius").addEventListener("click", convertCelsius);
document.querySelector("#show-fahrenheit").addEventListener("click", convertFahrenheit);

