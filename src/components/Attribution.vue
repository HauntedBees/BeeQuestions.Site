<template>
<span>
    "<ax :href="nameURL">{{name}}</ax>"
    <span v-if="by">by <ax :href="byURL">{{by}}</ax></span>
     is licensed under <ax :href="licenseURL(license)">{{licenseName(license)}}</ax>
    <span v-if="secondlicense"> and <ax :href="licenseURL(secondlicense)">{{licenseName(secondlicense)}}</ax></span>
    .</span>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
@Component
export default class ExternalLink extends Vue {
    @Prop() name?:string;
    @Prop() nameURL?:string;
    @Prop() by?:string;
    @Prop() byURL?:string;
    @Prop() license?:string;
    @Prop() secondlicense?:string;
    licenseName(l:string) {
        return "the " + l + " License";
    }
    licenseURL(l:string) {
        switch(l) {
            case "MIT": return "https://opensource.org/licenses/MIT";
            case "CC-BY 4.0": return "https://creativecommons.org/licenses/by/4.0/";
            default: return l;
        }
    }
}
</script>