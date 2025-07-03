import { format } from "date-fns";
// import {};

export const renderData = (weatherData) => {
   const location = document.getElementById("location");
   const todayDate = document.getElementById("date");
   const temperature = document.getElementById("temperature");
   const windSpeed = document.getElementById("wind-speed");
   const humidity = document.getElementById("humidity-level");
   const rainChance = document.getElementById("rain-chance");

   location.textContent = weatherData.city;
   todayDate.textContent = format(new Date(), "EEEE, do MMMM");
   temperature.textContent = `${weatherData.temperature}°`;
   windSpeed.textContent = `${weatherData.windSpeed} mph`;
   humidity.textContent = `${weatherData.humidity}%`;
   rainChance.textContent = `${weatherData.rainChance}%`;
};
