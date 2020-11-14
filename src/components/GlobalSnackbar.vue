<template>
  <v-snackbar v-model="show">
    {{message}}
    <v-btn text color="accent" @click="show = false">Close</v-btn>
  </v-snackbar>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
@Component
export default class GlobalSnackbar extends Vue {
    show = false;
    message = "";
    type = "";
    created() {
        this.$store.watch(state => state.infomessage, () => {
            const msg = this.$store.state.infomessage;
            if(msg !== "") {
                this.show = true;
                this.message = msg;
                this.$store.commit("setMessage", ["success", ""]);
            }
        });
    }
}
</script>