<template>
<v-tabs v-model="tab" fixed-tabs icons-and-text @change="SwitchTab(tab)">
  <v-tab>{{$t("tabpopular")}} <v-icon>mdi-trending-up</v-icon></v-tab>
  <v-tab>{{$t("tabrecent")}} <v-icon>mdi-clock</v-icon></v-tab>
  <v-tab>{{$t("tabneedslove")}} <v-icon>mdi-heart-broken</v-icon></v-tab>
  <v-tab>{{$t("tabclosed")}} <v-icon>mdi-lock</v-icon></v-tab>
</v-tabs>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
@Component
export default class TabList extends Vue {
  tab = 0;
  SwitchTab(tab:number) {
      this.tab = tab;
      this.$emit("switch-tab", tab);
  }
}
</script>