import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Retrieves a valid access token.
 * If the access token is expired, attempts to refresh it.
 * Redirects to logout if no valid tokens are available.
 */
export const getAccessToken = async (router) => {
  let token = await AsyncStorage.getItem('accessToken');
  if (!token) {
    const refresh = await AsyncStorage.getItem('refreshToken');
    if (!refresh) {
      router.replace('/profile/logout');
      return null;
    }

    try {
      const response = await fetch('https://rewardshub.online/api/token/refresh/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh }),
      });

      const data = await response.json();
      if (response.ok && data.access) {
        await AsyncStorage.setItem('accessToken', data.access);
        token = data.access;
      } else {
        router.replace('/profile/logout');
        return null;
      }
    } catch (err) {
      console.error('Error refreshing token:', err);
      router.replace('/profile/logout');
      return null;
    }
  }

  return token;
};
