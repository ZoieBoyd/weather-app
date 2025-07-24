import "normalize.css";

import "./styles/fonts.css";
import "./styles/variables.css";
import "./styles/style.css";

import { getWeatherData } from "./api";
import { renderData } from "./dom";

const locationInput = document.getElementById("location-input");
//const locationSubmitBtn = document.getElementById("submit-location-btn");

locationInput.addEventListener("keypress", async (event) => {
   if (event.key === "Enter") {
      event.preventDefault();
      const weatherData = await getWeatherData(locationInput.value);
      console.log(weatherData);
      renderData(weatherData);
      locationInput.value = "";
      locationInput.blur();
   }
});

(async () => {
   const weatherData = await getWeatherData("London");
   renderData(weatherData);
   console.log(weatherData);
})();
