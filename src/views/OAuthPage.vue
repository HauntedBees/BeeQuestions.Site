<template>
<v-container>
    <v-row>
        <v-col cols="12" sm="2" class="hidden-sm-and-down" />
        <v-col cols="12" sm="8">
            <v-sheet class="mb-4 pa-2 text-left px-4 text-center">
                <div class="mt-4 mb-6">{{$t("oauthredirect")}}</div>
                <v-progress-circular class="mb-10" size="64" width="5" indeterminate color="primary" />
            </v-sheet>
        </v-col>
    </v-row>
</v-container>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { bee } from 'src/util/webmethod';
@Component
export default class OAuthPage extends Vue {
    created() {
        const params = this.$route.query;
        if(params.denied) {
            this.$store.commit("setMessage", ["error", this.$t("oauthdenied")]);
            this.$router.push(this.$store.state.lastpath);
            return;
        }
        bee.post(null, "OAuthCallback", { from: params.from, token: params.oauth_token, verifier: params.oauth_verifier }, (data:string) => {
            this.$store.commit("login", data);
            this.$router.push(this.$store.state.lastpath);
        });
    }
}
</script>