<template>
	<section>
		FILTER
	</section>
	<section>
		<div class="controls">
			<button>Refresh</button>
			<RouterLink to="/register">Register as Coach</RouterLink>
		</div>
		<ul v-if="coachesStore.hasCoaches()">
			<CoachItem />
		</ul>
		<h3 v-else>No coaches found.</h3>
	</section>
</template>

<script setup>
import { useCoachesStore } from '../../stores/coaches';
import CoachItem from '../../components/coaches/CoachItem.vue';

const coachesStore = useCoachesStore();
</script>

<style scoped>

</style>