import "normalize.css";
import "./style.css";

import { getWeatherData } from "./api";
import { renderData } from "./dom";

const locationInput = document.getElementById("location-input");
const locationSubmitBtn = document.getElementById("submit-location-btn");

locationSubmitBtn.addEventListener("click", async (event) => {
   event.preventDefault();
   const weatherData = await getWeatherData(locationInput.value);
   renderData(weatherData);
});
