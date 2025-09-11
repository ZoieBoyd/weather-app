export async function getUserCity(longitude, latitude) {
   const response = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
      { mode: "cors" }
   );
   const locationData = await response.json();
   return locationData.city;
}
