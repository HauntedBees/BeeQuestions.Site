<template>
	<v-container>
		<v-row>
			<v-col cols="12" sm="2" order="2" class="hidden-sm-and-down">
				<v-sheet shaped min-height="268" class="px-4 py-2">
					<h3>{{$t("populartags")}}</h3>
					<ul>
						<li v-for="tag in tags" :key="tag" class="mb-1">
							<Tag :tag="tag" />
						</li>
						<li class="subtitle-2">
							<router-link to="/tags">{{$t("browsetags")}}</router-link>
						</li>
					</ul>
				</v-sheet>
			</v-col>
			<v-col cols="12" sm="8" order="3">
				<v-sheet rounded="lg" min-height="70vh">
					<div>
						<TabList @switch-tab="SwitchTab" />
						<Loader v-if="loading" />
						<div v-if="!loading">
							<ListAnswer v-for="answer in answers" :key="answer.id" :answer="answer"/>
							<LoadMore @loadmore="Paginate" :reachedEnd="endOfList" />
						</div>
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
import { Component } from 'vue-property-decorator';
import { AnswerModel } from 'src/models/AnswerModel';
import { bee } from 'src/util/webmethod';
import { Loadable } from 'src/util/Loadable';
@Component
export default class HomePage extends Loadable {
	tags:string[] = [];
	answers:AnswerModel[] = [ new AnswerModel() ];
	created() {
		this.SwitchTab(0);
		this.SetUpTags();
	}
	async SetUpTags() {
		this.tags = await bee.getStandardValue(this, "Tags", ["popular"]);
	}
	async SwitchTab(tab:number) {
		this.tab = tab;
		this.answers = await bee.getStandardValue(this, "HomePageAnswers", [tab]);
		this.endOfList = false;
	}
	tab = 0;
	endOfList = false;
	async Paginate(newPage:number) {
		const response = await bee.getStandardValue(null, "HomePageAnswers", [this.tab, newPage]);
		this.endOfList = response.length === 0;
		this.answers.push(...response);
	}
}
</script>