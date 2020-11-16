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
            case "Apache 2.0": return "https://www.apache.org/licenses/LICENSE-2.0";
            case "CC-BY 4.0": return "https://creativecommons.org/licenses/by/4.0/";
            case "MIT": return "https://opensource.org/licenses/MIT";
            case "SIL Open Font": return "https://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL";
            default: return l;
        }
    }
}
</script>