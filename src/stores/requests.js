// import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { useMainStore } from './main';
import { ref } from 'vue';

export const useRequestsStore = defineStore('requests', () => {
  const user = useMainStore();
  
  const requests = ref([]);

  function myRequests() {
    const userId = user.userId;
    return requests.value.filter((req) => req.coachId === userId);
  }

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
    const reqs = myRequests();
    return reqs && reqs.length > 0;
  }

  return { myRequests, addRequest, hasRequests };
});
