import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import { LoginResponseModel, UserInfoModel, RefreshedUserInfoModel } from 'src/models/AuthModel';
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
	plugins: [createPersistedState({ storage: localStorage })],
	mutations: {
		setMessage(state, msgInfo:string[]) {
			state.infomessage = msgInfo[1];
			state.infotype = msgInfo[0];
		},
		rememberlocation(state, path:string) {
			if(["/login", "/signup", "/oauth"].indexOf(path) >= 0) { return; }
			state.lastpath = path;
		},
		sawWelcome(state) {
			state.isNew = false;
		},
		changename(state, newname:string) {
			state.userInfo.displayname = newname;
		},
		changeavatar(state, avatarInfo:string[]) {
			state.userInfo.emoji = avatarInfo[0];
			state.userInfo.color = avatarInfo[1];
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
		},
		silentlogout(state) {
			state.userInfo = new UserInfoModel();
			state.auth = false;
			state.token = "";
		},
		updateNotifications(state, userInfo:RefreshedUserInfoModel) {
			if(userInfo.notLoggedIn || !state.auth) { return; }
			state.userInfo.notifications = userInfo.notifications;
			state.userInfo.totalunread = userInfo.totalunread;
		},
		updateStats(state, userInfo:RefreshedUserInfoModel) {
			if(userInfo.notLoggedIn || !state.auth) { return; }
			state.userInfo.score = userInfo.score;
			state.userInfo.level = userInfo.level;
			state.userInfo.questionsPerDay = userInfo.questionsPerDay;
			state.userInfo.answersPerDay = userInfo.answersPerDay;
			state.userInfo.questionsAsked = userInfo.questionsAsked;
			state.userInfo.answersGiven = userInfo.answersGiven;
			state.userInfo.notifications = userInfo.notifications;
			state.userInfo.totalunread = userInfo.totalunread;
		}
	}
})