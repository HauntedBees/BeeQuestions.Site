<template>
<v-container>
    <v-tabs v-model="tab" fixed-tabs icons-and-text @change="SwitchTab(tab)">
        <v-tab v-if="isLoggedInUser">{{$t("mynotifications")}} <v-icon>mdi-bee</v-icon></v-tab>
        <v-tab>{{$t(isLoggedInUser ? "myuseranswers" : "useranswers")}} <v-icon>mdi-forum</v-icon></v-tab>
        <v-tab>{{$t(isLoggedInUser ? "myuserquestions" : "userquestions")}} <v-icon>mdi-comment-question</v-icon></v-tab>
        <v-tab v-if="isLoggedInUser">{{$t("useranswerlikes")}} <v-icon>mdi-bookmark-check</v-icon></v-tab>
        <v-tab v-if="isLoggedInUser">{{$t("usequestionlikes")}} <v-icon>mdi-heart</v-icon></v-tab>
    </v-tabs>
    <Loader v-if="loading" />
    <v-container v-if="!loading">
        <div v-if="offsetTab===0">
            <div class="mx-auto text-center mb-2" v-if="$store.state.userInfo.totalunread > 0">
                <v-btn @click="DismissAllNotifications" color="warning">{{$t("dismissAllNotifications")}}</v-btn>
            </div>
            <Notification v-for="notification in notifications" :key="notification.id" :notification="notification" />
            <LoadMore @loadmore="Paginate" :reachedEnd="endOfList" />
        </div>
        <div v-if="offsetTab===1||offsetTab===3">
            <ListAnswer v-for="answer in answers" :key="answer.id" :answer="answer"/>
            <LoadMore @loadmore="Paginate" :reachedEnd="endOfList" />
        </div>
        <div v-if="offsetTab===2||offsetTab===4">
            <ListQuestion :showAnswer="true" v-for="question in questions" :key="question.id" :question="question"/>
            <LoadMore @loadmore="Paginate" :reachedEnd="endOfList" />
        </div>
    </v-container>
</v-container>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { bee } from 'src/util/webmethod';
import { AnswerModel, QuestionModel } from 'src/models/AnswerModel';
import { NotificationModel } from 'src/models/AuthModel';
@Component
export default class HomePage extends Vue {
    @Prop() name?:string;
    @Prop() isLoggedInUser?:boolean;
    tab = 0;
    loading = false;
    answers:AnswerModel[] = [];
    questions:QuestionModel[] = [];
    notifications:NotificationModel[] = [];
    created() { this.SwitchTab(0); }
    get offsetTab() { return this.tab + (this.isLoggedInUser ? 0 : 1); }
    async SwitchTab(tab:number) {
        this.tab = tab;
        if(!this.name) { return; }
        switch(this.offsetTab) {
            case 0: this.notifications = await bee.getStandardValue(this, "Notifications", [true]); break;
            case 1: this.answers = await bee.getStandardValue(this, "UserAnswers", [this.name]); break;
            case 2: this.questions = await bee.getStandardValue(this, "UserQuestions", [this.name]); break;
            case 3: this.answers = await bee.getStandardValue(this, "UserBookmarkedAnswers", []); break;
            case 4: this.questions = await bee.getStandardValue(this, "UserBookmarkedQuestions", []); break;
        }
        this.endOfList = false;
    }
    endOfList = false;
    async Paginate(newPage:number) {
        let response = [];
        switch(this.offsetTab) {
            case 0: response = await bee.getStandardValue(null, "Notifications", [true, newPage]); break;
            case 1: response = await bee.getStandardValue(null, "UserAnswers", [this.name, newPage]); break;
            case 2: response = await bee.getStandardValue(null, "UserQuestions", [this.name, newPage]); break;
            case 3: response = await bee.getStandardValue(null, "UserBookmarkedAnswers", [newPage]); break;
            case 4: response = await bee.getStandardValue(null, "UserBookmarkedQuestions", [newPage]); break;
        }
        this.endOfList = response.length === 0;
        switch(this.offsetTab) {
            case 0: this.notifications.push(...response); break;
            case 1:
            case 3: this.answers.push(...response); break;
            case 2: 
            case 4: this.questions.push(...response); break;
        }
    }
    DismissAllNotifications() {
        this.$store.commit("updateNotifications", { notifications: [], totalunread: 0 });
        this.notifications.forEach(n => n.seen = true);
        bee.post(null, "DismissAllNotifications");
    }
}
</script>