import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/vuex'
import iview from 'iview'
import './assets/css/bootstrap.min.css'
import './assets/css/main.css'
import 'iview/dist/styles/iview.css';
Vue.use(iview);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: {App},
    template: '<App/>'
})
