<template>
  <section>
    <CoachFilter @change-filter="setFilters" />
  </section>
  <section>
    <BaseCard>
      <div class="controls">
        <BaseButton mode="outline" @click="loadCoaches">Refresh</BaseButton>
        <BaseButton v-if="!isCoach && !isLoading" link to="/register">Register as Coach</BaseButton>
      </div>
      <div v-if="isLoading">
        <BaseSpinner></BaseSpinner>
      </div>
      <ul v-else-if="hasCoaches">
        <CoachItem v-for="coach in filteredCoaches" :key="coach.id" :="coach" />
      </ul>
      <h3 v-else>No coaches found.</h3>
    </BaseCard>
  </section>
</template>

<script setup>
import { useCoachesStore } from '../../stores/coaches';
import CoachItem from '../../components/coaches/CoachItem.vue';
import CoachFilter from '../../components/coaches/CoachFilter.vue';
import { computed, ref } from 'vue';
import { useMainStore } from '../../stores/main';
import { onBeforeMount } from 'vue';

const coachesStore = useCoachesStore();
const mainStore = useMainStore();

const isLoading = ref(false);
const activeFilters = ref({
  frontend: true,
  backend: true,
  career: true,
});

const filteredCoaches = computed(() => {
  return coachesStore.coaches.filter((coach) => {
    if (activeFilters.value.frontend && coach.areas.includes('frontend')) {
      return true;
    }
    if (activeFilters.value.backend && coach.areas.includes('backend')) {
      return true;
    }
    if (activeFilters.value.career && coach.areas.includes('career')) {
      return true;
    }
    return false;
  });
});

const isCoach = computed(() => {
  return mainStore.isCoach();
});

const hasCoaches = computed(() => {
  return !isLoading.value && coachesStore.hasCoaches();
})

function setFilters(updatedFilters) {
  activeFilters.value = updatedFilters;
}

async function loadCoaches() {
  isLoading.value = true;
  await coachesStore.loadCoaches();
  isLoading.value = false;
}

onBeforeMount(() => {
  loadCoaches();
});
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
