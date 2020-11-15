<template>
<v-container>
    <v-row>
        <v-col cols="12" sm="2" order="2" class="hidden-sm-and-down" />
        <v-col cols="12" sm="8" order="3">
            <v-sheet class="mb-4 pa-2">
                <h2 class="px-3 py-1">
                    <i18n path="taganswers">{{titletag}}</i18n>
                </h2>
            </v-sheet>
            <v-sheet rounded="lg" min-height="70vh">
                <TabList @switch-tab="SwitchTab" />
                <Loader v-if="loading" />
                <div v-if="!loading">
                    <ListAnswer v-for="answer in answers" :key="answer.id" :answer="answer"/>
                    <div v-if="answers.length === 0" class="pt-16 text-center">
                        <i18n path="notag">
                            <span>{{titletag}}</span>
                            <router-link to="/answers/new">{{$t("notaglink")}}</router-link>
                        </i18n>
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
import { Loadable } from 'src/util/Loadable';
import { bee } from 'src/util/webmethod';
@Component
export default class TagPage extends Loadable {
    tag?:string;
    answers:AnswerModel[] = [ new AnswerModel() ];
    get titletag() { return (this.tag || "").replace(/-/g, " ").toLowerCase().replace(/^[a-z]|\s(.)/ig, c => c.toUpperCase()); }
    created() {
        this.tag = this.$route.params.tag;
        document.title = `Bee Questions! - ${this.titletag} Answers`;
        if(this.tag === "" || this.tag === undefined) {
            this.$router.push("/");
            return;
        }
        this.SwitchTab(0);
    }
    async SwitchTab(tab:number) {
        this.answers = await bee.getStandardValue(this, "TagAnswers", [this.tag, tab]);
    }
}
</script>