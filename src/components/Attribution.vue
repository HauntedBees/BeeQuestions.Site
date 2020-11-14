<template>
<span>"<ax :href="nameURL">{{name}}</ax>" <span v-if="by">by <ax :href="byURL">{{by}}</ax></span> is licensed under <ax :href="licenseURL">{{licenseName}}</ax>.</span>
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
    get licenseName() {
        switch(this.license) {
            case "MIT": return "the MIT License";
            default: return this.license;
        }
    }
    get licenseURL() {
        switch(this.license) {
            case "MIT": return "https://opensource.org/licenses/MIT";
            default: return this.license;
        }
    }
}
</script>