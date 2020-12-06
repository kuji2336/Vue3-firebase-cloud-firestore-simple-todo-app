import { createApp } from 'vue'
import App from './App.vue';
/* vuex store  */
import store from './store/index'
 /* vue router */
import router from './route/indexed'

/* Global components */

import baseContainer from './components/baseContainer.vue'
const app = createApp(App)

/* initialize global component */
app.use(store)
app.use(router)
app.component('base-container', baseContainer)
app.mount('#app')
