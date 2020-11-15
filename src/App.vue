<template>
	<v-app>
		<GlobalSnackbar />
		<TopMenu />
		<v-alert type="success" v-if="$store.state.isNew" class="mt-16 mb-0" dismissible @input="dismissWelcome">{{$t("welcomemessage")}}</v-alert>
		<v-main><router-view :key="$route.fullPath" /></v-main>
		<v-footer>
			<div>
				&copy; {{$dayjs().format("YYYY")}}
				<a href="https://www.hauntedbees.com" target="_blank">Haunted Bees Productions</a>
				•
				<router-link to="/about">About</router-link>
				•
				<router-link to="/rules">Rules</router-link>
			</div>
		</v-footer>
	</v-app>
</template>
<script lang="ts">
import Vue from 'vue';
import './scss/style.scss';
export default Vue.extend({
	methods: {
		dismissWelcome: function() {
			this.$store.commit("sawWelcome", true);
		}
	}
});
</script>