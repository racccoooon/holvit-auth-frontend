import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router";
import { createPinia } from "pinia";
import * as Oidc from "oidc-client-ts";

Oidc.Log.setLogger(console);

const app = createApp(App)

app.use(createPinia());
app.use(router);


app.mount('#app')
