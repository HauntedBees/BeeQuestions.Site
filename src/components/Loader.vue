<template>
    <div style="text-align:center">
        <v-progress-circular indeterminate color="primary" size="48" class="mt-2" />
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
@Component
export default class Loader extends Vue { }
</script>