import { vFocus } from "@/directive/focus";
import color from "@/directive/color";
export default {
  install(app) {
    app.directive("focus", vFocus);
    app.directive("color", color);
  },
};
