<template>
    <v-card v-if="visible" color="info" light class="mb-2">
        <v-badge dot overlap left :value="!notification.seen" color="secondary">
            <div class="text-caption pa-2">
                <v-icon class="pr-1" color="secondary">mdi-{{icon}}</v-icon>
                <span>{{message}}</span>
            </div>
        </v-badge>
        <v-card-actions v-if="!notification.seen" class="text-caption pt-0">
            <v-spacer />
            <v-btn text x-small @click="Dismiss">Dismiss</v-btn>
        </v-card-actions>
    </v-card>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { NotificationModel, RefreshedUserInfoModel } from 'src/models/AuthModel';
import { bee, BeeResponse } from 'src/util/webmethod';
@Component
export default class ListQuestion extends Vue {
    @Prop() readonly notification:NotificationModel | undefined;
    @Prop() readonly homescreen:boolean | undefined;
    visible = true;
    get message() {
        if(!this.notification) { return ""; }
        switch(this.notification.notiftype) {
            case "answerClosed": return (this.$t("notifAnswer") as string).replace("{0}", this.notification.notifsubject);
            case "bestQuestion": return (this.$t("notifQuestion") as string).replace("{0}", this.notification.notifsubject);
            case "levelUp": return this.$t("notifLevelUp");
        }
        return "This is a glitch notification! Cool!";
    }
    get icon() {
        if(!this.notification) { return ""; }
        switch(this.notification.notiftype) {
            case "answerClosed": return "forum";
            case "bestQuestion": return "trophy";
            case "levelUp": return "arrow-up-circle";
        }
        return "bug";
    }
    Dismiss() {
        if(!this.notification) { return; }
        if(this.homescreen) {
            this.visible = false;
            bee.post(null, "NotificationDismissal", { notifID: this.notification.id, refreshList: true }, (data:BeeResponse<RefreshedUserInfoModel>) => {
                this.$store.commit("updateNotifications", data.result);
            });
        } else {
            this.notification.seen = true;
            bee.post(null, "NotificationDismissal", { notifID: this.notification.id, refreshList: false });
        }
    }
}
</script>