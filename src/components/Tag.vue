<template>
<v-chip class="mr-1" color="secondary" :x-small="small" :to="'/tag/' + tag">
    <v-icon :small="small" left>mdi-label</v-icon> 
    {{tag}}
</v-chip>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
@Component
export default class Tag extends Vue {
    @Prop() tag?:string;
    @Prop() small?:boolean;
}
</script>