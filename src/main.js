import {createApp, reactive} from 'vue'
import App from './App.vue'
import router from "./router";
import {Quasar} from 'quasar'
import quasarUserOptions from './options/quasar-user-options'


const app = createApp(App)


app.use(Quasar, quasarUserOptions);
app.use(router)

const globalData = reactive({
    isMiniScreen: false,
});
app.provide('globalData', globalData);


app.mount("#app");
