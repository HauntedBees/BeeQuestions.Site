<template>
<v-container>
    <v-row>
        <v-col cols="12" sm="2" />
        <v-col cols="12" sm="8">
            <v-sheet class="mb-4 pa-2">
                <div style="text-align:center">
                    <img alt="Bee Questions! Logo" :src="require('../assets/beeaccount.png')" transition="scale-transition" width="128" />
                    <div class="text-left">
                        <p class="px-6">
                            Haunted Bees Productions cares about privacy, which is why we try making account creation as unintrusive as possible. We are currently working on
                            adding support for third-party authenticators to make the process even easier, but until then, all we ask for is an email address and password.
                            Technically it doesn't even need to be a real email address, but it'd probably be nice if you didn't use somebody else's. Check out our
                            <router-link to="/privacypolicy">Privacy Policy</router-link> if you want to know more about <strong>BeeAccount</strong>s, otherwise, fill out
                            the form below and start Beelieving!
                        </p>
                    </div>
                </div>
                <v-form ref="form" v-model="valid" style="width: 50%; min-width: 300px" class="mx-auto py-4">
                    <v-text-field v-model="username" :rules="namerules" label="Email Address" required />
                    <v-text-field 
                        v-model="password"
                        :append-icon="showPassword?'mdi-eye':'mdi-eye-off'"
                        :type="showPassword?'text':'password'"
                        @click:append="showPassword=!showPassword"
                        :rules="passwordrules"
                        label="Password"
                        required />
                    <v-text-field 
                        v-model="confirmpassword"
                        :append-icon="showPassword?'mdi-eye':'mdi-eye-off'"
                        :type="showPassword?'text':'password'"
                        @click:append="showPassword=!showPassword"
                        :rules="[v => v === password || 'Passwords must match.']"
                        label="Confirm Password"
                        required />
                    <v-container>
                        <v-row>
                        <v-spacer />
                        <v-tooltip top :disabled="valid">
                            <template v-slot:activator="{on,attrs}">
                                <span v-on="on" v-bind="attrs">
                                    <LoadableButton color="accent" textkey="signup" :valid="true" @submit="register"/>
                                </span>
                            </template>
                            <span>{{$t("signup_please")}}</span>
                        </v-tooltip>
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
@Component
export default class SignUpPage extends Loadable {
    valid = true;
    username = "";
    showPassword = false;
    namerules = [ (v:string) => !!v || "Please enter your email address." ];
    password = "";
    passwordrules = [ (v:string) => !!v || "Please enter your password." ];
    confirmpassword = "";
    validate() { this.valid = (this.$refs.form as Vue & { validate: () => boolean }).validate(); }
    register(btn:Loadable) {
        this.validate();
        if(!this.valid) { return; }
        bee.post(btn, "Registration", { username: this.username, password: this.password }, (data:string) => {
            this.$store.commit("login", data);
            this.$router.push(this.$store.state.lastpath);
        });
    }
}
</script>