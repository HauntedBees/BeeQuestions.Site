<template>
<v-container>
    <v-row>
        <v-col cols="12" sm="2" order="2" class="hidden-sm-and-down" />
        <v-col cols="12" sm="8" order="3">
            <v-sheet class="mb-4 pa-2" v-if="answer !== null">
                <v-card color="accent" class="ma-2" elevation="2">
                    <v-card-subtitle class="pb-0">
                        <UserAvatar css="mr-2" :displayname="answer.author" :color="answer.authorcolor" :emoji="answer.authoremoji" />
                        <Tag v-for="tag in answer.tags" small :key="tag" :tag="tag" />
                    </v-card-subtitle>
                    <v-card-title class="pt-2">{{answer.answer}}</v-card-title>
                    <v-card-subtitle>
                        {{$dayjs(answer.opened).fromNow()}}
                         • 
                        <i18n v-if="!answer.closed" path="votingends">{{$dayjs(answer.closedate).toNow(true)}}</i18n>
                        <i18n v-if="answer.closed" path="votingended">{{$dayjs(answer.closed).fromNow()}}</i18n>
                    </v-card-subtitle>
                </v-card>
                <div class="pa-2" v-if="$store.state.auth">
                    <LoadableTooltipIconButton color="error" @submit="FlagAnswer" icon="flag" textkey="flaganswer" />
                    <div class="float-right">
                        <LoadableTooltipIconButton color="primary" @submit="BookmarkAnswer" 
                            :icon="(answer && answer.liked) ? 'bookmark-minus' : 'bookmark-plus'"
                            :textkey="(answer && answer.liked) ? 'unsavebookmark' : 'savebookmark'" />
                        <v-btn :disabled="!canAsk" color="primary" class="ml-5" @click="isAsking=true"><v-icon>mdi-comment-question</v-icon> Question</v-btn>
                    </div>
                </div>
                <div class="pa-2 pb-4" v-if="answer.closed">
                    <h3 class="pl-2">{{$t("winningquestion")}}</h3>
                    <ListQuestion :key="bestquestion.id" :question="bestquestion" />
                    <v-divider/>
                </div>
                <div class="pa-2" v-if="isAsking && !answer.closed">
                    <v-card color="accent" elevation="2">
                        <v-card-title>{{$t("askquestion")}}</v-card-title>
                        <v-card-subtitle>{{$t("askquestiondesc")}}</v-card-subtitle>
                        <v-textarea
                            name="myQuestion"
                            class="px-2"
                            outlined
                            :disabled="$store.state.userInfo.blockdate !== null"
                            :label="$t('askquestiontextarea')"
                            v-model="myQuestion"
                            maxlength="500"
                            counter="500" />
                        <v-card-actions class="align-right">
                            <v-spacer></v-spacer>
                            <v-btn color="secondary" text class="ml-5" @click="isAsking=false;myQuestion=''">{{$t("cancelbutton")}}</v-btn>
                            <LoadableButton :disabled="!canAsk" color="primary" :text="$t('askbutton')" :loadtext="$t('askbutton_loading')" :valid="myQuestion.length > 0" @submit="PostQuestion"/>
                        </v-card-actions>
                    </v-card>
                </div>
                <div class="pa-2" v-if="answer.questions.length > 0">
                    <v-row class="pl-6">
                        <h3>{{$tc("numquestionspage", answer.questions.length)}}</h3>
                        <v-chip label class="ml-3" @click="SortQuestions(0)" :color="sort===0?'primary':'secondary'">Random</v-chip>
                        <v-chip label class="ml-1" @click="SortQuestions(1)" :color="sort===1?'primary':'secondary'">Popular</v-chip>
                        <v-chip label class="ml-1" @click="SortQuestions(2)" :color="sort===2?'primary':'secondary'">Newest</v-chip>
                        <v-chip label class="ml-1" @click="SortQuestions(3)" :color="sort===3?'primary':'secondary'">Oldest</v-chip>
                    </v-row>
                    <ListQuestion v-for="question in answer.questions" :key="question.id" :question="question" />
                </div>
                <div class="pa-2 text-center" v-if="answer.questions.length === 0 && !isAsking">
                    <i18n path="noquestion">
                        <a href="#" @click="isAsking=true">{{$t("noquestionlink")}}</a>
                    </i18n>
                </div>
            </v-sheet>
        </v-col>
        <v-col cols="12" sm="2" order="1" order-md="4">
            <UserInfo />
        </v-col>
    </v-row>
</v-container>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Loadable } from 'src/util/Loadable';
import { FullAnswerModel, QuestionModel } from 'src/models/AnswerModel';
import { bee, BeeResponse } from 'src/util/webmethod';
@Component
export default class AnswerPage extends Vue {
    isAsking = false;
    myQuestion = "";
    answerid = "";
    alreadyLiked = false;
    answer:FullAnswerModel|null = null;
    sort = 0;
    get bestquestion() {
        if(this.answer === null) { return new QuestionModel(); }
        const a = this.answer; // typescript linter does a big mad if I don't do this
        return a.questions.filter(q => q.id === a.bestquestion)[0];
    }
    get canAsk() { return this.answer?.closed === null && this.$store.state.userInfo.blockdate === null && this.answer?.yours === false; }
    created() {
        const id = this.$route.params.id;
        if(id === "" || id === undefined) {
            this.$router.push("/");
            return;
        }
        this.answerid = id;
        bee.get(null, "Answer", [id], (data:BeeResponse<FullAnswerModel>) => {
            this.answer = data.result;
            this.isAsking = this.answer.questions.length === 0;
            this.SortQuestions(0);
            document.title = `Bee Questions! - "${this.answer.answer}"`;
        });
    }
    BookmarkAnswer(btn:Loadable) {
        bee.post(btn, "AnswerLikeToggle", this.answerid, (data:BeeResponse<boolean>) => {
            if(this.answer === null) { return; }
            this.answer.liked = data.result;
        });
    }
    PostQuestion(btn:Loadable) {
        bee.post(btn, "Question", {
            question: this.myQuestion,
            answer: this.answerid
        }, (data:BeeResponse<QuestionModel[]>) => {
            this.$store.commit("setMessage", ["success", "Question asked successfully!"]);
            this.myQuestion = "";
            this.isAsking = false;
            if(this.answer === null) { return; }
            this.answer.questions = data.result;
            this.SortQuestions(2);
        });
    }
    SortQuestions(sort:number) {
        if(this.answer === null) { return; }
        this.sort = sort;
        switch(this.sort) {
            case 0: this.answer.questions = this.ShuffleArray(this.answer.questions); break;
            case 1: this.answer.questions.sort((a:QuestionModel, b:QuestionModel) => b.score - a.score); break;
            case 2: this.answer.questions.sort((a:QuestionModel, b:QuestionModel) => -this.TimeCompare(a, b)); break;
            case 3: this.answer.questions.sort((a:QuestionModel, b:QuestionModel) => this.TimeCompare(a, b)); break;
        }
    }
    TimeCompare(a:QuestionModel, b:QuestionModel) {
        if(a.posted < b.posted) {
            return -1;
        } else if(a. posted > b.posted) {
            return 1;
        } else {
            return 0;
        }
    }
    SortArray(arr:QuestionModel[], sortFunc:(a:QuestionModel, b:QuestionModel) => number) {
        const newArr = [...arr];
        newArr.sort(sortFunc);
        return newArr;
    }
    ShuffleArray(arr:QuestionModel[]) {
        let cidx = arr.length;
        while(0 !== cidx) {
            const ridx = Math.floor(Math.random() * cidx);
            cidx--;
            const temp = arr[cidx];
            arr[cidx] = arr[ridx];
            arr[ridx] = temp;
        }
        return arr;
    }
    FlagAnswer(btn:Loadable) {
        bee.post(btn, "Report", { id: this.answerid, type: "answer" });
    }
}
</script>