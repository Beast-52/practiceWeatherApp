const apikey = "8b93c561a9e0abbf3574fad3704c4aa7";
let cityname = "Murree";
let imageUrl = "./images/sun.png";
let data;
const cardGroups = document.querySelector(".group_cards");
const city = document.querySelector(".Weather_country");
let search = document.querySelector(".search-input");
let form = document.querySelector(".search-form");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let searchValue = search.value;
  cityname = searchValue || "Bahawalpur";
  fetchdata(); // fetch data every time the form is submitted
});

async function fetchdata() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&units=metric&appid=${apikey}`;
  try {
    const response = await fetch(url);
    data = await response.json();
    city.innerHTML = data.name;

    if (data.weather[0].id === 800) {
      imageUrl = "./images/sun.png";
    } else if (data.weather[0].id === 801) {
      imageUrl = "./images/cloudy-day.png";
    } else if (data.weather[0].id === 211) {
      imageUrl = "./images/thunderstorm.png";
    } else if (data.weather[0].id === 522) {
      imageUrl = "./images/heavy-rain.png";
    } else {
      imageUrl="./images/sun.png"
    }
    const clutter = `<div class="card">
        <div class="card_top">
          <h2>Temperature</h2>
        </div>
        <img class="Weather_img" src=${imageUrl}  alt="" />
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
        <img class="Weather_img" src="./images/humidity.png" alt="" />
        <div class="card_bottom">
          <h1 class="humidity_a_value">${data.main.humidity} %</h1>
          <span class="wind_deg">Wind Degree is <span class="wind_deg_value">${
            data.wind.deg
          }</span></span>
          <span class="feel_like">Feel Like <span class="feel_like_value">${
            data.main.feels_like
          }</span></span>
          <span class="humidity">Humidity<span class="humidity_value"></span></span>
        </div>
      </div>

      <div class="card">
        <div class="card_top">
          <h2>Wind info</h2>
        </div>
        <img class="Weather_img" src="./images/wind.png" alt="" />
        <div class="card_bottom">
          <h1 class="wind_info_a_value">${data.wind.speed} km/h</h1>
          <span class="sun_rise_time">Sunrise Time is <span class="sun_rise_time_value">${convertUnixToTime(
            data.sys.sunrise
          )}</span></span>
          <span class="sun_set_time">Sunset Time is <span class="sun_set_time_value">${convertUnixToTime(
            data.sys.sunset
          )}</span></span>
        </div>
      </div>`;

    cardGroups.innerHTML = clutter;
  } catch (error) {
    console.log(`Error in fetching API: ${error}`);
  }
}

fetchdata();

function convertUnixToTime(unixTimestamp) {
  const date = new Date(unixTimestamp * 1000);
  const hours = date.getHours();
  const minutes = "0" + date.getMinutes();
  return hours + ":" + minutes.slice(-2);
}
