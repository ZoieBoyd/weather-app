export const settings = {
   temperatureUnit: "celsius",
   timeUnit: "24 hour"
};

export const saveSettings = (tempCheckbox, timeCheckbox) => {
   tempCheckbox.checked
      ? (settings.temperatureUnit = "fahrenheit")
      : (settings.temperatureUnit = "celsius");

   timeCheckbox.checked ? (settings.timeUnit = "12 hour") : (settings.timeUnit = "24 hour");
};
