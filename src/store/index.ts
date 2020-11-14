import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import { LoginResponseModel, UserInfoModel } from 'src/models/AuthModel';
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    userInfo: new UserInfoModel(),
    token: "",
    auth: false,
    isNew: false,
    infomessage: "",
    infotype: "",
    lastpath: ""
  },
  plugins: [createPersistedState({ storage: sessionStorage })],
  mutations: {
    setMessage(state, msgInfo:string[]) {
      state.infomessage = msgInfo[1];
      state.infotype = msgInfo[0];
    },
    rememberlocation(state, path:string) {
      state.lastpath = path;
    },
    sawWelcome(state) {
      state.isNew = false;
    },
    login(state, userInfo:LoginResponseModel) {
      state.userInfo = userInfo.user;
      state.token = userInfo.token;
      state.isNew = userInfo.isNew;
      state.auth = true;
    },
    logout(state) {
      state.userInfo = new UserInfoModel();
      state.auth = false;
      state.token = "";
      window.location.reload();
    }
  }
})