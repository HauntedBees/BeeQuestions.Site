<template>
<v-container class="px-auto py-0">
    <v-avatar class="mx-auto mb-2" size="48" :color="currentColor">
        <emoji class="pt-1" raw="true" :emoji="currentEmoji"/>
    </v-avatar>
    <v-row>
        <v-col cols="12" sm="3">
            <v-color-picker class="mx-auto" dot-size="25" v-model="currentColor" hide-mode-switch mode="hexa" />
        </v-col>
        <v-col cols="12" sm="9" ref="emojiset">
            <v-btn class="e-size32px" @click="baseEmoji=emoji" v-for="emoji in emojis" :key="emoji.codepoint">{{emoji.twemoji}}</v-btn>
        </v-col>
    </v-row>
    <v-row class="float-right">
        <v-btn color="secondary" class="mr-4" @click="CancelChanges">{{$t("cancel")}}</v-btn>
        <LoadableButton color="accent" textkey="save" :valid="true" @submit="SaveChanges"/>
    </v-row>
</v-container>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { bee } from 'src/util/webmethod';
import { Loadable } from 'src/util/Loadable';
import twemoji from 'twemoji';
class Emoji {
    codepoint:string; twemoji:string;
    constructor(e:string) { this.codepoint = e; this.twemoji = twemoji.convert.fromCodePoint(e); }
}
@Component
export default class TwemojiSelector extends Vue {
    tab = 0;
    @Prop() emoji:string|undefined;
    @Prop() color:string|undefined;
    get currentEmoji() { return this.baseEmoji.twemoji; }
    baseEmoji:Emoji = new Emoji("1F43A");
    currentColor = "#00FF00";
    emojis = [
        new Emoji("1F476"),
        new Emoji("1F648"), new Emoji("1F649"), new Emoji("1F64A"), new Emoji("1F9A7"), new Emoji("1F98D"), new Emoji("1F435"), new Emoji("1F436"), new Emoji("1F9AE"), 
        new Emoji("1F43A"), new Emoji("1F98A"), new Emoji("1F99D"), new Emoji("1F431"), new Emoji("1F981"), new Emoji("1F42F"), new Emoji("1F434"), new Emoji("1F984"), 
        new Emoji("1F98C"), new Emoji("1F42E"), new Emoji("1F437"), new Emoji("1F417"), new Emoji("1F418"), new Emoji("1F98F"), new Emoji("1F42D"), new Emoji("1F439"), 
        new Emoji("1F430"), new Emoji("1F994"), new Emoji("1F987"), new Emoji("1F43B"), new Emoji("1F428"), new Emoji("1F43C"), new Emoji("1F9A5"), new Emoji("1F9A6"), 
        new Emoji("1F414"), new Emoji("1F423"), new Emoji("1F425"), new Emoji("1F986"), new Emoji("1F989"), new Emoji("1F9A4"), new Emoji("1F99C"), new Emoji("1F438"), 
        new Emoji("1F98E"), new Emoji("1F40D"), new Emoji("1F432"), new Emoji("1F996"), new Emoji("1F433"), new Emoji("1F40B"), new Emoji("1F42C"), new Emoji("1F41F"), 
        new Emoji("1F988"), new Emoji("1F419"), new Emoji("1F40C"), new Emoji("1F98B"), new Emoji("1F41B"), new Emoji("1F41D"), new Emoji("1FAB2"), new Emoji("1F99E"),
        new Emoji("1F349"), new Emoji("1F34A"), new Emoji("1F34B"), new Emoji("1F34C"), new Emoji("1F34D"), new Emoji("1F96D"), new Emoji("1FAD0"), new Emoji("1F95D"), 
        new Emoji("1F345"), new Emoji("1F965"), new Emoji("1F951"), new Emoji("1F955"), new Emoji("1F33D"), new Emoji("1FAD1"), new Emoji("1F9C4"), new Emoji("1F9C5"), 
        new Emoji("1F35E"), new Emoji("1F950"), new Emoji("1FAD3"), new Emoji("1F968"), new Emoji("1F95E"), new Emoji("1F9C7"), new Emoji("1F9C0"), new Emoji("1F96A"), 
        new Emoji("1F32E"), new Emoji("1FAD4"), new Emoji("1F959"), new Emoji("1F372"), new Emoji("1F957"), new Emoji("1F37F"), new Emoji("1F371"), new Emoji("1F359"), 
        new Emoji("1F35A"), new Emoji("1F35B"), new Emoji("1F363"), new Emoji("1F95F"), new Emoji("1F960"), new Emoji("1F9C1"), new Emoji("1F967"), new Emoji("1F36F"), 
        new Emoji("1F9CB")
    ];
    CancelChanges() { this.$emit("finish"); }
    SaveChanges(btn:Loadable) {
        bee.post(btn, "UserAvatar", { avatar: this.baseEmoji.codepoint, color: this.currentColor }, () => {
            this.$store.commit("changeavatar", [this.baseEmoji.codepoint, this.currentColor]);
            this.$emit("finish");
        });
    }
    //created() { }
    mounted() {
        this.baseEmoji = new Emoji(this.emoji || "1F9CB");
        this.currentColor = this.color || "#0000FF";
        this.RefreshTwemojis();
    }
    private RefreshTwemojis() {
        twemoji.parse((this.$refs.emojiset as HTMLElement));
    }
}
</script>