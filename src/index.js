import "normalize.css";

import "./styles/fonts.css";
import "./styles/variables.css";
import "./styles/style.css";
import "./styles/mobile-styles.css";

import { getWeatherData } from "./api";
import { hideLoader, renderData, showErrorMessage, showLoader } from "./dom";

const locationInputs = document.querySelectorAll(".search-bar");
export let lastSearchedLocation = "London";
const hamburgerMenu = document.querySelector("#hamburger-menu input");

let isDataLoaded = false;

locationInputs.forEach((input) =>
   input.addEventListener("keypress", async (event) => {
      if (event.key === "Enter") {
         event.preventDefault();
         // Prevents hidden search bar from triggering a search with empty or old values
         if (window.getComputedStyle(input.parentElement).getPropertyValue("display") !== "none") {
            isDataLoaded = false;
            showLoader();
            const weatherData = await getWeatherData(input.value);
            lastSearchedLocation = input.value;
            renderData(weatherData);
            isDataLoaded = true;
            input.value = "";
            input.blur();
            await waitForLoad();
            hideLoader();
            if (window.innerWidth < 600) {
               hamburgerMenu.click();
            }
         }
      }
   })
);

function waitForLoad() {
   return new Promise((resolve) => {
      const checkData = setInterval(() => {
         if (isDataLoaded && document.readyState === "complete") {
            clearInterval(checkData);
            resolve();
         }
      }, 50);
   });
}

(async () => {
   isDataLoaded = false;
   showLoader();
   try {
      const weatherData = await getWeatherData("London");
      renderData(weatherData);
      isDataLoaded = true;
      await waitForLoad();
      hideLoader();
   } catch (err) {
      showErrorMessage("An unexpected error has occurred. Try reloading the page.");
      throw err;
   }
})();
