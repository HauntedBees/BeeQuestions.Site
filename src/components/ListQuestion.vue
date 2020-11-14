<template>
  <v-card :color="(question.yours && !showAnswer) ? 'primary' : 'secondary'" class="ma-2" elevation="2" :to="showAnswer ? ('answer/' + question.answerURL) : ''">
    <v-card-title v-if="!showAnswer">{{question.question}}</v-card-title>
    <v-card-title v-if="showAnswer" class="pb-0">Q: {{question.question}}</v-card-title>
    <v-card-title v-if="showAnswer" class="pt-0 mx-5 subtitle-1">A: {{question.answer}}</v-card-title>
    <v-row align="center" justify="end" class="mr-2" v-if="$store.state.auth">
      <v-card-subtitle class="mx-3 pb-2">
        {{$dayjs(question.posted).fromNow()}}
        <span v-if="question.yours && !showAnswer">
          • {{$t("yourquestion")}}
        </span>
      </v-card-subtitle>
      <v-spacer/>
      <LoadableTooltipIconButton color="error" cssclass="mr-8" icon="flag" textkey="flagquestion" />
      <LoadableTooltipIconButton @submit="ToggleVote" :color="(question.yours && !showAnswer) ? 'secondary' : 'primary'" :icon="voteIcon" :textkey="question.liked ? 'unvotequestion' : 'votequestion'" />
    </v-row>
  </v-card>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { QuestionModel } from 'src/models/AnswerModel';
import { Loadable } from 'src/util/Loadable';
import { bee, BeeResponse } from 'src/util/webmethod';
@Component
export default class ListQuestion extends Vue {
  @Prop() readonly question:QuestionModel | undefined;
  @Prop() readonly showAnswer:boolean | undefined;
  alreadyLiked = false;
  created() {
    this.alreadyLiked = this.question?.liked || false;
  }
  get voteIcon() { return this.alreadyLiked || (this.question && this.question.liked) ? "heart-broken" : "heart"; }
  ToggleVote(btn:Loadable) {
    if(this.question === undefined) { return; }
    bee.post(btn, "QuestionLikeToggle", this.question.id, (data:BeeResponse<boolean>) => {
      if(this.question === undefined) { return; }
      this.question.liked = data.result;
      this.alreadyLiked = data.result;
      this.question.score += data.result ? 1 : -1;
    });
  }
}
</script>