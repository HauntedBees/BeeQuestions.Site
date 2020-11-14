<template>
<v-btn :color="color" :disabled="!valid" class="mr-4" @click="$emit('submit', me)">
    {{$t(loading ? (textkey + "_loading") : textkey)}}
    <v-progress-circular v-if="loading" style="margin-left:10px" size="16" width="2" indeterminate />
</v-btn>
</template>
<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import { Loadable } from 'src/util/Loadable';
@Component
export default class LoadableButton extends Loadable {
    @Prop() valid:boolean|undefined;
    @Prop() color:string|undefined;
    @Prop() textkey:string|undefined;
    get me() { return this; }
}
</script>