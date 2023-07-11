<template>
  <BaseDialog :show="!!error" title="An error ocurred!" @close="handleError">
    <p>{{ error }}</p>
  </BaseDialog>
  <section>
    <BaseCard>
      <header>
        <h2>Requests Received</h2>
      </header>
      <BaseSpinner v-if="isLoading"></BaseSpinner>
      <ul v-else-if="requestsStore.hasRequests() && !isLoading">
        <RequestItem
          v-for="req in requestsStore.requests"
          :key="req.id"
          :email="req.userEmail"
          :message="req.message"
        ></RequestItem>
      </ul>
      <h3 v-else>You haven't received any requests yet!</h3>
    </BaseCard>
  </section>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import RequestItem from '../../components/requests/RequestItem.vue';
import { useRequestsStore } from '../../stores/requests';

const requestsStore = useRequestsStore();
const isLoading = ref(false);
const error = ref(null);

async function loadRequests() {
  isLoading.value = true;
  try {
    await requestsStore.fetchRequests();
  } catch (e) {
    error.value = e.message || 'Something failed!';
  } 
  isLoading.value = false;
}

function handleError() {
  error.value = null;
}

onBeforeMount(() => {
  loadRequests();
});
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
