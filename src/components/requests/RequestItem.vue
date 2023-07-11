<template>
  <li>
    <div>
      <a :href="emailLink">{{ props.email }}</a>
    </div>
    <p>{{ props.message }}</p>
  </li>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps(['email', 'message']);

const emailLink = computed(() => 'mailto:' + props.email);
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #ccc;
  padding: 1rem;
}

a {
  color: #3d008d;
  text-decoration: none;
  font-weight: bold;
}

a:hover,
a:active {
  color: #8d007a;
}

p {
  margin: 0.5rem 0 0 0;
}
</style>
