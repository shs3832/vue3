import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.js";
import { createApp } from "vue";
import App from "./App.vue";
import { router } from "@/router/index.js";

// console.log(import.meta.env.MODE);
// console.log(import.meta.env.BASE_URL);
// console.log(import.meta.env.PROD);
// console.log(import.meta.env.DEV);
createApp(App).use(router).mount("#app");
