import Vue from 'vue';
import Vuetify from 'vuetify/lib';
Vue.use(Vuetify);
export default new Vuetify({
    rtl: false,
    theme: {
        dark: true,
        themes: {
            dark: {
                primary: "#FFB300",
                accent: "#FF8F00",
                secondary: "#E65100",
                success: "#C0CA33",
                info: "#FDD835",
                warning: "#FFB300",
                error: "#FB8C00"
            },
            light: {
                primary: "#FFB300",
                accent: "#FF8F00",
                secondary: "#E65100",
                success: "#C0CA33",
                info: "#FDD835",
                warning: "#FFB300",
                error: "#F57C00"
            }
        }
    }
});