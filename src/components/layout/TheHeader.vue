<script setup>
import { RouterLink, useRouter } from 'vue-router';
import { useMainStore } from '../../stores/main';
import { computed } from 'vue';

const mainStore = useMainStore();
const router = useRouter();
const indexLink = router.resolve({ name: 'index' }).path;
const coachesLink = router.resolve({ name: 'coaches' }).path;
const requestsLink = router.resolve({ name: 'requests' }).path;
const authLink = router.resolve({ name: 'auth' }).path;

const isLoggedIn = computed(() => mainStore.isAuthenticated());

function logout() {
  mainStore.signOut();
  router.replace({ name: 'coaches' });
}
</script>

<template>
  <header>
    <nav>
      <h1>
        <RouterLink :to="indexLink">Find a Coach</RouterLink>
      </h1>
      <ul>
        <li>
          <RouterLink :to="coachesLink">All Coaches</RouterLink>
        </li>
        <li v-if="isLoggedIn">
          <RouterLink :to="requestsLink">Requests</RouterLink>
        </li>
        <li v-else>
          <RouterLink :to="authLink">Login</RouterLink>
        </li>
        <li v-if="isLoggedIn">
          <BaseButton @click="logout">Logout</BaseButton>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
header {
  width: 100%;
  height: 5rem;
  background-color: #3d008d;
  display: flex;
  justify-content: center;
  align-items: center;
}

header a {
  text-decoration: none;
  color: #f391e3;
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: 1px solid transparent;
}

a:active,
a:hover,
a.router-link-active {
  border: 1px solid #f391e3;
}

h1 {
  margin: 0;
}

h1 a {
  color: white;
  margin: 0;
}

h1 a:hover,
h1 a:active,
h1 a.router-link-active {
  border-color: transparent;
}

header nav {
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

li {
  margin: 0 0.5rem;
}
</style>
