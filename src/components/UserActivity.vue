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
        <div v-if="tab===0">
            Notifications go here.
        </div>
        <div v-if="tab===1||tab===3">
            <ListAnswer v-for="answer in answers" :key="answer.id" :answer="answer"/>
        </div>
        <div v-if="tab===2||tab===4">
            <ListQuestion :showAnswer="true" v-for="question in questions" :key="question.id" :question="question"/>
        </div>
    </v-container>
</v-container>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { bee, BeeResponse } from 'src/util/webmethod';
import { AnswerModel, QuestionModel } from 'src/models/AnswerModel';
@Component
export default class HomePage extends Vue {
    @Prop() name?:string;
    @Prop() isLoggedInUser?:boolean;
    tab = 0;
    loading = false;
    answers:AnswerModel[] = [];
    questions:QuestionModel[] = [];
    created() { this.SwitchTab(0); }
    async SwitchTab(tab:number) {
        this.tab = tab;
        switch(this.tab) {
            case 1: this.answers = await bee.getStandardValue(this, "UserAnswers", [this.name]); break;
            case 2: this.questions = await bee.getStandardValue(this, "UserQuestions", [this.name]); break;
            case 3: this.answers = await bee.getStandardValue(this, "UserBookmarkedAnswers", []); break;
            case 4: this.questions = await bee.getStandardValue(this, "UserBookmarkedQuestions", []); break;
        }
    }
}
</script>