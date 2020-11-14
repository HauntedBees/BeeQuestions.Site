<template>
<v-container>
    <v-row>
        <v-col cols="12" sm="2" />
        <v-col cols="12" sm="8">
            <v-sheet class="mb-4 pa-2">
                <div style="text-align:center">
                    <img alt="Bee Questions! Logo" :src="require('../assets/logo.png')" transition="scale-transition" width="128" />
                    <div><i18n path="loginpage"><strong>BeeAccount</strong></i18n></div>
                </div>
                <v-form ref="form" v-model="valid" style="width: 50%; min-width: 300px" class="mx-auto py-4">
                    <v-text-field v-model="username" :rules="namerules" :label="$t('lblemail')" required />
                    <v-text-field 
                        v-model="password"
                        :append-icon="showPassword?'mdi-eye':'mdi-eye-off'"
                        :type="showPassword?'text':'password'"
                        @click:append="showPassword=!showPassword"
                        :rules="passwordrules"
                        :label="$t('lblpassword')"
                        required />
                    <v-container>
                        <v-row class="mb-2">
                            <v-btn color="secondary" class="mr-4" to="/signup">{{$t("signup")}}</v-btn>
                            <v-spacer />
                            <v-tooltip top :disabled="valid">
                                <template v-slot:activator="{on,attrs}">
                                    <span v-on="on" v-bind="attrs">
                                        <LoadableButton color="accent" textkey="login" :valid="valid" @submit="login"/>
                                    </span>
                                </template>
                                <span>{{$t("login_please")}}</span>
                            </v-tooltip>
                        </v-row>
                        <v-row>
                            <v-spacer />
                            <v-btn color="secondary" class="mr-4" @click="SignInWithTwitter">
                                <v-icon>mdi-twitter</v-icon>
                                <v-divider class="mx-2" vertical />
                                Sign in with Twitter
                            </v-btn>
                        </v-row>
                    </v-container>
                </v-form>
            </v-sheet>
        </v-col>
        <v-col cols="12" sm="2" />
    </v-row>
</v-container>
</template>
<script lang="ts">
import { Component } from 'vue-property-decorator';
import { Loadable } from 'src/util/Loadable';
import { bee } from 'src/util/webmethod';
import { LoginResponseModel } from 'src/models/AuthModel';
@Component
export default class LoginPage extends Loadable {
    valid = true;
    username = "";
    showPassword = false;
    namerules = [ (v:string) => !!v || this.$t("plzemail") ];
    password = "";
    passwordrules = [ (v:string) => !!v || this.$t("plzpassword") ];
    validate() { this.valid = (this.$refs.form as Vue & { validate: () => boolean }).validate(); }
    login(btn:Loadable) {
        this.validate();
        if(!this.valid) { return; }
        bee.post(btn, "BeeLogin", { username: this.username, password: this.password }, (data:LoginResponseModel) => {
            this.$store.commit("login", data);
            this.$router.push(this.$store.state.lastpath);
        });
    }
    SignInWithTwitter() { window.location.href = process.env.VUE_APP_API_PATH + "Oauth/[\"twitter\"]"; }
}
</script>