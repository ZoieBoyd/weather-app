import { renderMainContent } from "./mainContentRenderer";
import { renderFiveDayForecast } from "./fiveDayRenderer";
import { renderHourlyForecast } from "./hourlyRenderer";
import { getWeatherData } from "../apis/weatherApi";

let isDataLoaded = false;
let lastSearchedLocation = "London";

export const getLastSearchedLocation = () => lastSearchedLocation;

const hamburgerButton = document.querySelector("#hamburger-menu input");

export const renderData = (weatherData) => {
   renderMainContent(weatherData);
   renderFiveDayForecast(weatherData);
   renderHourlyForecast(weatherData);
};

export function showLoader() {
   const loader = document.getElementById("loader");
   loader.style.display = "flex";
}

export function hideLoader() {
   const loader = document.getElementById("loader");
   loader.style.display = "none";
}

const waitForLoad = () => {
   return new Promise((resolve) => {
      const checkData = setInterval(() => {
         if (isDataLoaded && document.readyState === "complete") {
            clearInterval(checkData);
            resolve();
         }
      }, 50);
   });
};

export async function updateWeatherDisplay(cityInput) {
   isDataLoaded = false;
   showLoader();
   const weatherData = await getWeatherData(cityInput);
   lastSearchedLocation = cityInput;
   renderData(weatherData);
   isDataLoaded = true;
   await waitForLoad();
   hideLoader();
}

const errorPopup = document.getElementById("error-popup");

export const showErrorMessage = (message) => {
   const errorText = document.getElementById("error-message");
   errorText.textContent = `Error: ${message}`;
   errorPopup.style.display = "flex";
   setTimeout(() => {
      errorPopup.style.display = "none";
   }, 2000);
};

export const closeMobileNav = () => {
   if (window.innerWidth < 600) hamburgerButton.click();
};

export const loadMinimalWeatherIcon = async (weatherConditon, image) => {
   const module = await import(`../../images/weather-icons/minimal/${weatherConditon}.png`);
   image.src = module.default;
};
