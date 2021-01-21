<template>
    <v-tooltip top :disabled="!displayname">
        <template v-slot:activator="{ on, attrs }">
            <v-avatar :class="css" @click="$router.push(route)" size="48" :color="color" v-bind="attrs" v-on="on">
                <emoji class="pt-1" :emoji="emoji"/>
            </v-avatar>
        </template>
        <span>{{displayname}}</span>
    </v-tooltip>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
@Component
export default class UserAvatar extends Vue {
    @Prop() readonly css:string | undefined;
    @Prop() readonly emoji:string | undefined;
    @Prop() readonly color:string | undefined;
    @Prop() readonly displayname:string | undefined;
    @Prop() readonly settings:boolean | undefined;
    get route() { return this.settings ? "/settings" : "/user/" + this.displayname; }
}
</script>