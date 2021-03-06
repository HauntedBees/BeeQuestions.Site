import Vue from "vue";
import { Attribution, ExternalLink, Emoji, ClassDirective, LoadableButton, Loader } from 'bee-vue-gang';
import GlobalSnackbar from "src/components/GlobalSnackbar.vue";
import ListAnswer from "src/components/ListAnswer.vue";
import ListQuestion from "src/components/ListQuestion.vue";
import LoadableTooltipIconButton from "src/components/LoadableTooltipIconButton.vue";
import LoadMore from "src/components/LoadMore.vue";
import Notification from "src/components/Notification.vue";
import TabList from "src/components/TabList.vue";
import Tag from "src/components/Tag.vue";
import EmojiSelector from "src/components/EmojiSelector.vue";
import TopMenu from "src/components/TopMenu.vue";
import UserActivity from "src/components/UserActivity.vue";
import UserAvatar from "src/components/UserAvatar.vue";
import UserInfo from "src/components/UserInfo.vue";
Vue.component("attr", Attribution);
Vue.component("ax", ExternalLink);
Vue.component("GlobalSnackbar", GlobalSnackbar);
Vue.component("ListAnswer", ListAnswer);
Vue.component("ListQuestion", ListQuestion);
Vue.component("LoadableButton", LoadableButton);
Vue.component("LoadableTooltipIconButton", LoadableTooltipIconButton);
Vue.component("Loader", Loader);
Vue.component("LoadMore", LoadMore);
Vue.component("Notification", Notification);
Vue.component("TabList", TabList);
Vue.component("Tag", Tag);
Vue.component("TopMenu", TopMenu);
Vue.component("EmojiSelector", EmojiSelector);
Vue.component("emoji", Emoji);
Vue.component("UserActivity", UserActivity);
Vue.component("UserAvatar", UserAvatar);
Vue.component("UserInfo", UserInfo);
Vue.directive("class", ClassDirective);