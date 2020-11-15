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
                <v-row>
                    <v-col cols="3">
                        <UserAvatar :settings="true" :color="$store.state.userInfo.color" :emoji="$store.state.userInfo.emoji" />
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
            </v-expansion-panel-header>
            <v-expansion-panel-content>
                <v-row class="ml-3 my-2" v-if="$store.state.userInfo.blockdate !== null">
                    <div class="text-caption"><strong>Posting Block for:</strong> {{$dayjs($store.state.userInfo.blockdate).fromNow(true)}}</div>
                </v-row>
                <v-row class="ml-3 my-2" v-if="$store.state.userInfo.blockdate === null">
                    <div class="text-caption"><strong>{{$t("remainingQuestions")}}:</strong> {{$store.state.userInfo.questionsPerDay - $store.state.userInfo.questionsAsked}}</div>
                    <div class="text-caption"><strong>{{$t("remainingAnswers")}}:</strong> {{$store.state.userInfo.answersPerDay - $store.state.userInfo.answersGiven}}</div>
                </v-row>
                <v-divider />
                <v-row class="ml-3 my-2">
                    Notifications go here
                </v-row>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </v-expansion-panels>
</v-sheet>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
@Component
export default class HomePage extends Vue {
    showUserInfoMobile:number|undefined;
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
}
</script>