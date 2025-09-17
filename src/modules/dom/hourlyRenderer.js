import { format, parse } from "date-fns";
import { settings } from "../settings";
import { loadMinimalWeatherIcon } from "./dom";

export const renderHourlyForecast = (weatherData) => {
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
   const weatherIcon = document.createElement("img");
   const temp = document.createElement("p");
   temp.className = "hourly-temp";

   time.textContent = format(
      parse(data.time, "HH:mm:ss", new Date()),
      settings.timeUnit === "12 hour" ? "h:mmaaa" : "HH:mm"
   );

   const weatherCondition = data.icon;
   loadMinimalWeatherIcon(weatherCondition, weatherIcon);

   temp.textContent = `${data.temperature}°`;
   card.append(time, weatherIcon, temp);
   container.appendChild(card);
};

const clearHourlyForecast = () => {
   const container = document.getElementById("hourly-card-container");
   container.replaceChildren();
};
