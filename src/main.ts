import Vue from 'vue';
import App from './App.vue';
import router from 'src/views/views.module';
import store from './store'
import vuetify from './plugins/vuetify';
import i18n from './i18n';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import "src/components/components.module";

dayjs.extend(relativeTime);
Object.defineProperty(Vue.prototype, "$dayjs", { value: dayjs });
/*Object.defineProperty(Vue.prototype, "$filters", { value: {
  funcoNum(x:number) {
    return x+1;
  }
} });*/
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app');