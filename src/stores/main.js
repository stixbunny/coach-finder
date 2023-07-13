import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useCoachesStore } from './coaches';

export const useMainStore = defineStore('main', () => {
  const coachesStore = useCoachesStore();
  const userId = ref(null);
  const apiKey = import.meta.env.VITE_API_WEB;
  const token = ref(null);
  const tokenExpiration = ref(null);

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
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,
      {
        method: 'POST',
        body: JSON.stringify({
          email: newUser.email,
          password: newUser.password,
          returnSecureToken: true,
        }),
      }
    );
    const responseData = await response.json();
    if (!response.ok) {
      console.log(responseData);
      const error = new Error(
        responseData.message || 'Failed to authenticate. Check your login data.'
      );
      throw error;
    }
    console.log(responseData);
    setUser({
      token: responseData.idToken,
      userId: responseData.localId,
      tokenExpiration: responseData.expiresIn,
    });
  }

  async function signIn(user) {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
      {
        method: 'POST',
        body: JSON.stringify({
          email: user.email,
          password: user.password,
          returnSecureToken: true,
        }),
      }
    );
    const responseData = await response.json();
    if (!response.ok) {
      console.log(responseData);
      const error = new Error(
        responseData.message || 'Failed to authenticate. Check your login data.'
      );
      throw error;
    }
    console.log(responseData);
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

  return { userId, token, isAuthenticated, isCoach, signIn, signUp, signOut };
});
