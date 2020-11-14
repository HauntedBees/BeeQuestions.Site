<template>
<v-tooltip top :disabled="loading">
    <template v-slot:activator="{on,attrs}">
        <span v-on="on" v-bind="attrs">
            <v-btn :disabled="disabled" :color="color" :class="cssclass" icon @click="$emit('submit', me)">
                <v-icon v-if="!loading">mdi-{{icon}}</v-icon>
                <v-progress-circular v-if="loading" size="12" width="2" indeterminate />
            </v-btn>
        </span>
    </template>
    <span>{{$t(textkey)}}</span>
</v-tooltip>
</template>
<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import { Loadable } from 'src/util/Loadable';
@Component
export default class LoadableTooltipIconButton extends Loadable {
    @Prop() cssclass:string|undefined;
    @Prop() disabled:boolean|undefined;
    @Prop() icon:string|undefined;
    @Prop() color:string|undefined;
    @Prop() textkey:string|undefined;
    get me() { return this; }
}
</script>