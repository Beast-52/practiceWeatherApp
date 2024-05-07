const apikey = "8b93c561a9e0abbf3574fad3704c4aa7";
let cityname = "Bahawalpur";

const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apikey}`;

async function fetchdata() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log("Data:", data);
  } catch (error) {
    console.log(`Err in fetching api ${error}`);
  }
}

fetchdata();
