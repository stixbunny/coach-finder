<template>
	<section>
		FILTER
	</section>
	<section>
		<BaseCard>
			<div class="controls">
				<BaseButton mode="outline">Refresh</BaseButton>
				<BaseButton link to="/register">Register as Coach</BaseButton>
			</div>
			<ul v-if="coachesStore.hasCoaches()">
				<CoachItem v-for="coach in coachesStore.coaches" :key="coach.id" :="coach"/>
			</ul>
			<h3 v-else>No coaches found.</h3>
		</BaseCard>
	</section>
</template>

<script setup>
import { useCoachesStore } from '../../stores/coaches';
import CoachItem from '../../components/coaches/CoachItem.vue';

const coachesStore = useCoachesStore();
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>