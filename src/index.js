import "normalize.css";

import "./styles/fonts.css";
import "./styles/variables.css";
import "./styles/style.css";
import "./styles/mobile-styles.css";

import { getWeatherData } from "./api";
import { renderData } from "./dom";

const locationInput = document.getElementById("location-input");
export let lastSearchedLocation = "London";
//const locationSubmitBtn = document.getElementById("submit-location-btn");

locationInput.addEventListener("keypress", async (event) => {
   if (event.key === "Enter") {
      event.preventDefault();
      lastSearchedLocation = locationInput.value;
      const weatherData = await getWeatherData(lastSearchedLocation);
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
