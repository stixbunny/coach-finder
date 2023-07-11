import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useMainStore } from './main';

export const useCoachesStore = defineStore('coaches', () => {
  const user = useMainStore();
  const coaches = ref([
    {
      id: 'c1',
      firstName: 'Maximilian',
      lastName: 'Schwarzmüller',
      areas: ['frontend', 'backend', 'career'],
      description:
        "I'm Maximilian and I've worked as a freelance web developer for years. Let me help you become a developer as well!",
      hourlyRate: 30,
    },
    {
      id: 'c2',
      firstName: 'Julie',
      lastName: 'Jones',
      areas: ['frontend', 'career'],
      description:
        'I am Julie and as a senior developer in a big tech company, I can help you get your first job or progress in your current role.',
      hourlyRate: 30,
    },
  ]);
  function hasCoaches() {
    return coaches.value && coaches.value.length > 0;
  }
  async function registerCoach(data) {
    const coachData = {
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas,
    };

    const response = await fetch(
      `https://vue-coaches-3b3ce-default-rtdb.firebaseio.com/coaches/${user.userId}.json`,
      {
        method: 'PUT',
        body: JSON.stringify(coachData),
      }
    );
    //const responseData = await response.json();
    if (!response.ok) {
      //error
    }
    coaches.value.push({
      ...coachData,
      id: user.userId,
    });
  }
  return { coaches, hasCoaches, registerCoach };
});
