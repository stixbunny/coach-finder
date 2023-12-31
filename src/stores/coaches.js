import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useMainStore } from './main';

export const useCoachesStore = defineStore('coaches', () => {
  const firebaseUrl = "https://vue-coaches-3b3ce-default-rtdb.firebaseio.com";
  const user = useMainStore();
  const lastFetch = ref(null);
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
    const token = user.token;
    const response = await fetch(`${firebaseUrl}/coaches/${user.userId}.json?auth=${token}`, {
      method: 'PUT',
      body: JSON.stringify(coachData),
    });
    //const responseData = await response.json();
    if (!response.ok) {
      //error
    }
    coaches.value.push({
      ...coachData,
      id: user.userId,
    });
  }

  function setCoaches(fetchedCoaches) {
    coaches.value = fetchedCoaches;
  }

  async function loadCoaches(forceRefresh) {
    if (!forceRefresh && !shouldUpdate()) return;

    const response = await fetch(`${firebaseUrl}/coaches.json`);
    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch!');
      throw error;
    }
    const coaches = [];
    for (const key in responseData) {
      const coach = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        description: responseData[key].description,
        hourlyRate: responseData[key].hourlyRate,
        areas: responseData[key].areas,
      };
      coaches.push(coach);
    }
    setCoaches(coaches);
    setFetchTimestamp();
  }

  function setFetchTimestamp() {
    lastFetch.value = new Date().getTime();
  }

  function shouldUpdate() {
    const lastFetched = lastFetch.value;
    if (!lastFetched) {
      return true;
    }
    const currentTimeStamp = new Date().getTime();
    return (currentTimeStamp - lastFetched) / 1000 > 60;
  }

  return { coaches, hasCoaches, registerCoach, loadCoaches };
});
