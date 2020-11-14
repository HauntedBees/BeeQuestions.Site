<template>
    <span :class="'e-size'+size+'px'" ref="emoji"></span>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import twemoji from 'twemoji';
@Component
export default class Twemoji extends Vue {
    $refs!: { emoji:HTMLElement }
    @Prop({default:32}) size:number|undefined;
    @Prop() emoji?:string;
    @Prop() raw?:boolean;
    @Watch("emoji")
    onEmojiChanged(value?:string, oldValue?:string) { if(oldValue !== value) { this.RefreshTwemoji(value); } }
    mounted() { this.RefreshTwemoji(this.emoji); }
    private RefreshTwemoji(emoji?:string) {
        if(emoji === undefined) { return; } // TODO: or delete what's there??
        this.$refs.emoji.innerText = this.raw ? emoji : twemoji.convert.fromCodePoint(emoji);
        twemoji.parse(this.$refs.emoji);
    }
}
</script>