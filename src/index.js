import "normalize.css";

import "./styles/fonts.css";
import "./styles/variables.css";
import "./styles/style.css";
import "./styles/mobile-styles.css";

import { getWeatherData } from "./api";
import { renderData } from "./dom";

const locationInputs = document.querySelectorAll(".search-bar");
export let lastSearchedLocation = "London";
const hamburgerMenu = document.querySelector("#hamburger-menu input");

locationInputs.forEach((input) =>
   addEventListener("keypress", async (event) => {
      if (event.key === "Enter") {
         event.preventDefault();
         // Prevents hidden search bar from triggering a search with empty or old values
         if (window.getComputedStyle(input.parentElement).getPropertyValue("display") !== "none") {
            lastSearchedLocation = input.value;
            const weatherData = await getWeatherData(lastSearchedLocation);
            console.log(weatherData);
            renderData(weatherData);
            input.value = "";
            input.blur();
            if (window.innerWidth < 600) {
               hamburgerMenu.click();
            }
         }
      }
   })
);

(async () => {
   const weatherData = await getWeatherData("London");
   renderData(weatherData);
   console.log(weatherData);
})();
