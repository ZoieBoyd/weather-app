import "normalize.css";

import "./styles/fonts.css";
import "./styles/variables.css";
import "./styles/style.css";
import "./styles/mobile-styles.css";

import { handleButtons } from "./modules/dom/buttonHandler";
import { updateWeatherDisplay } from "./modules/dom";

(async () => {
   updateWeatherDisplay("London");
   handleButtons();
})();
