<template>
<v-container>
    <v-row>
        <v-col cols="12" sm="2" class="hidden-sm-and-down" />
        <v-col cols="12" sm="8">
            <v-sheet class="mb-4 pa-2 text-left px-4">
                <h1>Bee Questions v1.92 - What This Is?</h1>
                <p>
                    Lots of websites let you ask questions and get answers. That's pretty helpful. Sometimes it's even funny. But not always. That's where <strong>Bee Questions</strong>
                    comes in. Users post words or phrases that are probably the answer to multiple questions. Then everyone else tries to figure out what those questions are.
                    Lots of questions only have one answer, but very few answers only have one question! The goal, first and foremost, is humor. It's unlikely anything else
                    could come from this format anyway, aside from like a TV game show or something, but I doubt something like that would ever catch on.
                </p>
                <p>
                    To simply browse through <strong>Bee Questions</strong>, you don't need to do anything! Just click around, find the good stuff. All of the newest and hottest stuff is going
                    to be on the front page, but you have full access to look at whatever you want! If you want to contribute, on the other hand, through liking or reporting
                    questions and answers or adding your own, you'll need to create and account and log in! It is, of course, free! And no, this is free as in free, not free as 
                    in "we have ads and trackers everywhere and sell all of your information to insurance companies and politicans." Free free. Like in the good ol' days.
                </p>
                <p>
                    Also this site isn't for children because it says bad words like "damn" and "barf" and also because explicitly clarifying that children should not use this 
                    website will make the lawyers happier and The Man less likely to put his boot down on us. Learn more in the <router-link to="/privacypolicy">Privacy Policy</router-link> 
                    if that's the sort of thing you want to know more about.</p>
                    
                <h2>License and Credits</h2>
                <p>
                    <strong>Bee Questions</strong> was created by <a href="https://www.hauntedbees.com" target="_blank">Haunted Bees Productions</a> and is licensed under 
                    the <ax href="https://www.gnu.org/licenses/agpl-3.0.en.html">GNU AGPL v3 License</ax>, meaning all its source code is freely available on 
                    <ax href="https://github.com/HauntedBees/">GitHub</ax>. Original idea by <ax href="https://twitter.com/SrRandon">Steven Ramsey</ax>.
                </p>
                <p>
                    Additional Code and Asset Credits:
                    <ol style="list-style-type:disc" class="ml-lg-12">
                        <li v-for="a in attributions" :key="a.name"><attr :name="a.name" :nameURL="a.nameURL" :by="a.by" :byURL="a.byURL" :license="a.license" :secondlicense="a.license2" /></li>
                    </ol>
                </p>
            </v-sheet>
        </v-col>
        <v-col cols="12" sm="2" class="hidden-sm-and-down" v-if="$store.state.auth">
            <UserInfo />
        </v-col>
    </v-row>
</v-container>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
@Component
export default class AboutPage extends Vue {
    attributions = [
        { name: "Vue.js", nameURL: "https://vuejs.org/", by: "Evan You", byURL: "https://evanyou.me/", license: "MIT" },
        { name: "Vuetify", nameURL: "https://vuetifyjs.com/en/", license: "MIT" },
        { name: "Vue I18n", nameURL: "https://kazupon.github.io/vue-i18n/", by: "Kazuya Kawaguchi", byURL: "https://github.com/kazupon", license: "MIT" },
        { name: "vuex-persistedstate", nameURL: "https://www.npmjs.com/package/vuex-persistedstate", by: "Robin van der Vleuten", byURL: "https://github.com/robinvdvleuten", license: "MIT" },
        { name: "core-js", nameURL: "https://www.npmjs.com/package/core-js", by: "Denis Pushkarev", byURL: "https://github.com/zloirock", license: "MIT" },
        { name: "Day.js", nameURL: "https://day.js.org/", by: "iamkun", byURL: "https://github.com/iamkun", license: "MIT" },
        { name: "Twemoji", nameURL: "https://twemoji.twitter.com/", by: "Twitter", byURL: "https://github.com/twitter", license: "CC-BY 4.0", license2: "MIT" },
        { name: "Nevis", nameURL: "https://www.fontspace.com/nevis-font-f14902", by: "Ten by Twenty", byURL: "http://tenbytwenty.com/", license: "SIL Open Font" },
        { name: "Roboto", nameURL: "https://fonts.google.com/specimen/Roboto", by: "Christian Robertson", byURL: "http://christianrobertson.com/", license: "Apache 2.0" },
        { name: "Material Design Icons", nameURL: "https://materialdesignicons.com/", by: "Austin Andrews", byURL: "https://github.com/Templarian", license: "Apache 2.0" }
    ];
}
</script>