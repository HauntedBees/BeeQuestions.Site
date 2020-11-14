<template>
    <v-app-bar app color="primary" dark flat>
        <div class="hidden-sm-and-down">
            <div class="d-flex align-center">
                <v-btn depressed text to="/">
                    <v-img alt="Bee Questions! Logo" class="shrink mr-2" contain :src="require('../assets/logo.png')" transition="scale-transition" width="40" />
                    <h1>Bee Questions</h1>
                </v-btn>
            </div>
        </div>
        <v-spacer/>
        <v-btn v-if="!$store.state.auth" @click="login" text>
            <span class="mr-2">{{$t("login")}}</span>
            <v-icon>mdi-login</v-icon>
        </v-btn>
        <div v-if="$store.state.auth">
            <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn text v-bind="attrs" v-on="on">
                        {{$store.state.userInfo.displayname}}
                        <v-icon class="ml-3" small>mdi-cog</v-icon>
                    </v-btn>
                </template>
                <v-list class="text-center">
                    <v-list-item to="/settings">
                        <v-list-item-title>{{$t("settings")}}</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="$store.commit('logout')">
                        <v-list-item-title>{{$t("logout")}}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </div>
    </v-app-bar>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
@Component
export default class TopMenu extends Vue {
    login() {
        this.$store.commit("rememberlocation", this.$route.path);
        this.$router.push("/login");
    }
}
</script>