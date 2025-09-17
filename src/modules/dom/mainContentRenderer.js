import { format } from "date-fns";

export const renderMainContent = (weatherData) => {
   const location = document.getElementById("location");
   const todayDate = document.getElementById("date");
   const temperature = document.getElementById("temp-number");
   const windSpeed = document.getElementById("wind-speed");
   const humidity = document.getElementById("humidity-level");
   const rainChance = document.getElementById("rain-chance");

   location.textContent = weatherData.city;
   todayDate.textContent = format(new Date(weatherData.date), "EEEE, do MMMM");
   temperature.textContent = weatherData.temperature;
   windSpeed.textContent = `${weatherData.windSpeed} mph`;
   humidity.textContent = `${weatherData.humidity}%`;
   rainChance.textContent = `${weatherData.rainChance}%`;

   const weatherCondition = weatherData.icon;
   const hour = parseInt(weatherData.time.slice(0, 2));
   setTheme(hour, weatherCondition);
   loadWeatherIcon(hour, weatherCondition);
};

const setTheme = (hour, weatherCondition) => {
   const root = document.documentElement;
   let timeOfDay = getTimeOfDay(hour, weatherCondition);
   root.className = timeOfDay;
};

const getTimeOfDay = (hour, weatherCondition) => {
   const isEveningHour = hour < 7 || hour > 18;
   return (isEveningHour && !weatherCondition.includes("day")) || weatherCondition.includes("night")
      ? "night"
      : "day";
};

const loadWeatherIcon = async (hour, weatherCondition) => {
   const conditionIcon = document.getElementById("today-weather-icon");
   const module = await import(
      `../../images/weather-icons/3D/${getTimeOfDay(hour, weatherCondition)}/${weatherCondition}.png`
   );
   conditionIcon.src = module.default;
};
