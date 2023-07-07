import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useCoachesStore } from './coaches';

export const useMainStore = defineStore('main', () => {
  const coachesStore = useCoachesStore();
	const userId = ref('c3');

	function isCoach() {
		return coachesStore.coaches.some((coach) => coach.id === userId.value)
	}

  return { userId, isCoach };
});