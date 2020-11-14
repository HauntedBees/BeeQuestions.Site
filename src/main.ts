import Vue from 'vue';
import App from './App.vue';
import router from 'src/views/views.module';
import store from './store'
import vuetify from './plugins/vuetify';
import i18n from './i18n';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import "src/components/components.module";

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);
Object.defineProperty(Vue.prototype, "$dayjs", { value: dayjs });
Object.defineProperty(Vue.prototype, "$filters", { value: {
  titlecase(str:string) { return str.split(" ").map(w => w[0].toLocaleUpperCase() + w.slice(1)).join(" "); },
  percent(num:number) { return (num * 100).toFixed(0) + "%"; }
} });
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app');