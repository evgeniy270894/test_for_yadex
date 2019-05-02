import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont'

Vue.config.productionTip = false;


Vue.use(Vuetify, {
  iconfont: 'md',
});


new Vue({
  render: h => h(App),
}).$mount('#app')
