<template>
<v-container>
    <v-row>
        <v-col cols="12" sm="2" order="2" class="hidden-sm-and-down" />
        <v-col cols="12" sm="8" order="3">
            <Loader v-if="loading" />
            <v-sheet v-if="userInfo !== null" class="mb-4 pa-2 px-4 text-center">
                <v-row>
                    <v-col>
                        <v-avatar class="mx-auto" size="48" :color="userInfo.color"><emoji class="pt-1" :emoji="userInfo.emoji" /></v-avatar>
                    </v-col>
                </v-row>
                <v-row class="mt-2">
                    <v-col class="mx-auto">
                        <div class="pb-3">
                            <h1>{{userInfo.displayname}}</h1>
                        </div>
                        <div class="align-center mx-auto">
                            <v-row>
                                <v-col class="my-auto">
                                    <v-progress-circular rotate="270" :value="percentToNextLevel" size="64" width="8" color="primary">
                                        <span style="color:#FFFFFF">Lv. {{userInfo.level}}</span>
                                    </v-progress-circular>
                                    <div>{{userInfo.score.toLocaleString()}} beePloids</div>
                                    <div class="text-caption" v-if="parseInt(userInfo.score) < parseInt(userInfo.nextLevelUp)">
                                        {{(userInfo.nextLevelUp - userInfo.score).toLocaleString()}} to Level {{parseInt(userInfo.level) + 1}}
                                    </div>
                                </v-col>
                                <v-col class="my-auto">
                                    <div class="text-h6">{{userInfo.levelTitle}}</div>
                                    <div class="text-caption">{{userInfo.levelDesc}}</div>
                                </v-col>
                            </v-row>
                        </div>
                    </v-col>
                </v-row>
                <div>
                    <v-row class="mt-3 mb-0" v-if="userInfo !== null">
                        <v-col cols="12" md="4" class="text-caption pb-0 pt-1">
                            <strong>{{$t("bestQuestions")}}:</strong>
                            {{userInfo.bestQuestions}} ({{$filters.percent(userInfo.bestQuestions / userInfo.questions)}})
                        </v-col>
                        <v-col cols="12" md="4" class="text-caption pb-0 pt-1"><strong>{{$t("totalAnswers")}}:</strong> {{userInfo.answers}}</v-col>
                        <v-col cols="12" md="4" class="text-caption pb-0 pt-1"><strong>{{$t("totalQuestions")}}:</strong> {{userInfo.questions}}</v-col>
                    </v-row>
                </div>
            </v-sheet>
            <v-row v-if="userInfo !== null">
                <v-col>
                    <v-sheet><UserActivity :name="userInfo.displayname" :isLoggedInUser="false" /></v-sheet>
                </v-col>
            </v-row>
        </v-col>
        <v-col cols="12" sm="2" order="1" order-md="4">
            <UserInfo />
        </v-col>
    </v-row>
</v-container>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { bee, BeeResponse } from 'src/util/webmethod';
import { UserProfileModel } from 'src/models/AnswerModel';
@Component
export default class SettingsPage extends Vue {
    loading = true;
    userInfo:UserProfileModel|null = null;
    get percentToNextLevel() {
        if(this.userInfo === null) { return 0; }
        if(this.userInfo.nextLevelUp === null) { return 100; }
        const ploidsFromThisLevel = this.userInfo.score - this.userInfo.lastLevelUp;
        const ploidsBetweenLevels = this.userInfo.nextLevelUp - this.userInfo.lastLevelUp;
        return (100 * ploidsFromThisLevel / ploidsBetweenLevels).toFixed(0);
    }
    created() {
        const displayname = this.$route.params.id;
        if(displayname === "" || displayname === undefined) {
            this.$router.push("/");
            return;
        }
        bee.get(this, "UserProfile", [displayname], (data:BeeResponse<UserProfileModel>) => {
            this.userInfo = data.result;
            document.title = `Bee Questions! - "${data.result.displayname}"`;
        });
    }
}
</script>