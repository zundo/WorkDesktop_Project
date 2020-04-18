import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/base'
import './plugins/chartist'
import './plugins/vee-validate'
import vuetify from './plugins/vuetify'
import i18n from './i18n'
import qs from 'qs'

Vue.config.productionTip = false

Vue.use(qs) // querystringify

new Vue({
    router,
    store,
    vuetify,
    i18n,
    qs,
    render: h => h(App),
}).$mount('#app')