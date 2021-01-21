<template>
	<v-card :color="bgcolor" class="ma-2 mt-5 mb-4" :shaped="question.winner" :to="showAnswer ? ('/answer/' + question.answerURL) : ''">
		<v-row class="pl-4">
			<div class="text-center pa-2" v-if="question.winner">
				<v-icon style="font-size:64px">mdi-trophy-award</v-icon>
			</div>
			<div>
				<v-card-title v-if="!showAnswer">{{question.question}}</v-card-title>
				<v-card-title v-if="showAnswer" class="pb-0">Q: {{question.question}}</v-card-title>
				<v-card-title v-if="showAnswer" class="pt-0 mx-4 text-body-1">A: {{question.answer}}</v-card-title>
			</div>
			<v-spacer />
			<div v-if="question.authoremoji">
				<UserAvatar css="mr-8 my-4" :displayname="question.author" :color="question.authorcolor" :emoji="question.authoremoji" />
			</div>
		</v-row>
		<v-row align="center" justify="end" class="mr-2" v-if="$store.state.auth">
			<v-card-subtitle class="mx-3 pb-2">
				{{$dayjs(question.posted).fromNow()}}
				<span v-if="question.yours && !showAnswer">
					• {{$t("yourquestion")}}
				</span>
			</v-card-subtitle>
			<v-spacer/>
			<LoadableTooltipIconButton @submit="FlagQuestion" color="error" cssclass="mr-8" icon="flag" textkey="flagquestion" />
			<LoadableTooltipIconButton @submit="ToggleVote" :color="votecolor" :icon="voteIcon" :textkey="question.liked ? 'unvotequestion' : 'votequestion'" />
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
	created() { this.alreadyLiked = this.question?.liked || false; }
	get bgcolor() {
		if(!this.question) { return "primary"; }
		if(this.question.winner) { return "success"; }
		return (this.question.yours && !this.showAnswer) ? "primary" : "secondary";
	}
	get votecolor() {
		if(!this.question) { return "secondary"; }
		if(this.question.winner) { return "secondary"; }
		return (this.question.yours && !this.showAnswer) ? "secondary" : "primary";
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
	FlagQuestion(btn:Loadable) {
		if(this.question === undefined) { return; }
		bee.post(btn, "Report", { id: this.question.id, type: "question" });
	}
}
</script>