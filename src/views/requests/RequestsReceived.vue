<template>
  <section>
    <BaseCard>
      <header>
        <h2>Requests Received</h2>
        <ul v-if="requestsStore.hasRequests()">
					
				</ul>
        <h3 v-else>You haven't received any requests yet!</h3>
      </header>
    </BaseCard>
  </section>
</template>

<script setup>
import { computed } from 'vue';
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
