import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useCoachesStore } from './coaches';

export const useMainStore = defineStore('main', () => {
  const coachesStore = useCoachesStore();
  const userId = ref(null);
  const apiKey = import.meta.env.VITE_API_WEB;
  const token = ref(null);
  const tokenExpiration = ref(null);

  function trySignIn() {
    const _token = localStorage.getItem('token');
    const _userId = localStorage.getItem('userId');

    if (_token && _userId) {
      token.value = _token;
      userId.value = _userId;
      tokenExpiration.value = null;
    }
  }

  function isAuthenticated() {
    return !!token.value;
  }

  function isCoach() {
    return coachesStore.coaches.some((coach) => coach.id === userId.value);
  }

  function setUser(user) {
    userId.value = user.userId;
    token.value = user.token;
    tokenExpiration.value = user.tokenExpiration;
  }

  async function signUp(newUser) {
    return auth({ ...newUser, mode: 'signup' });
  }

  async function signIn(user) {
    return auth({ ...user, mode: 'signin' });
  }

  async function auth(user) {
    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;
    if (user.mode === 'signup') {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;
    }

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: user.email,
        password: user.password,
        returnSecureToken: true,
      }),
    });
    const responseData = await response.json();
    if (!response.ok) {
      console.log(responseData);
      const error = new Error(
        responseData.message || 'Failed to authenticate. Check your login data.'
      );
      throw error;
    }
    localStorage.setItem('token', responseData.idToken);
    localStorage.setItem('userId', responseData.localId);
    setUser({
      token: responseData.idToken,
      userId: responseData.localId,
      tokenExpiration: responseData.expiresIn,
    });
  }

  function signOut() {
    token.value = null;
    userId.value = null;
    tokenExpiration.value = null;
  }

  return { userId, token, trySignIn, isAuthenticated, isCoach, signIn, signUp, signOut };
});
