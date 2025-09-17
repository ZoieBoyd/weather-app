import { format } from "date-fns";
import { loadMinimalWeatherIcon } from "./dom";

export const renderFiveDayForecast = (weatherData) => {
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

   const weatherCondition = data.icon;
   loadMinimalWeatherIcon(weatherCondition, weatherIcon);

   minTemp.textContent = `${data.minTemperature}°`;
   maxTemp.textContent = `${data.maxTemperature}°`;
};
