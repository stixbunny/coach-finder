<script setup>
import { RouterView, useRouter } from 'vue-router';
import TheHeader from './components/layout/TheHeader.vue';
import { onBeforeMount, watch } from 'vue';
import { useMainStore } from './stores/main';
import { storeToRefs } from 'pinia';
const user = useMainStore();
const router = useRouter();
const { didAutoSignOut } = storeToRefs(user);
onBeforeMount(() => {
  user.trySignIn();
});
watch(didAutoSignOut, (currentValue, oldValue) => {
  if (currentValue && currentValue !== oldValue) {
    router.replace({ name: 'coaches' });
  }
});
</script>

<template>
  <TheHeader />
  <RouterView v-slot="slotProps">
    <Transition name="route" mode="out-in">
      <Component :is="slotProps.Component"></Component>
    </Transition>
  </RouterView>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

* {
  box-sizing: border-box;
}

html {
  font-family: 'Roboto', sans-serif;
}

body {
  margin: 0;
}
.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}
.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.route-enter-active {
  transition: all 0.3s ease-out;
}
.route-leave-active {
  transition: all 0.3s ease-in;
}
.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
