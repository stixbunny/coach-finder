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
			<li v-for="coach in coachesStore.coaches" :key="coach.id">
				{{ coach.firstName }}
			</li>
		</ul>
		<h3 v-else>No coaches found.</h3>
	</section>
</template>

<script setup>
import { useCoachesStore } from '../../stores/coaches';

const coachesStore = useCoachesStore();
</script>

<style scoped>

</style>