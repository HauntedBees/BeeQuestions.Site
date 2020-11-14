<template>
<div class="twemoji-block"><slot></slot></div>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import twemoji from 'twemoji';
@Component
export default class TwemojiVueBlock extends Vue {
    @Prop({default:32}) size:number|undefined;
    mounted() {
        console.log("CHUNKUS");
        console.log(this.$slots);
        console.log(this.$el.getElementsByClassName("twemoji-block"));
        const els = this.$el.getElementsByClassName("twemoji-block");
        for(let i = 0; i < els.length; i++) {
            console.log(els[i]);
            twemoji.parse((els[i] as HTMLElement));
        }
    }
}
</script>
<style lang="scss">
$sizes: 16px, 32px, 48px, 64px, 76px;
@each $size in $sizes {
    .size#{$size} > img { width: $size; height: $size }
}
</style>