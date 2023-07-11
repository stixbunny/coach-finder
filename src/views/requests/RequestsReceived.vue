<template>
  <section>
    <BaseCard>
      <header>
        <h2>Requests Received</h2>
        <ul v-if="requestsStore.hasRequests()">
          <RequestItem
            v-for="req in requestsStore.myRequests()"
            :key="req.id"
            :email="req.userEmail"
            :message="req.message"
          ></RequestItem>
        </ul>
        <h3 v-else>You haven't received any requests yet!</h3>
      </header>
    </BaseCard>
  </section>
</template>

<script setup>
import RequestItem from '../../components/requests/RequestItem.vue';
import { useRequestsStore } from '../../stores/requests';

const requestsStore = useRequestsStore();
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
