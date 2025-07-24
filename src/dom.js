import { format, parse } from "date-fns";
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

   import(`./images/weather-icons/minimal/${data.icon}.png`).then((module) => {
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
   time.textContent = format(parse(data.time, "HH:mm:ss", new Date()), "h:mm");
   import(`./images/weather-icons/minimal/${data.icon}.png`).then((module) => {
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
