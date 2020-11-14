<template>
<v-container>
    <v-row>
        <v-col cols="12" sm="2" class="hidden-sm-and-down" />
        <v-col cols="12" sm="8">
            <v-sheet class="mb-4 pa-2 px-4 text-center">
                <v-row>
                    <v-avatar class="mx-auto" size="48" color="indigo"><span class="white--text">CH</span></v-avatar>
                </v-row>
                <v-row class="mt-2">
                    <div class="mx-auto">
                        <div class="pb-3" v-if="editDisplayName">
                            <v-text-field v-model="displayname" :label="$t('newdisplayname')"></v-text-field>
                            <div>
                                <v-btn color="secondary" class="mr-4" @click="editDisplayName=false">{{$t("cancel")}}</v-btn>
                                <LoadableButton color="accent" textkey="save" :valid="true" @submit="ChangeName"/>
                            </div>
                        </div>
                        <div class="pb-3" v-if="!editDisplayName">
                            <h1>{{$store.state.userInfo.displayname}}</h1>
                            <a class="subtitle-2" @click="displayname = $store.state.userInfo.displayname; editDisplayName=true">{{$t("changename")}}</a>
                        </div>
                        <div>
                            <v-chip small color="accent">Lv. {{$store.state.userInfo.level}}</v-chip>
                            {{$store.state.userInfo.score.toLocaleString()}} beePloids
                        </div>
                    </div>
                </v-row>
                <div>
                    <v-row class="my-2" v-if="$store.state.userInfo.blockdate !== null">
                        <v-col class="font-weight-black">Blocked from posting for {{$dayjs($store.state.userInfo.blockdate).fromNow(true)}}</v-col>
                    </v-row>
                    <v-row class="mt-2">
                        <v-col cols="12" sm="4" class="text-caption pb-0 pt-1"><strong>{{$t("remainingAnswers")}}:</strong> {{$store.state.userInfo.answersPerDay - $store.state.userInfo.answersGiven}}</v-col>
                        <v-col cols="12" sm="4" class="text-caption pb-0 pt-1"><strong>{{$t("remainingQuestions")}}:</strong> {{$store.state.userInfo.questionsPerDay - $store.state.userInfo.questionsAsked}}</v-col>
                        <v-col cols="12" sm="4" class="text-caption pb-0 pt-1" v-if="additionalInfo !== null">
                            <strong>{{$t("bestQuestions")}}:</strong>
                            {{additionalInfo.bestQuestions}} ({{$filters.percent(additionalInfo.bestQuestions / additionalInfo.questions)}})
                        </v-col>
                    </v-row>
                    <v-row v-if="additionalInfo !== null">
                        <v-col cols="12" sm="3" class="text-caption pb-0 pt-1"><strong>{{$t("totalAnswers")}}:</strong> {{additionalInfo.answers}}</v-col>
                        <v-col cols="12" sm="3" class="text-caption pb-0 pt-1"><strong>{{$t("totalQuestions")}}:</strong> {{additionalInfo.questions}}</v-col>
                        <v-col cols="12" sm="3" class="text-caption pb-0 pt-1"><strong>{{$t("answersSaved")}}:</strong> {{additionalInfo.answerLikes}}</v-col>
                        <v-col cols="12" sm="3" class="text-caption pb-0 pt-1"><strong>{{$t("questionsLiked")}}:</strong> {{additionalInfo.questionLikes}}</v-col>
                    </v-row>
                </div>
            </v-sheet>
            <v-row>
                <v-col cols="12" sm="4">
                    <v-sheet class="mb-4 pa-2 px-4 text-center">
                        <h2>{{$t("loginInfo")}}</h2>
                        <v-subheader style="height:auto">{{$t("neverShared")}}</v-subheader>
                        <v-divider class="my-2" />
                        <div class="text-left mx-4 mb-4">
                            <div class="mb-1">
                                <strong>{{$t("accountCreated")}}: </strong> {{$dayjs($store.state.userInfo.joined).format("LL")}}
                            </div>
                            <div class="mb-1">
                                <strong>{{$t("lastLogin")}}: </strong> {{$dayjs($store.state.userInfo.lastlogin).format("LL")}}
                            </div>
                            <div class="mb-1">
                                <strong>{{$t("loginType")}}: </strong> {{$filters.titlecase($store.state.userInfo.source)}}
                            </div>
                            <div class="mb-1" v-if="$store.state.userInfo.source==='email'">
                                <strong>{{$t("emailAddress")}}: </strong> {{$store.state.userInfo.sourcename}}
                            </div>
                            <div class="mb-1" v-if="$store.state.userInfo.source==='twitter'">
                                <strong>{{$t("twitterAccount")}}: </strong> <ax :href="'https://www.twitter.com/' + $store.state.userInfo.sourcename">@{{$store.state.userInfo.sourcename}}</ax>
                            </div>
                        </div>
                        <div class="mx-auto">
                            <!--<v-btn v-if="$store.state.userInfo.source==='twitter'" class="mb-2" color="accent">{{$t("unlinkTwitter")}}</v-btn>-->
                            <v-btn v-if="$store.state.userInfo.source==='email'" class="mb-2" color="accent">{{$t("changeEmail")}}</v-btn>
                            <v-btn v-if="$store.state.userInfo.source==='email'" class="mb-2" color="accent">{{$t("changePassword")}}</v-btn>
                            <v-btn class="mb-2" color="secondary">{{$t("deactivateAccount")}}</v-btn>
                        </div>
                    </v-sheet>
                </v-col>
                <v-col cols="12" sm="8">
                    <v-sheet><UserActivity :name="$store.state.userInfo.displayname" :isLoggedInUser="true" /></v-sheet>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</v-container>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { bee, BeeResponse } from 'src/util/webmethod';
import { Loadable } from 'src/util/Loadable';
@Component
export default class SettingsPage extends Vue {
    displayname = "";
    editDisplayName = false;
    additionalInfo:object|null = null;
    created() {
        if(!this.$store.state.auth) {
            this.$router.push("/");
            return;
        }
        bee.get(null, "AdditionalUserInfo", [], (data:BeeResponse<object>) => {
            this.additionalInfo = data.result;
        });
    }
    ChangeName(btn:Loadable) {
        const trimmedName = this.displayname.trim();
        if(trimmedName === "" || trimmedName === this.$store.state.userInfo.displayname) {
            this.editDisplayName = false;
            return;
        }
        bee.post(btn, "DisplayName", trimmedName, () => {
            this.$store.commit("changename", trimmedName);
            this.editDisplayName = false;
        });
    }
}
</script>