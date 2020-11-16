import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import AdminPage from "src/views/AdminPage.vue";
import HomePage from "src/views/HomePage.vue";
import LoginPage from "src/views/LoginPage.vue";
import SignUpPage from "src/views/SignUpPage.vue";
import PrivacyPolicyPage from "src/views/PrivacyPolicyPage.vue";
import AboutPage from "src/views/AboutPage.vue";
import SettingsPage from "src/views/SettingsPage.vue";
import RulesPage from "src/views/RulesPage.vue";
import AnswerPage from "src/views/AnswerPage.vue";
import TagPage from "src/views/TagPage.vue";
import UserPage from "src/views/UserPage.vue";
import BrowseTagsPage from "src/views/BrowseTagsPage.vue";
import OAuthPage from "src/views/OAuthPage.vue";

Vue.use(VueRouter);
const routes:Array<RouteConfig> = [
    { path: "/", component: HomePage, meta: { title: "Bee Questions!" } },
    { path: "/index.html", component: HomePage, meta: { title: "Bee Questions!" } },
    { path: "/admin", component: AdminPage, meta: { title: "Bee Questions! - Admin Section" } },

    { path: "/login", component: LoginPage, meta: { title: "Bee Questions! - Log In" } },
    { path: "/signup", component: SignUpPage, meta: { title: "Bee Questions! - Create an Account" } },
    { path: "/oauth", component: OAuthPage, meta: { title: "Bee Questions!" } },
    { path: "/settings", component: SettingsPage, meta: { title: "Bee Questions! - User Settings" } },
    
    { path: "/about", component: AboutPage, meta: { title: "Bee Questions! - What This Is?" } },
    { path: "/rules", component: RulesPage, meta: { title: "Bee Questions! - Rules" } },
    { path: "/privacypolicy", component: PrivacyPolicyPage, meta: { title: "Bee Questions! - Privacy Policy" } },

    { path: "/user/:id", component: UserPage },
    { path: "/answer/:id", component: AnswerPage },
    { path: "/tags", component: BrowseTagsPage },
    { path: "/tag/:tag", component: TagPage }
]

const router = new VueRouter({ mode: "history", base: process.env.BASE_URL, routes, scrollBehavior() { return { x: 0, y: 0 }; } });
router.afterEach(to => {
    Vue.nextTick(() => {
        if(to.meta.title) { document.title = to.meta.title; }
    });
});
export default router;