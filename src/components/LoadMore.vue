<template>
    <div v-intersect="EndReached" style="text-align:center">
        <v-progress-circular v-if="!reachedEnd" indeterminate color="primary" size="48" class="mt-2" />
        <div v-if="reachedEnd" class="pt-2 pb-6">
            <v-divider class="pb-4" />
            {{$t("reachedend")}}
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
@Component
export default class LoadMore extends Vue {
    page = 0;
    @Prop() reachedEnd:boolean|undefined;
    EndReached() {
        if(this.reachedEnd) { return; }
        this.$emit("loadmore", ++this.page);
    }
}
</script>