import {
   renderData,
   closeMobileNav,
   getLastSearchedLocation,
   updateWeatherDisplay
} from "../dom/dom";
import { getWeatherData } from "../apis/weatherApi";
import { settings, saveSettings } from "../settings";
import { requestUserLocation } from "../apis/geolocationApi";

const dialog = document.querySelector("dialog");
const tempSetting = document.getElementById("temperature-toggle");
const timeSetting = document.getElementById("time-toggle");
const errorPopup = document.getElementById("error-popup");

const searchInputs = document.querySelectorAll(".search-bar");
const locationButtons = document.querySelectorAll(".location-btn");
const closeButtons = document.querySelectorAll(".close-btn");
const settingsButton = document.getElementById("settings-btn");
const saveButton = document.getElementById("save-btn");
const closeErrorButton = document.getElementById("close-error-btn");

export const handleButtons = () => {
   searchInputs.forEach((input) =>
      input.addEventListener("keypress", async (event) => {
         if (event.key === "Enter") {
            event.preventDefault();
            const isSearchBarVisible =
               window.getComputedStyle(input.parentElement).getPropertyValue("display") !== "none";
            if (isSearchBarVisible) {
               updateWeatherDisplay(input.value);
               input.value = "";
               input.blur();
               closeMobileNav();
            }
         }
      })
   );

   locationButtons.forEach((locationButton) => {
      locationButton.addEventListener("click", (event) => {
         event.preventDefault();
         requestUserLocation();
         closeMobileNav();
      });
   });

   settingsButton.addEventListener("click", () => {
      tempSetting.checked = settings.temperatureUnit !== "celsius";
      timeSetting.checked = settings.timeUnit !== "24 hour";

      dialog.showModal();
   });

   closeButtons.forEach((button) => {
      button.addEventListener("click", () => {
         dialog.close();
      });
   });

   saveButton.addEventListener("click", async () => {
      saveSettings(tempSetting, timeSetting);
      const weatherData = await getWeatherData(getLastSearchedLocation());
      renderData(weatherData);
      closeMobileNav();
      dialog.close();
   });

   closeErrorButton.addEventListener("click", () => (errorPopup.style.display = "none"));
};
