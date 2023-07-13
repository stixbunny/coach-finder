// import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { useMainStore } from './main';
import { ref } from 'vue';

export const useRequestsStore = defineStore('requests', () => {
  const firebaseUrl = import.meta.env.VITE_API_FIREBASE;

  const user = useMainStore();

  const requests = ref([]);

  async function addRequest(request) {
    const newRequest = {
      userEmail: request.email,
      message: request.message,
    };
    const response = await fetch(`${firebaseUrl}/requests/${request.coachId}.json`, {
      method: 'POST',
      body: JSON.stringify(newRequest),
    });
    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to send request.');
      throw error;
    }
    newRequest.id = responseData.name;
    newRequest.coachId = request.coachId;
    requests.value.push(newRequest);
  }

  async function fetchRequests() {
    const token = user.token;
    const coachId = user.userId;
    const response = await fetch(`${firebaseUrl}/requests/${coachId}.json?auth=${token}`);
    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch requests.');
      throw error;
    }
    const requests = [];
    for (const key in responseData) {
      const request = {
        id: key,
        coachId: coachId,
        userEmail: responseData[key].userEmail,
        message: responseData[key].message,
      };
      requests.push(request);
    }
    setRequests(requests);
  }

  function setRequests(fetchedRequests) {
    requests.value = fetchedRequests;
  }

  function hasRequests() {
    return requests.value && requests.value.length > 0;
  }

  return { requests, addRequest, hasRequests, fetchRequests };
});
