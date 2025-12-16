// libraries
import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';

// composables
import {
  useApiLogin,
  type LoginPayload,
  type LoginResponse,
} from 'src/composables/api/useApiLogin';
import { useJwt } from '../composables/useJwt';

// stores
import { useUserStore } from './user';
import { useEventStore } from './event';

// config
import { routesConf } from '../router/routes_conf';

// utils
import { computed, ref } from 'vue';

export const useLoginStore = defineStore(
  'login',
  () => {
    const {
      loginApi,
      refreshTokenApi,
      isUserVerifiedApi,
      resetPasswordApi,
      resetPasswordConfirmApi,
    } = useApiLogin();
    const router = useRouter();
    const { readJwtExpiration } = useJwt();
    const userStore = useUserStore();
    const eventStore = useEventStore();
    const accessToken = ref('');
    const refreshToken = ref(''); // persisted
    const jwtExpiration = ref<number | null>(null); // persisted, unit: seconds, https://www.rfc-editor.org/rfc/rfc7519#section-2
    // const refreshTokenTimeout = ref<NodeJS.Timeout | null>(null) // unit: seconds
    const isUserVerified = ref(false);
    const userEmail = ref('');

    const isUserLoggedIn = computed(() => (accessToken.value ? true : false));

    function setAccessToken(token: string): void {
      accessToken.value = token;
    }

    function setRefreshToken(token: string): void {
      refreshToken.value = token;
    }

    function setJwtExpiration(expiration: number | null): void {
      jwtExpiration.value = expiration;
    }

    // function setRefreshTokenTimeout(timeout: NodeJS.Timeout | null): void {
    //   refreshTokenTimeout.value = timeout;
    // }

    function clearRefreshTokenTimeout(): void {
      // if (refreshTokenTimeout.value) {
      //   clearTimeout(refreshTokenTimeout.value);
      //   refreshTokenTimeout.value = null;
      // }
    }

    /**
     * Get access token, if token does not exists
     * refresh it
     * @returns Promise<string> - Access token
     */
    // async function getAccessTokenWithRefresh(): Promise<string> {
    //   if (!accessToken.value) {
    //     console.log(
    //       `Access token does not exists <${accessToken.value}>,` +
    //       ' get (refresh) it again.',
    //     );
    //     await refreshTokens();
    //     console.log(`New access token <${accessToken.value}>.`);
    //   }
    //   return accessToken.value;
    // }

    /**
     * Login user
     * Checks if email and password are set.
     * If not, shows a notification.
     * If yes, sends the login request to the API.
     * If successful, sets the token.
     * @param {LoginPayload} payload - Login input data (username, password)
     * @returns {Promise<LoginResponse | null>} - Response
     */
    async function login(payload: LoginPayload): Promise<LoginResponse | null> {
      // check that email is set
      if (!payload.email) {
        return null;
      }
      // check that password is set
      if (!payload.password) {
        return null;
      }
      // login
      const data = await loginApi(payload);

      await processLoginData(data);

      if (data) {
        userEmail.value = payload.username;

        await checkUserVerification();
        // check if user is verified
        if (isUserVerified.value) {
          // load user details after successful login
          await userStore.loadUserDetails();
          await router.push(routesConf['home']['path']);
        } else {
          await router.push(routesConf['verify_email']['path']);
        }
      }

      return data;
    }
    /**
     * Process data received from login request
     * Save user and tokens to login store, then redirect to home page.
     */
    async function processLoginData(data: LoginResponse | null): Promise<void> {
      if (data && data.access && data.refresh) {
        setTokens(data.access, data.refresh);
      }
    }

    function setTokens(access: string, refresh: string): void {
      setAccessToken(access);
      setRefreshToken(refresh);

      // set JWT expiration
      const expiration = readJwtExpiration(access);

      if (expiration) {
        setJwtExpiration(expiration);
      }

      // token refresh (if no page reload before expiration)
      // scheduleTokenRefresh();
    }

    /**
     * Logout user
     * Sets the access token, refresh token and user to empty values.
     */
    function logout(): void {
      setAccessToken('');
      setRefreshToken('');
      setJwtExpiration(null);
      userStore.clearUserStore();
      eventStore.clearEventStore();
      clearRefreshTokenTimeout();
      userEmail.value = '';
      // clear stores

      // redirect to login page
      router.push(routesConf['login']['path']);
    }
    /**
     * Schedule token refresh (on page load, if logged in)
     * Refreshes the token 1 minute before expiration.
     * This function is being called in `pinia.js` boot file.
     */
    // function scheduleTokenRefresh() {
    //   const timeUntilExpiration = this.getTimeUntilExpiration();
    //   if (timeUntilExpiration) {
    //     // refresh token 1 minute before expiration
    //     const refreshTime = timeUntilExpiration - 60;

    //     if (refreshTime > 0) {
    //       this.$log?.debug(
    //         `Schedule refresh access token in <${Math.floor(refreshTime / 60)}> minutes.`,
    //       );
    //       // store timeout in store so it can be cancelled on logout
    //       this.setRefreshTokenTimeout(
    //         setTimeout(() => {
    //           this.refreshTokens();
    //         }, refreshTime * 1000), // miliseconds
    //       );
    //     } else {
    //       // token expired - refresh immediately
    //       this.$log?.info('Access token expired, refresh it immediately.');
    //       this.refreshTokens();
    //     }
    //   }
    // }
    /**
     * Validate access token (before sending an API request)
     * Checks if the access token exists and is not expired.
     * If no expiration is set, logs the user out.
     * If the access token is missing or expired, tries to refresh it.
     * If refresh fails, logs the user out.
     * If refresh succeeds, returns true.
     * If the token exists and is not expired, returns true.
     * @returns {Promise<boolean>} - Token is valid
     */
    async function validateAccessToken(): Promise<boolean> {
      if (!jwtExpiration.value) {
        // no expiration set - user is not logged in
        return false;
      }

      // Check if access token is missing (e.g., after page reload)
      // or if it's expired
      if (!accessToken.value || isJwtExpired()) {
        // try to refresh tokens
        await refreshTokens();
        // check if refresh was successful
        if (!accessToken.value || isJwtExpired()) {
          // refresh failed - logout
          logout();
          return false;
        } else {
          // refresh successful
          return true;
        }
      } else {
        // token exists and is not expired
        return true;
      }
    }
    /**
     * Refresh tokens
     * Sends a request to refresh the access token using the refresh token.
     * If successful, sets the new access token.
     * @returns {Promise<void>}
     */
    async function refreshTokens(): Promise<void> {
      // check that refresh token is set
      if (!refreshToken.value) {
        return;
      }
      // refresh tokens
      const payload = { refresh: refreshToken.value };
      const data = await refreshTokenApi(payload);

      // set new access token
      if (data && data.access) {
        setAccessToken(data.access);

        // set JWT expiration
        const expiration = readJwtExpiration(data.access);
        if (expiration) {
          setJwtExpiration(expiration);
        }

        // token refresh (if no page reload before expiration)
        // scheduleTokenRefresh();
      }
    }
    /**
     * Calculates the time until JWT expiration.
     * Action is used instead of getter to provide reactive value in tests.
     * @returns {number | null} - Time in seconds until expiration or null.
     */
    // function getTimeUntilExpiration(): number | null {
    //   const currentTime = Math.floor(Date.now() / 1000); // seconds
    //   const timeUntilExpiration = this.getJwtExpiration
    //     ? this.getJwtExpiration - currentTime
    //     : null;
    //   this.$log?.debug(
    //     `Time until access token expirated in <${timeUntilExpiration ? Math.floor(timeUntilExpiration / 60) : null}> minutes.`,
    //   );
    //   return timeUntilExpiration;
    // }
    /**
     * Checks if the JWT is expired.
     * Action is used instead of getter to provide reactive value in tests.
     * @returns {boolean} True if expired, else false.
     */
    function isJwtExpired(): boolean {
      const expiration = jwtExpiration.value;
      const currentTimeSeconds = Math.floor(Date.now() / 1000); // seconds
      return !expiration || currentTimeSeconds > expiration;
    }
    /**
     * Reset password
     * Sends a request to reset the password using the email.
     * @param {string} email - Email
     * @return {Promise<boolean>}
     */
    async function resetPassword(email: string): Promise<boolean> {
      return await resetPasswordApi(email);
    }

    async function resetPasswordConfirm(
      uid: string,
      token: string,
      password: string,
      passwordConfirm: string,
    ): Promise<void> {
      const result = await resetPasswordConfirmApi(
        uid,
        token,
        password,
        passwordConfirm,
      );
      if (result) {
        await router.push(routesConf['login']['path']);
      }
    }

    async function checkUserVerification(): Promise<void> {
      if (await isUserVerifiedApi()) {
        isUserVerified.value = true;
      } else {
        isUserVerified.value = false;
      }
    }

    return {
      accessToken,
      refreshToken,
      jwtExpiration,
      userEmail,
      resetPasswordConfirm,
      isUserLoggedIn,
      login,
      logout,
      resetPassword,
      processLoginData,
      validateAccessToken,
      checkUserVerification,
      isUserVerified,
    };
  },
  {
    persist: {
      storage: localStorage,
      pick: ['refreshToken', 'jwtExpiration'],
    },
  },
);
