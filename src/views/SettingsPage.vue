<template>
<v-container>
    <v-row>
        <v-col cols="12" sm="2" class="hidden-sm-and-down" />
        <v-col v-if="$store.state.auth" cols="12" sm="8">
            <v-sheet class="mb-4 pa-2 px-4 text-center">
                <v-row v-if="editingEmoji===''">
                    <v-hover v-slot="{hover}">
                        <v-avatar @click="EditProfileEmoji" :class="{ 'mx-auto': true, 'on-hover': hover }" size="48" :color="$store.state.userInfo.color">
                            <emoji class="pt-1" :emoji="$store.state.userInfo.emoji"/>
                            <v-icon v-if="hover" style="position:absolute;top:0;left:0">mdi-pencil</v-icon>
                        </v-avatar>
                    </v-hover>
                </v-row>
                <v-row v-if="editingEmoji!==''">
                    <TwemojiSelector :color="editingColor" :emoji="editingEmoji" @finish="EndProfileEmoji" />
                </v-row>
                <v-row class="mt-2">
                    <div class="mx-auto">
                        <div class="pb-3" v-if="editDisplayName">
                            <v-text-field v-model="displayname" maxlength="20" counter="20" :label="$t('newdisplayname')"></v-text-field>
                            <div>
                                <v-btn color="secondary" class="mr-4" @click="editDisplayName=false">{{$t("cancel")}}</v-btn>
                                <LoadableButton color="accent" textkey="save" :valid="true" @submit="ChangeName"/>
                            </div>
                        </div>
                        <div class="pb-3" v-if="!editDisplayName">
                            <h1>{{$store.state.userInfo.displayname}}</h1>
                            <a class="subtitle-2" @click="displayname = $store.state.userInfo.displayname; editDisplayName=true">{{$t("changename")}}</a>
                        </div>
                        <div class="align-center mx-auto" v-if="additionalInfo">
                            <v-row>
                                <v-col class="my-auto">
                                    <v-progress-circular rotate="270" :value="percentToNextLevel" size="64" width="8" color="primary">
                                        <span style="color:#FFFFFF">Lv. {{$store.state.userInfo.level}}</span>
                                    </v-progress-circular>
                                    <div>{{$store.state.userInfo.score.toLocaleString()}} beePloids</div>
                                    <div class="text-caption" v-if="parseInt(additionalInfo.score) < parseInt(additionalInfo.nextLevelUp)">
                                        {{(additionalInfo.nextLevelUp - additionalInfo.score).toLocaleString()}} to Level {{$store.state.userInfo.level + 1}}
                                    </div>
                                </v-col>
                                <v-col class="my-auto">
                                    <div class="text-h6">{{additionalInfo.levelTitle}}</div>
                                    <div class="text-caption">{{additionalInfo.levelDesc}}</div>
                                </v-col>
                            </v-row>
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
                            <!--<v-btn v-if="$store.state.userInfo.source==='twitter'" class="mb-2" color="accent">{{$t("unlinkTwitter")}}</v-btn>
                            <v-btn v-if="$store.state.userInfo.source==='email'" class="mb-2" color="accent">{{$t("changeEmail")}}</v-btn>-->
                            <v-dialog v-if="$store.state.userInfo.source==='email'" v-model="showPasswordDialog" width="500">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn v-bind="attrs" v-on="on" class="mb-2" color="accent">{{$t("changePassword")}}</v-btn>
                                </template>
                                <v-card style="border: 1px solid white">
                                    <v-card-title>{{$t("changePassword")}}</v-card-title>
                                    <v-card-text>
                                        <p>{{$t("changePasswordText")}}</p>
                                        <v-form ref="formPassword">
                                            <v-text-field 
                                                v-model="oldPassword"
                                                :append-icon="showPassword?'mdi-eye':'mdi-eye-off'"
                                                :type="showPassword?'text':'password'"
                                                @click:append="showPassword=!showPassword"
                                                :rules="passwordrules"
                                                :label="$t('oldPassword')"
                                                required />
                                            <v-text-field 
                                                v-model="newPassword"
                                                :append-icon="showPassword?'mdi-eye':'mdi-eye-off'"
                                                :type="showPassword?'text':'password'"
                                                @click:append="showPassword=!showPassword"
                                                :rules="passwordrules"
                                                :label="$t('newPassword')"
                                                required />
                                            <v-text-field 
                                                v-model="confirmNewPassword"
                                                :append-icon="showPassword?'mdi-eye':'mdi-eye-off'"
                                                :type="showPassword?'text':'password'"
                                                @click:append="showPassword=!showPassword"
                                                :rules="[v => v === newPassword || $t('plzpasswordmatch') ]"
                                                :label="$t('confirmNewPassword')"
                                                required />
                                        </v-form>
                                    </v-card-text>
                                    <v-divider/>
                                    <v-card-actions>
                                        <v-spacer/>
                                        <v-btn color="secondary" class="mr-4" @click="showPasswordDialog=false">{{$t("cancel")}}</v-btn>
                                        <LoadableButton color="accent" textkey="save" :valid="true" @submit="SavePasswordChange"/>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                            <!--<v-btn class="mb-2" color="secondary">{{$t("deactivateAccount")}}</!-->
                        </div>
                    </v-sheet>
                </v-col>
                <v-col cols="12" sm="8">
                    <a name="notifs" />
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
import { AdditionalUserModel } from 'src/models/AnswerModel';
import { Loadable } from 'src/util/Loadable';
@Component
export default class SettingsPage extends Vue {
    displayname = "";
    editDisplayName = false;
    editingColor = "";
    editingEmoji = "";
    additionalInfo:AdditionalUserModel|null = null;
    get percentToNextLevel() {
        if(this.additionalInfo === null) { return 0; }
        if(this.additionalInfo.nextLevelUp === null) { return 100; }
        const ploidsFromThisLevel = this.additionalInfo.score - this.additionalInfo.lastLevelUp;
        const ploidsBetweenLevels = this.additionalInfo.nextLevelUp - this.additionalInfo.lastLevelUp;
        return (100 * ploidsFromThisLevel / ploidsBetweenLevels).toFixed(0);
    }
    created() {
        if(!this.$store.state.auth) {
            this.$router.push("/");
            return;
        }
        bee.get(null, "AdditionalUserInfo", [], (data:BeeResponse<AdditionalUserModel>) => {
            this.additionalInfo = data.result;
        });
    }
    EditProfileEmoji() {
        this.editingColor = this.$store.state.userInfo.color;
        this.editingEmoji = this.$store.state.userInfo.emoji;
    }
    EndProfileEmoji() { this.editingEmoji = ""; }
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

    oldPassword = "";
    newPassword = "";
    confirmNewPassword = "";
    passwordrules = [ (v:string) => !!v || this.$t("plzpassword") ];
    showPassword = false;
    showPasswordDialog = false;
    validPassword = true;
    validatePassword() { this.validPassword = (this.$refs.formPassword as Vue & { validate: () => boolean }).validate(); }
    SavePasswordChange(btn:Loadable) {
        this.validatePassword();
        if(!this.validPassword) { return; }
        bee.post(btn, "PasswordChange", { oldPassword: this.oldPassword, newPassword: this.newPassword }, () => {
            this.showPasswordDialog = false;
        });
    }
}
</script>