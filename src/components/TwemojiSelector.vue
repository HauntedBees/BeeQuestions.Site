<template>
<v-card><!--
    Preview:
    <v-avatar>
        <v-progress-circular v-if="loading" indeterminate color="primary" size="32" class="mt-2" />
        <emoji v-if="!loading" class="pt-1" raw="true" :emoji="currentEmoji"/>
    </v-avatar>-->
    <!--<v-tabs v-model="tab" fixed-tabs icons-and-text @change="SwitchTab(tab)">
        <v-tab>people</v-tab>
        <v-tab>fuckers</v-tab>
    </v-tabs>-->
    <v-row ref="emojiset">
        <!--<v-btn class="e-size32px" @click="baseEmoji=emoji" v-for="emoji in emojis[tab]" :key="emoji.codepoint">{{emoji.twemoji}}</v-btn>-->
        <v-btn class="e-size32px" @click="baseEmoji=emoji" v-for="emoji in emojis" :key="emoji.codepoint">{{emoji.twemoji}}</v-btn>
    </v-row>
    <!--<v-row v-for="(emojirow, idx) in modifieremojis" :key="idx">
        <v-btn class="e-size32px" @click="ToggleModifier(emoji, idx)" v-for="emoji in emojirow" :key="emoji">{{emoji}}</v-btn>
    </v-row>-->
</v-card>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import twemoji from 'twemoji';

const zwj = twemoji.convert.fromCodePoint("200D");
const genderSuffix = twemoji.convert.fromCodePoint("FE0F");
const male = twemoji.convert.fromCodePoint("2642");
const female = twemoji.convert.fromCodePoint("2640");
class Emoji {
    codepoint:string;
    twemoji:string;
    nogender:boolean;
    allowhair:boolean;
    twemojim?:string;
    twemojif?:string;
    constructor(e:string, nogender = true, male = "", female = "", allowhair = false) {
        this.codepoint = e;
        this.twemoji = twemoji.convert.fromCodePoint(e);
        this.nogender = nogender;
        this.allowhair = allowhair;
        if(male !== "") { this.twemojim = twemoji.convert.fromCodePoint(male); }
        if(female !== "") { this.twemojif = twemoji.convert.fromCodePoint(female); }
    }
    getEmoji(gender:string, skintone:string, hair:string) {
        let emoji = this.twemoji;
        hair = (this.allowhair && hair !== "") ? (zwj + hair) : "";
        if(this.nogender) {
            return emoji + skintone + hair;
        } else {
            if(gender === "m" && this.twemojim) {
                emoji = this.twemojim;
                gender = "";
            } else if(gender === "f" && this.twemojif) {
                emoji = this.twemojif;
                gender = "";
            } else if(gender !== "") {
                gender = zwj + (gender === "m" ? male : female) + genderSuffix;
            }
        }
        return emoji + skintone + gender + hair;
    }
}

@Component
export default class TwemojiSelector extends Vue {
    tab = 0;
    loading = false;
    get currentEmoji() {
        console.log(this.baseEmoji.codepoint);
        return this.baseEmoji.twemoji// this.baseEmoji.getEmoji(this.gender, this.skintone, this.hairtype);
    }
    baseEmoji:Emoji = new Emoji("1F476", true);
    /*gender = "";
    skintone = "";
    hairtype = "";
    ToggleModifier(modifier:string, modifierRow:number) {
        switch(modifierRow) {
            case 0: this.gender = this.gender === modifier ? "" : modifier; break;
            case 1: this.skintone = this.skintone === modifier ? "" : modifier; break;
            case 2: this.hairtype = this.hairtype === modifier ? "" : modifier; break;
        }
    }*/
    emojis = [
        // Row 0 = Things that can be colored
        /*[
            new Emoji("1F476"), // babby
            new Emoji("1F9D2", false, "1F466", "1F467"), // child
            new Emoji("1F9D1", false, "1F468", "1F469", true), // adult
            new Emoji("1F9D3", false, "1F474", "1F475"), // old
            new Emoji("1F64D", false), new Emoji("1F64E", false), new Emoji("1F645", false), new Emoji("1F646", false), new Emoji("1F481", false), 
            new Emoji("1F64B", false), new Emoji("1F9CF", false), new Emoji("1F647", false), new Emoji("1F926", false), new Emoji("1F937", false), // misc genderable
            new Emoji("1F9D4"), // misc ungenderable
            new Emoji("1F44B"), new Emoji("1F596"), new Emoji("1F90C"), new Emoji("1F90F"),
            new Emoji("270C"), new Emoji("1F91E"), new Emoji("1F595"), new Emoji("1F44D"),
            new Emoji("270D"), new Emoji("1F485") // hands
        ],*/
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
    /*modifieremojis = [
        // Gender
        ["m", "f"],
        // Skin Tones
        ["1F3FB", "1F3FC", "1F3FD", "1F3FE", "1F3FF"],
        // Hair Types
        ["1F9B0", "1F9B3", "1F9B1", "1F9B2"]
    ];*/
    /*SwitchTab(tab:number) {
        this.tab = tab;
        setTimeout(() => this.RefreshTwemojis(), 10);
    }*/
    created() {
        /*for(let i = 1; i < this.modifieremojis.length; i++) {
            const emojirow = this.modifieremojis[i];
            for(let j = 0; j < emojirow.length; j++) {
                emojirow[j] = emojirow[j].split(" ").map(e => twemoji.convert.fromCodePoint(e)).join("");
            }
        }*/
    }
    mounted() { this.RefreshTwemojis(); }
    private RefreshTwemojis() {
        twemoji.parse((this.$refs.emojiset as HTMLElement));
    }
}
</script>