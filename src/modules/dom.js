import { format, parse } from "date-fns";
import { settings } from "./settings";
import { lastSearchedLocation, requestUserLocation } from "..";
import { getWeatherData } from "./apis/weatherApi";
const root = document.documentElement;
const hamburgerButton = document.querySelector("#hamburger-menu input");

export const renderData = (weatherData) => {
   const location = document.getElementById("location");
   const todayDate = document.getElementById("date");
   const temperature = document.getElementById("temp-number");
   const windSpeed = document.getElementById("wind-speed");
   const humidity = document.getElementById("humidity-level");
   const rainChance = document.getElementById("rain-chance");
   const conditionIcon = document.getElementById("today-weather-icon");

   const locationButtons = document.querySelectorAll(".location-btn");
   locationButtons.forEach((locationButton) => {
      locationButton.addEventListener("click", (event) => {
         event.preventDefault();
         requestUserLocation();
         closeMobileNav();
      });
   });

   location.textContent = weatherData.city;
   todayDate.textContent = format(new Date(weatherData.date), "EEEE, do MMMM");
   temperature.textContent = weatherData.temperature;
   windSpeed.textContent = `${weatherData.windSpeed} mph`;
   humidity.textContent = `${weatherData.humidity}%`;
   rainChance.textContent = `${weatherData.rainChance}%`;

   const weatherCondition = weatherData.icon;
   const hour = parseInt(weatherData.time.slice(0, 2));
   let timeOfDay = "day";
   root.className = "day";
   if (
      ((hour < 7 || hour > 18) && !weatherCondition.includes("day")) ||
      weatherCondition.includes("night")
   ) {
      timeOfDay = "night";
      root.className = "night";
   }

   import(`../images/weather-icons/3D/${timeOfDay}/${weatherCondition}.png`).then((module) => {
      const iconUrl = module.default;
      conditionIcon.src = iconUrl;
   });

   renderFiveDayForecast(weatherData);
   renderHourlyForecast(weatherData);
};

const renderFiveDayForecast = (weatherData) => {
   const fiveDayForecastData = weatherData.fiveDayForecast;
   const weatherCards = document.querySelectorAll("#five-day-forecast div");
   for (let i = 0; i < 5; i++) {
      createFiveDayForecastCard(fiveDayForecastData[i], weatherCards[i]);
   }
};

const createFiveDayForecastCard = (data, card) => {
   const date = card.querySelector(".five-day-date");
   const weatherIcon = card.querySelector("img");
   const minTemp = card.querySelector(".min-temp");
   const maxTemp = card.querySelector(".max-temp");

   date.innerHTML = `<span class = "bold">${format(new Date(data.day), "eee")}</span> ${format(new Date(data.day), "do")}`;

   import(`../images/weather-icons/minimal/${data.icon}.png`).then((module) => {
      weatherIcon.src = module.default;
   });

   minTemp.textContent = `${data.minTemperature}°`;
   maxTemp.textContent = `${data.maxTemperature}°`;
};

const renderHourlyForecast = (weatherData) => {
   clearHourlyForecast();
   const currentHour = parseInt(weatherData.time.slice(0, 2));
   const data = weatherData.hourlyForecast;
   // Only renders information occurring in the future (every 2 hours)
   for (let i = currentHour; i < data.length; i += 2) {
      createHourlyForecastCard(data[i]);
   }
};

const createHourlyForecastCard = (data) => {
   const container = document.getElementById("hourly-card-container");
   const card = document.createElement("div");
   card.className = "hourly-card";
   const time = document.createElement("p");
   const icon = document.createElement("img");
   const temp = document.createElement("p");
   temp.className = "hourly-temp";

   time.textContent = format(
      parse(data.time, "HH:mm:ss", new Date()),
      settings.timeUnit === "12 hour" ? "h:mmaaa" : "HH:mm"
   );

   import(`../images/weather-icons/minimal/${data.icon}.png`).then((module) => {
      icon.src = module.default;
   });
   temp.textContent = `${data.temperature}°`;
   card.append(time, icon, temp);
   container.appendChild(card);
};

const clearHourlyForecast = () => {
   const container = document.getElementById("hourly-card-container");
   container.replaceChildren();
};

const dialog = document.querySelector("dialog");
const tempSetting = document.getElementById("temperature-toggle");
const timeSetting = document.getElementById("time-toggle");

const settingsButton = document.getElementById("settings-btn");
settingsButton.addEventListener("click", () => {
   tempSetting.checked = settings.temperatureUnit !== "celsius";
   timeSetting.checked = settings.timeUnit !== "24 hour";

   dialog.showModal();
});

const closeButtons = document.querySelectorAll(".close-btn");
closeButtons.forEach((button) => {
   button.addEventListener("click", () => {
      dialog.close();
   });
});

const saveButton = document.getElementById("save-btn");
saveButton.addEventListener("click", async () => {
   saveSettings();
   const weatherData = await getWeatherData(lastSearchedLocation);
   renderData(weatherData);
   closeMobileNav();
   dialog.close();
});

function saveSettings() {
   if (tempSetting.checked) {
      settings.temperatureUnit = "fahrenheit";
   } else {
      settings.temperatureUnit = "celsius";
   }
   if (timeSetting.checked) {
      settings.timeUnit = "12 hour";
   } else {
      settings.timeUnit = "24 hour";
   }
}

export function showLoader() {
   const loader = document.getElementById("loader");
   loader.style.display = "flex";
}

export function hideLoader() {
   const loader = document.getElementById("loader");
   loader.style.display = "none";
}

const errorPopup = document.getElementById("error-popup");

export function showErrorMessage(message) {
   const errorText = document.getElementById("error-message");
   errorText.textContent = `Error: ${message}`;
   errorPopup.style.display = "flex";
   setTimeout(() => {
      errorPopup.style.display = "none";
   }, 2000);
}

const closeErrorButton = document.getElementById("close-error-btn");
closeErrorButton.addEventListener("click", () => (errorPopup.style.display = "none"));

export const closeMobileNav = () => {
   if (window.innerWidth < 600) hamburgerButton.click();
};
