const apiKey = "3DB9NYWHCVU8C9N2VE72V4JST";
const temperatureUnit = "metric"; // or "uk" or "us"

export async function getWeatherData(location) {
   try {
      const response = await fetch(
         `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${temperatureUnit}&include=hours%2Ccurrent&key=${apiKey}&contentType=json`,
         { mode: "cors" }
      );
      const weatherData = await response.json();
      console.log(weatherData);
      return {
         city: weatherData.resolvedAddress.split(",")[0],
         condition: weatherData.currentConditions.conditions,
         temperature: Math.round(weatherData.currentConditions.temp),
         windSpeed: Math.round(weatherData.currentConditions.windspeed),
         humidity: Math.round(weatherData.currentConditions.humidity),
         rainChance: Math.round(weatherData.currentConditions.precipprob),
         hourlyForecast: weatherData.days[0].hours.map((hour) => ({
            time: hour.datetime,
            condition: hour.conditions,
            temperature: hour.temp
         })),
         fiveDayForecast: weatherData.days.slice(1, 6).map((day) => ({
            day: day.datetime,
            condition: day.conditions,
            minTemperature: day.tempmin,
            maxTemperature: day.tempmax
         }))
      };
   } catch (err) {
      console.error("Oh no");
      throw err;
   }
}
