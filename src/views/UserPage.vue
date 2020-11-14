<template>
<v-container>
    <v-row>
        <v-col cols="12" sm="2" class="hidden-sm-and-down" />
        <v-col cols="12" sm="8">
            <Loader v-if="loading" />
            <v-sheet v-if="userInfo !== null" class="mb-4 pa-2 px-4 text-center">
                <v-row>
                    <v-avatar class="mx-auto" size="48" :color="userInfo.color"><emoji class="pt-1" :emoji="userInfo.emoji"/></v-avatar>
                </v-row>
                <v-row class="mt-2">
                    <div class="mx-auto">
                        <div class="pb-3">
                            <h1>{{userInfo.displayname}}</h1>
                        </div>
                        <div>
                            <v-chip small color="accent">Lv. {{userInfo.level}}</v-chip>
                            {{userInfo.score.toLocaleString()}} beePloids
                        </div>
                    </div>
                </v-row>
                <div>
                    <v-row class="mt-2">
                        <v-col class="text-caption pb-0 pt-1" v-if="userInfo !== null">
                            <strong>{{$t("bestQuestions")}}:</strong>
                            {{userInfo.bestQuestions}} ({{$filters.percent(userInfo.bestQuestions / userInfo.questions)}})
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="3" class="text-caption pb-0 pt-1"><strong>{{$t("totalAnswers")}}:</strong> {{userInfo.answers}}</v-col>
                        <v-col cols="12" sm="3" class="text-caption pb-0 pt-1"><strong>{{$t("totalQuestions")}}:</strong> {{userInfo.questions}}</v-col>
                        <v-col cols="12" sm="3" class="text-caption pb-0 pt-1"><strong>{{$t("answersSaved")}}:</strong> {{userInfo.answerLikes}}</v-col>
                        <v-col cols="12" sm="3" class="text-caption pb-0 pt-1"><strong>{{$t("questionsLiked")}}:</strong> {{userInfo.questionLikes}}</v-col>
                    </v-row>
                </div>
            </v-sheet>
            <v-row v-if="userInfo !== null">
                <v-col>
                    <v-sheet><UserActivity :name="userInfo.displayname" :isLoggedInUser="false" /></v-sheet>
                </v-col>
            </v-row>
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