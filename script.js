
// API key for accessing OpenWeatherMap API
const apikey = "8b93c561a9e0abbf3574fad3704c4aa7";

// Default city name
let cityname = "Murree";

// Variable to store API response data
let data;

// Selecting DOM elements
const cardGroups = document.querySelector(".group_cards");
const city = document.querySelector(".Weather_country");
let search = document.querySelector(".search-input");
let form = document.querySelector(".search-form");

// Event listener for form submission
form.addEventListener("submit", function (e) {
  e.preventDefault();
  let searchValue = search.value;
  // Set cityname to the value entered in the search input, or default to "Bahawalpur" if no value is provided
  cityname = searchValue || "Bahawalpur";
  // Call fetchdata function to fetch weather data
  fetchdata();
});

// Function to fetch weather data from OpenWeatherMap API
async function fetchdata() {
  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&units=metric&appid=${apikey}`;
  try {
    // Fetch data from API
    const response = await fetch(url);
    // Convert response to JSON format
    data = await response.json();
    console.log(data)
    // Display city name in the header
    city.innerHTML = data.name;
    // Generate HTML markup for weather cards using API response data
    const clutter = `<div class="card">
    <div class="card_top">
      <h2>Temperature</h2>
    </div>
    <img class="Weather_img" src="./images/1.png" alt="" />
    <div class="card_bottom">
      <h1 class="temp_a_value">${data.main.temp} &deg;C</h1>
      <span class="temp">Temperature is <span class="temp_value"></span></span>
      <span class="min_temp">Min Temperature is <span class="min_temp_value">${
        data.main.temp_min
      }&deg;C</span></span>
      <span class="max_temp">Max Temperature is <span class="max_temp_value">${
        data.main.temp_max
      }&deg;C</span></span>
    </div>
  </div>

  <div class="card">
    <div class="card_top">
      <h2>Humidity</h2>
    </div>
    <img class="Weather_img" src="./images/2.jpeg" alt="" />
    <div class="card_bottom">
      <h1 class="humidity_a_value">${data.main.humidity} %</h1>
      <span class="wind_deg">Wind Degree is <span class="wind_deg_value">${
        data.wind.deg
      }</span></span>
      <span class="feel_like">Feel Like <span class="feel_like_value">${
        data.main.feels_like
      }</span></span>
      <span class="humidity">Humidity<span class="humidity_value">
        ${data.main.humidity} %
      </span></span>
    </div>
  </div>

  <div class="card">
    <div class="card_top">
      <h2>Wind info</h2>
    </div>
    <img class="Weather_img" src="./images/3.png" alt="" />
    <div class="card_bottom">
      <h1 class="wind_info_a_value">${data.wind.speed} km/h</h1>
      <span class="sun_rise_time">Sunrise Time is <span class="sun_rise_time_value">${convertUnixToTime(
        data.sys.sunrise
      )}</span></span>
      <span class="sun_set_time">Sunset Time is <span class="sun_set_time_value">${convertUnixToTime(
        data.sys.sunset
      )}</span></span>
    </div>
  </div>`; // Card markup template (trimmed for brevity)
    // Update cardGroups innerHTML with the generated markup
    cardGroups.innerHTML = clutter;
  } catch (error) {
    console.log(`Error in fetching API: ${error}`);
  }
}

// Initial call to fetch weather data when the page loads
fetchdata();

// Function to convert Unix timestamp to time format
function convertUnixToTime(unixTimestamp) {
  const date = new Date(unixTimestamp * 1000);
  const hours = date.getHours();
  const minutes = "0" + date.getMinutes();
  return hours + ":" + minutes.slice(-2);
}

/*

*/