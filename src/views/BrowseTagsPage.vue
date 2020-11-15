<template>
<v-container>
    <v-row>
        <v-col cols="12" sm="2" order="2" class="hidden-sm-and-down" />
        <v-col cols="12" sm="8" order="3">
            <v-sheet class="mb-4 pa-2">
                <h2 class="px-3 py-1">Browsing Tags</h2>
            </v-sheet>
            <v-sheet rounded="lg" min-height="70vh">
                <v-tabs v-model="tab" fixed-tabs @change="SwitchTab(tab)">
                    <v-tab v-for="top in tops" :key="top">{{top}}</v-tab>
                </v-tabs>
                <Loader v-if="loading" />
                <ul v-if="!loading">
                    <li v-for="tag in tags" :key="tag.name" class="mb-1">
                        <v-btn rounded color="secondary" style="width:100%" :to="'/tag/' + tag.name">
                            <v-row class="mx-3">
                                <div>
                                    <v-icon left>mdi-label</v-icon> 
                                    {{tag.name}}
                                </div>
                                <v-spacer/>
                                <div>
                                    {{tag.answers}}
                                    <v-icon right>mdi-forum</v-icon>
                                </div>
                            </v-row>
                        </v-btn>
                    </li>
                </ul>
            </v-sheet>
        </v-col>
        <v-col cols="12" sm="2" order="1" order-md="4">
            <UserInfo />
        </v-col>
    </v-row>
</v-container>
</template>
<script lang="ts">
import { Component } from 'vue-property-decorator';
import { TagModel } from 'src/models/AnswerModel';
import { Loadable } from 'src/util/Loadable';
import { bee, BeeResponse } from 'src/util/webmethod';
@Component
export default class BrowseTagsPage extends Loadable {
    tops:string[] = [];
    tags:TagModel[] = [];
    tab = 0;
    created() {
        document.title = `Bee Questions! - Tag List`;
        this.GetTags();
        bee.get(this, "TagPrefixes", [], (data:BeeResponse<string[]>) => {
            this.tops = ["All", ...data.result];
        });
    }
    SwitchTab(tab:number) { this.tab = tab; this.GetTags(); }
    async GetTags() { this.tags = await bee.getStandardValue(this, "TagBrowse", [this.tab === 0 ? "all" : this.tops[this.tab]]); }
}
</script>