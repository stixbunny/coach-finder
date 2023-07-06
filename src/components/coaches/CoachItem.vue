<template>
	<li>
		<h3>{{ fullName }}</h3>
		<h4>${{ props.hourlyRate }}/hour</h4>
		<div>
			<span v-for="area in props.areas" :key="area">{{ area }}</span>
		</div>
		<div class="actions">
			<RouterLink :to="coachContactLink">Contact</RouterLink>
			<RouterLink :to="coachDetailsLink">View Details</RouterLink>
		</div>
	</li>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
	id: String,
	firstName: String,
	lastName: String,
	hourlyRate: Number,
	areas: Array,
});

const fullName = computed(() => {
	return `${props.firstName} ${props.lastName}`;
});

const coachContactLink = computed(() => {
	return router.resolve({name: 'contact', params: { id: props.id }}).path;
});

const coachDetailsLink = computed(() => {
	return router.resolve({name: 'coach-detail', params: { id: props.id }}).path
});
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>