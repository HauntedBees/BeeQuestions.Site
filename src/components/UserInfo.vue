<template>
<v-sheet shaped class="pa-5">
    <div v-if="!$store.state.auth" class="align-center">
        <v-img alt="Bee Questions! Logo" class="shrink mx-auto" contain :src="require('../assets/logo.png')" transition="scale-transition" width="40" />
        <p class="text-sm-body-2">
            Welcome to Bee Questions, the world's first A&amp;Q site! If this is your first time here, click around, read the <router-link to="/about">about page</router-link>,
            and see if this is the sort of thing you find funny! If it is and you want to play along, perhaps you'll <router-link to="/signup">sign up</router-link> and join us!
        </p>
        <p class="text-sm-body-2">
            Just make sure you read the <router-link to="/rules">rules</router-link> first because, well, you know the drill. This isn't the first website you've 
            ever been to. And if it is, wow, congratulations. Welcome to the internet. I'm honored.
        </p>
    </div>
    <v-expansion-panels v-if="$store.state.auth" flat :value="showUserInfo">
        <v-expansion-panel>
            <v-expansion-panel-header class="ma-0 pa-0" :hide-actions="hideExpandIcon" :disabled="hideExpandIcon">
                <v-container class="pa-0">
                    <v-row>
                        <v-col cols="3">
                            <v-badge overlap :content="$store.state.userInfo.totalunread" :value="$store.state.userInfo.notifications.length > 0">
                                <UserAvatar :settings="true" :color="$store.state.userInfo.color" :emoji="$store.state.userInfo.emoji" />
                            </v-badge>
                        </v-col>
                        <v-col cols="9">
                            <div>
                                <span class="mr-3">{{$store.state.userInfo.displayname}}</span>
                                <v-chip small color="accent">Lv. {{$store.state.userInfo.level}}</v-chip>
                            </div>
                            <div>
                                {{$store.state.userInfo.score.toLocaleString()}} beePloids
                            </div>
                        </v-col>
                    </v-row>
                    <v-row class="ml-1">
                        <v-dialog v-model="showAnswerDialog" width="640">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn v-bind="attrs" v-on="on" color="primary" @click.stop="GiveAnswer" class="mx-auto">Give an Answer</v-btn>
                            </template>
                            <v-card style="border: 1px solid white">
                                <v-card-title>{{$t("giveanswer")}}</v-card-title>
                                <v-card-text>
                                    <p>{{$t("giveanswerdesc")}}</p>
                                    <v-textarea
                                        outlined
                                        :label="$t('giveanswertextarea')"
                                        v-model="myAnswer"
                                        maxlength="500"
                                        counter="500" />
                                    <v-autocomplete
                                        v-model="tagSelection" @input="TagChange" multiple
                                        :loading="loading" :items="tagList" :search-input.sync="tagSearch" :menu-props="tagMenuProps"
                                        :counter="5" :counter-value="selectedCount" hide-selected hide-no-data
                                        chips deletable-chips auto-select-first cache-items
                                        :hint="$t($store.state.userInfo.level >= 3 ? 'taghint_high' : 'taghint_low')" persistent-hint
                                        :label="$t('tagselectlabel')" />
                                </v-card-text>
                                <v-divider/>
                                <v-card-actions>
                                    <v-spacer/>
                                    <v-btn color="secondary" text class="ml-5" @click="showAnswerDialog=false">{{$t("cancelbutton")}}</v-btn>
                                    <LoadableButton color="primary" textkey="submit" :valid="myAnswer.length > 0 && tagSelection.length > 0" @submit="PostAnswer"/>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-row>
                </v-container>
            </v-expansion-panel-header>
            <v-expansion-panel-content class="px-0">
                <v-row class="ml-3 my-2" v-if="$store.state.userInfo.blockdate !== null">
                    <div class="text-caption"><strong>Posting Block for:</strong> {{$dayjs($store.state.userInfo.blockdate).fromNow(true)}}</div>
                </v-row>
                <v-row class="ml-3 my-2" v-if="$store.state.userInfo.blockdate === null">
                    <div class="text-caption"><strong>{{$t("remainingQuestions")}}:</strong> {{$store.state.userInfo.questionsPerDay - $store.state.userInfo.questionsAsked}}</div>
                    <div class="text-caption"><strong>{{$t("remainingAnswers")}}:</strong> {{$store.state.userInfo.answersPerDay - $store.state.userInfo.answersGiven}}</div>
                </v-row>
                <v-divider />
                <v-row class="my-2">
                    <div style="width:100%">
                        <div>
                            <Notification v-for="notification in $store.state.userInfo.notifications" :homescreen="true" :key="notification.id" :notification="notification" />
                        </div>
                        <div class="text-caption text-right mb-2" v-if="($store.state.userInfo.totalunread - $store.state.userInfo.notifications.length) > 0">
                            <i18n path="andXMore">
                                {{$store.state.userInfo.totalunread - $store.state.userInfo.notifications.length}}
                            </i18n>
                        </div>
                    </div>
                    <div class="text-caption mx-auto"><router-link to="/settings#notifs">{{$t("viewallnotifications")}}</router-link></div>
                </v-row>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </v-expansion-panels>
</v-sheet>
</template>
<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import { bee, BeeResponse } from 'src/util/webmethod';
import { RefreshedUserInfoModel } from 'src/models/AuthModel';
@Component
export default class HomePage extends Vue {
    showUserInfoMobile:number|undefined;
    showAnswerDialog = false;
    myAnswer = "";
    tagSelection:string[] = [];
    tagSearch = "";
    tagMenuProps = { disabled: false };
    tagList:string[] = [];
    loading = false;
    selectedCount() { return this.tagSelection.length; }
    get showUserInfo() {
        switch(this.$vuetify.breakpoint.name) {
            case "xl":
            case "lg":
            case "md":
                return 0;
            default:
                return this.showUserInfoMobile;
        }
    }
    get hideExpandIcon() {
        switch(this.$vuetify.breakpoint.name) {
            case "xl":
            case "lg":
            case "md":
                return true;
            default:
                return false;
        }
    }

    componentDestroyed = false;
    refreshIdx = 0;
    RefreshUserInfo() {
        if(!this.$store.state.auth) { return; }
        window.clearTimeout(this.refreshIdx);
        if(!document.hasFocus()) {
            this.refreshIdx = window.setTimeout(() => this.RefreshUserInfo(), 300000);
            return;
        }
        bee.get(null, "UpdatedStats", [], (data:BeeResponse<RefreshedUserInfoModel>) => {
            this.$store.commit("updateStats", data.result);
            if(!this.$store.state.auth || this.componentDestroyed) { return; }
            this.refreshIdx = window.setTimeout(() => this.RefreshUserInfo(), 60000);
        });
    }
    destroyed() { this.componentDestroyed = true; window.clearTimeout(this.refreshIdx); }

    created() { this.RefreshUserInfo(); }
    delayIdx = 0;
    @Watch("tagSearch")
    searchChanged(value:string|null) {
        window.clearTimeout(this.delayIdx);
        if(value) { this.delayIdx = window.setTimeout(() => this.DoTagSearch(), 300); }
    }
    async DoTagSearch() {
        if(this.tagSearch === null) { return; }
        this.tagList = await bee.getStandardValue(this, "AutocompleteTags", [this.tagSearch]);
        if(this.$store.state.userInfo.level >= 3 && this.tagSearch.length >= 3) {
            this.tagList.push(this.tagSearch.substring(0, 15));
        }
    }
    TagChange() {
        this.tagMenuProps.disabled = this.tagSelection.length >= 5;
        if(this.tagSelection.length > 5) {
            this.tagSelection = this.tagSelection.splice(0, 5);
        }
        this.tagSearch = "";
    }
    GiveAnswer() {
        this.myAnswer = "";
        this.tagSelection = [];
        this.tagSearch = "";
        this.DoTagSearch();
    }
    PostAnswer() {
        bee.post(null, "Answer", { answer: this.myAnswer, tags: this.tagSelection }, (data:BeeResponse<string>) => {
            this.$router.push("/answer/" + data.result);
        });
    }
}
</script>