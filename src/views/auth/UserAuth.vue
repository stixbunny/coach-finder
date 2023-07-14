<template>
  <div>
    <BaseDialog :show="!!error" title="An error ocurred" @close="handleError">
      <p>{{ error }}</p>
    </BaseDialog>
    <BaseDialog :show="isLoading" title="Authenticating..." fixed>
      <BaseSpinner></BaseSpinner>
    </BaseDialog>
    <BaseCard>
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="email">E-mail</label>
          <input type="email" id="email" v-model.trim="email" />
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input type="password" id="password" v-model.trim="password" />
        </div>
        <p v-if="!formIsValid">
          Please enter a valid email and password (must be at least 6 characters long)
        </p>
        <BaseButton>{{ submitButtonCaption }}</BaseButton>
        <BaseButton type="button" mode="flat" @click="switchAuthMode">{{
          switchModeButtonCaption
        }}</BaseButton>
      </form>
    </BaseCard>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useMainStore } from '../../stores/main';
import { useRouter } from 'vue-router';

const mainStore = useMainStore();
const router = useRouter();
const redirectUrlName = router.currentRoute.value.query.redirect || 'coaches';
const email = ref('');
const password = ref('');
const formIsValid = ref(true);
const mode = ref('login');
const isLoading = ref(false);
const error = ref(null);

async function submitForm() {
  formIsValid.value = true;
  if (
    email.value === '' ||
    !/^[^@]+@\w+(\.\w+)+\w$/.test(email.value) ||
    password.value.length < 6
  ) {
    formIsValid.value = false;
    return;
  }
  isLoading.value = true;
  const userData = {
    email: email.value,
    password: password.value,
  };
  try {
    if (mode.value === 'login') {
      await mainStore.signIn(userData);
    } else {
      await mainStore.signUp(userData);
    }
    router.replace({ name: redirectUrlName });
  } catch (e) {
    console.log('error!');
    error.value = e.message || 'Failed to authenticate, please try agin later.';
  }
  isLoading.value = false;
}

function switchAuthMode() {
  if (mode.value === 'login') {
    mode.value = 'signup';
  } else {
    mode.value = 'login';
  }
}

function handleError() {
  error.value = null;
}

const submitButtonCaption = computed(() => {
  if (mode.value === 'login') {
    return 'Login';
  } else {
    return 'Signup';
  }
});

const switchModeButtonCaption = computed(() => {
  if (mode.value === 'login') {
    return 'Signup instead';
  } else {
    return 'Login instead';
  }
});
</script>

<style scoped>
form {
  margin: 1rem;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
</style>
