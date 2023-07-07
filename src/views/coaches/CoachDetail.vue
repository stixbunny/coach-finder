<template>
  <section>
    <BaseCard>
      <h2>{{ fullName }}</h2>
      <h3>${{ hourlyRate }}/hour</h3>
    </BaseCard>
  </section>
  <section>
    <BaseCard>
      <header>
        <h2>Interested? Reach out now!</h2>
        <BaseButton link :to="contactLink">Contact</BaseButton>
      </header>
      <RouterView></RouterView>
    </BaseCard>
  </section>
  <section>
    <BaseCard>
      <BaseBadge v-for="area in areas" :key="area" :type="area" :title="area"></BaseBadge>
      <p>{{ description }}</p>
    </BaseCard>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useCoachesStore } from '../../stores/coaches';
import { useRouter } from 'vue-router';

const router = useRouter();
const coachesStore = useCoachesStore();
const props = defineProps(['id']);
const selectedCoach = ref(null);

selectedCoach.value = coachesStore.coaches.find((coach) => coach.id === props.id);

const fullName = computed(() => {
  return `${selectedCoach.value.firstName} ${selectedCoach.value.LastName}`;
});

const areas = computed(() => {
	return selectedCoach.value.areas;
})

const hourlyRate = computed(() => {
	return selectedCoach.value.hourlyRate;
})

const description = computed(() => {
	return selectedCoach.value.description;
})

const contactLink = computed(() => {
	return router.resolve({name: 'contact', params: { id: props.id }}).path;
})
</script>
