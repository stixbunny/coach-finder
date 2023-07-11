// import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useRequestsStore = defineStore('requests', () => {
  const requests = ref([]);

  function addRequest(request) {
    const newRequest = {
      id: new Date().toISOString(),
      coachId: request.coachId,
      userEmail: request.email,
      message: request.message,
    };
    requests.value.push(newRequest);
  }

  function hasRequests() {
    return requests.value && requests.value.length > 0;
  }
  return { requests, addRequest, hasRequests };
});
