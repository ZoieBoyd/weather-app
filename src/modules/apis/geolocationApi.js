import { showErrorMessage, updateWeatherDisplay } from "../dom/dom";

async function getUserCity(longitude, latitude) {
   const response = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
      { mode: "cors" }
   );
   const locationData = await response.json();
   return locationData.city;
}

export const requestUserLocation = () => navigator.geolocation.getCurrentPosition(success, error);

async function success(position) {
   const longitude = position.coords.longitude;
   const latitude = position.coords.latitude;
   const city = await getUserCity(longitude, latitude);
   updateWeatherDisplay(city);
}

const error = () => {
   showErrorMessage("Location permissions are not enabled");
};
