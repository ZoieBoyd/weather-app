import "normalize.css";

import "./styles/fonts.css";
import "./styles/variables.css";
import "./styles/style.css";
import "./styles/mobile-styles.css";

import { getWeatherData } from "./modules/apis/weatherApi";
import { getUserCity } from "./modules/apis/geolocationApi";
import {
   closeMobileNav,
   hideLoader,
   renderData,
   showErrorMessage,
   showLoader
} from "./modules/dom";

const locationInputs = document.querySelectorAll(".search-bar");
export let lastSearchedLocation = "London";

let isDataLoaded = false;

locationInputs.forEach((input) =>
   input.addEventListener("keypress", async (event) => {
      if (event.key === "Enter") {
         event.preventDefault();

         // Prevents hidden search bar from triggering a search with empty or old values
         if (window.getComputedStyle(input.parentElement).getPropertyValue("display") !== "none") {
            updateWeatherDisplay(input.value);
            input.value = "";
            input.blur();
            closeMobileNav();
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

async function updateWeatherDisplay(cityInput) {
   isDataLoaded = false;
   showLoader();
   const weatherData = await getWeatherData(cityInput);
   lastSearchedLocation = cityInput;
   renderData(weatherData);
   isDataLoaded = true;
   await waitForLoad();
   hideLoader();
}
export const requestUserLocation = () => navigator.geolocation.getCurrentPosition(success, error);

async function success(position) {
   const longitude = position.coords.longitude;
   const latitude = position.coords.latitude;
   const city = await getUserCity(longitude, latitude);
   updateWeatherDisplay(city);
}

const error = () => {
   showErrorMessage("Location permissions are not enabled");
};

// Immediately invoked function upon startup
(async () => {
   updateWeatherDisplay("London");
})();
