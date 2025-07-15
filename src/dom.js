import { format } from "date-fns";
const root = document.documentElement;

export const renderData = (weatherData) => {
   const location = document.getElementById("location");
   const todayDate = document.getElementById("date");
   const temperature = document.getElementById("temperature");
   const windSpeed = document.getElementById("wind-speed");
   const humidity = document.getElementById("humidity-level");
   const rainChance = document.getElementById("rain-chance");
   const conditionIcon = document.getElementById("today-weather-icon");

   location.textContent = weatherData.city;
   todayDate.textContent = format(new Date(weatherData.date), "EEEE, do MMMM");
   temperature.textContent = `${weatherData.temperature}°`;
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

   import(`./images/weather-icons/3D/${timeOfDay}/${weatherCondition}.png`).then((module) => {
      const iconUrl = module.default;
      conditionIcon.src = iconUrl;
   });

   renderFiveDayForecast(weatherData);
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

   date.textContent = format(new Date(data.day), "eee do");

   import(`./images/weather-icons/minimal/${data.icon}.png`).then((module) => {
      weatherIcon.src = module.default;
   });

   minTemp.textContent = `${data.minTemperature}°`;
   maxTemp.textContent = `${data.maxTemperature}°`;
};
