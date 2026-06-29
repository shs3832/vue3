import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.js";
import { createApp } from "vue";
import App from "./App.vue";
import { router } from "@/router/index.js";
import { createPinia } from "pinia";
import globalDirective from "./plugins/global-directive.js";

import dayjs from "./plugins/dayjs.js";
const app = createApp(App);

app.use(createPinia());
app.use(globalDirective);
app.use(dayjs);
app.use(router);
app.mount("#app");
