import { hideLoader } from "./dom";
import { settings } from "./settings";

const apiKey = "3DB9NYWHCVU8C9N2VE72V4JST";

export async function getWeatherData(location) {
   const apiTempUnit = settings.temperatureUnit === "celsius" ? "metric" : "us";
   try {
      const response = await fetch(
         `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${apiTempUnit}&include=hours%2Ccurrent&key=${apiKey}&contentType=json`,
         { mode: "cors" }
      );
      const weatherData = await response.json();
      return {
         city: weatherData.resolvedAddress.split(",")[0],
         date: weatherData.days[0].datetime,
         time: weatherData.currentConditions.datetime,
         icon: weatherData.currentConditions.icon,
         temperature: Math.round(weatherData.currentConditions.temp),
         windSpeed: Math.round(weatherData.currentConditions.windspeed),
         humidity: Math.round(weatherData.currentConditions.humidity),
         rainChance: Math.round(weatherData.currentConditions.precipprob),
         hourlyForecast: weatherData.days[0].hours.map((hour) => ({
            time: hour.datetime,
            icon: hour.icon,
            temperature: Math.round(hour.temp)
         })),
         fiveDayForecast: weatherData.days.slice(1, 6).map((day) => ({
            day: day.datetime,
            icon: day.icon,
            minTemperature: Math.round(day.tempmin),
            maxTemperature: Math.round(day.tempmax)
         }))
      };
   } catch (err) {
      console.error("Oh no");
      hideLoader();
      throw err;
   }
}
