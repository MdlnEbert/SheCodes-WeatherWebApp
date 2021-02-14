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

function getTempCity(response) {
  document.getElementById("weather-box").hidden = false;
  tempSearched = Math.round(response.data.main.temp);
   document.querySelector("#temp-today").innerHTML = tempSearched;
   searchedCityOutput.innerHTML = response.data.name;
}

function searchCity(event) {
  event.preventDefault();
  //alert(`You entered the function with ${searchedCity.value}`);
  if (searchedCity.value) {
    let searchedCityValue = searchedCity.value;
    let apiKey = "f15d01756f0fb22443c2b9ece3cb7eea";
    let apiURLCity = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCityValue}&units=metric&appid=${apiKey}`;
    
    searchedCityOutput.innerHTML = `${searchedCity.value}`
    
    //Call Weather API
    axios.get(apiURLCity).then(getTempCity)
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

