<template>
  <div>
    <BaseDialog :show="!!error" title="An error ocurred!" @close="handleError">
      <p>{{ error }}</p>
    </BaseDialog>
    <section>
      <CoachFilter @change-filter="setFilters" />
    </section>
    <section>
      <BaseCard>
        <div class="controls">
          <BaseButton mode="outline" @click="loadCoaches(true)">Refresh</BaseButton>
          <BaseButton link :to="authLink" v-if="!isLoggedIn">Login</BaseButton>
          <BaseButton v-if="isLoggedIn && !isCoach && !isLoading" link :to="registerLink">
            Register as Coach
          </BaseButton>
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
  </div>
</template>

<script setup>
import { useCoachesStore } from '../../stores/coaches';
import CoachItem from '../../components/coaches/CoachItem.vue';
import CoachFilter from '../../components/coaches/CoachFilter.vue';
import { computed, ref } from 'vue';
import { useMainStore } from '../../stores/main';
import { onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';

const coachesStore = useCoachesStore();
const mainStore = useMainStore();
const router = useRouter();

const error = ref(null);
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

const authLink = computed(() => {
  return router.resolve({ name: 'auth' }).path;
});

const registerLink = computed(() => {
  return router.resolve({ name: 'register' }).path;
});

const isCoach = computed(() => {
  return mainStore.isCoach();
});

const isLoggedIn = computed(() => {
  return mainStore.isAuthenticated();
});

const hasCoaches = computed(() => {
  return !isLoading.value && coachesStore.hasCoaches();
});

function setFilters(updatedFilters) {
  activeFilters.value = updatedFilters;
};

async function loadCoaches(refresh = false) {
  isLoading.value = true;
  try {
    await coachesStore.loadCoaches(refresh);
  } catch (e) {
    error.value = e.message || 'Something went wrong!';
  }
  isLoading.value = false;
};

function handleError() {
  error.value = null;
};

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
