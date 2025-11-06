// libraries
import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';

// composables
import { useJwt } from '../composables/useJwt';

// config
import { routesConf } from '../router/routes_conf';

// mock data
import { mockLoginResponse, mockRefreshTokenResponse } from '../../mock/loginData';

// types
interface UserLogin {
  pk: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

interface LoginPayload {
  username: string;
  password: string;
}

interface LoginResponse {
  access: string;
  refresh: string;
  user: UserLogin;
}

// utils
import { computed, ref } from 'vue';

interface RefreshTokenResponse {
  access: string;
  access_expiration: string;
}

interface PasswordResetResponse {
  detail: string;
}

export const emptyUser: UserLogin = {
  email: '',
  first_name: '',
  last_name: '',
  pk: 0,
  username: '',
};

export enum LoginFormState {
  login = 'login',
  passwordReset = 'password-reset',
  resetFinished = 'reset-finished',
}

export const useLoginStore = defineStore('login', () => {
  const router = useRouter();

  const user = ref<UserLogin>(emptyUser) // persisted
  const accessToken = ref('')
  const refreshToken = ref('') // persisted
  const jwtExpiration = ref<number | null>(null) // persisted, unit: seconds, https://www.rfc-editor.org/rfc/rfc7519#section-2
  const refreshTokenTimeout = ref<NodeJS.Timeout | null>(null) // unit: seconds
  const loginFormState = ref<LoginFormState>(LoginFormState.login)
  const passwordResetEmail = ref('')

  const isUserLoggedIn = computed(() => (user.value.email ? true : false))

  function setUser(newUser: UserLogin): void {
    user.value = newUser;
  }

  function setAccessToken(token: string): void {
    accessToken.value = token;
  }

  function setRefreshToken(token: string): void {
    refreshToken.value = token;
  }

  function setJwtExpiration(expiration: number | null): void {
    jwtExpiration.value = expiration;
  }

  function setLoginFormState(state: LoginFormState): void {
    loginFormState.value = state;
  }

  function setPasswordResetEmail(email: string): void {
    passwordResetEmail.value = email;
  }

  // function setRefreshTokenTimeout(timeout: NodeJS.Timeout | null): void {
  //   refreshTokenTimeout.value = timeout;
  // }

  function clearRefreshTokenTimeout(): void {
    if (refreshTokenTimeout.value) {
      clearTimeout(refreshTokenTimeout.value);
      refreshTokenTimeout.value = null;
    }
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
  async function login(
    payload: LoginPayload,
  ): Promise<LoginResponse | null> {
    console.log(`Login payload <${JSON.stringify(payload, null, 2)}>.`);
    // check that email is set
    if (!payload.username) {
      console.log('Email is required.');
      return null;
    }
    // check that password is set
    if (!payload.password) {
      console.log('Password is required.');
      return null;
    }
    console.log(`Login username <${payload.username}>.`);
    console.log(`Login password <${payload.password}>.`);
    // login
    console.log('Get API access/refresh token.');
    // const { data } = await useFetch<LoginResponse>(zazitMestoJinakConfig.urlApiLogin, {
    //   method: 'post',
    //   payload,
    // });

    const data = mockLoginResponse

    await processLoginData(data);

    if (data) {
      await router.push(routesConf['home']['path']);
    }

    return data;
  }
  /**
   * Process data received from login request
   * Save user and tokens to login store, then redirect to home page.
   */
  async function processLoginData(data: LoginResponse | null): Promise<void> {
    if (data && data.user) {
      setUser(data.user);
    }
    if (data && data.access && data.refresh) {
      setTokens(data.access, data.refresh);
    }
  }

  function setTokens(access: string, refresh: string): void {
    setAccessToken(access);
    setRefreshToken(refresh);

    // set JWT expiration
    const { readJwtExpiration } = useJwt();
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
    console.log(`Logout user <${user.value.email}>.`);
    setAccessToken('');
    setRefreshToken('');
    setJwtExpiration(null);
    setUser(emptyUser);
    clearRefreshTokenTimeout();
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
   * Checks if the access token is expired.
   * If no expiration is set, logs the user out.
   * If the token is expired, tries to refresh it.
   * If refresh fails, logs the user out.
   * If refresh succeeds, returns true.
   * If the token is not expired, returns true.
   * @returns {Promise<boolean>} - Token is valid
   */
  async function validateAccessToken(): Promise<boolean> {
    console.log('Validate access token.');
    if (!jwtExpiration.value) {
      // no expiration set - user is not logged in
      console.log('No access token expiration set, user is not logged in.');
      return false;
    } else {
      // token is set - check if it is expired
      if (isJwtExpired()) {
        console.log('Access token is expired.');
        // try to refresh tokens
        await refreshTokens();
        // check if refresh was successful
        if (isJwtExpired()) {
          // refresh failed - logout
          console.log('Refresh access token failed, logout user.');
          logout();
          return false;
        } else {
          // refresh successful
          console.log('Refresh access token was successfull.');
          return true;
        }
      } else {
        // token is not expired
        console.log('Access token is not expired.');
        return true;
      }
    }
  }
  /**
   * Refresh tokens
   * Sends a request to refresh the access token using the refresh token.
   * If successful, sets the new access token.
   * @returns {Promise<RefreshTokenResponse | null>} - Refresh token response or null
   */
  async function refreshTokens(): Promise<RefreshTokenResponse | null> {
    // check that refresh token is set
    console.log('Call refresh token.');
    if (!refreshToken.value) {
      console.log(`No refresh token <${refreshToken.value}>.`);
      return null;
    }
    // refresh tokens
    const payload = { refresh: refreshToken.value };
    console.log('Obtain new API access token.', payload);
    // TODO: fetch new access token

    const data = mockRefreshTokenResponse

    // set new access token
    if (data && data.access) {
      console.log('Save newly obtained access token into store.');
      setAccessToken(data.access);
      console.log(`Login store saved newly obtained access token <${accessToken.value}>.`);

      // set JWT expiration
      const { readJwtExpiration } = useJwt();
      const expiration = readJwtExpiration(data.access);
      if (expiration) {
        setJwtExpiration(expiration);
        console.log(
          `Access token expiration time <${new Date(expiration * 1000).toLocaleString()}>.`,
        );
      }

      // token refresh (if no page reload before expiration)
      // scheduleTokenRefresh();
    }

    return data;
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
    console.log(`Is access token expired <${!expiration || currentTimeSeconds > expiration}>.`);
    console.log(`Current date time <${new Date(currentTimeSeconds * 1000).toLocaleString()}, JWT expiration date time <${expiration ? new Date(expiration * 1000).toLocaleString() : null}>.`);
    return !expiration || currentTimeSeconds > expiration;
  }
  /**
   * Reset password
   * Sends a request to reset the password using the email.
   * @param {string} email - Email
   * @return {Promise<void>}
   */
  async function resetPassword(email: string): Promise<PasswordResetResponse | null> {
    const payload = { email };
    console.log(`Reset password email <${payload.email}>.`);
    // const { data } = await useFetch<PasswordResetResponse>({
    //   endpoint: zazitMestoJinakConfig.urlApiResetPassword,
    //   method: 'post',
    //   payload,
    // });

    const data = { detail: 'Password reset e-mail has been sent.' }

    if (data) {
      console.log(`Reset password response <${data.detail}>.`);
      // set password reset email
      console.log(`Set password reset email to <${payload.email}>.`);
      setPasswordResetEmail(payload.email);
      console.log(
        `Login store password reset email <${passwordResetEmail.value}>.`,
      );
      // set login form state
      console.log(
        `Set login form state to <${LoginFormState.resetFinished}>.`,
      );
      setLoginFormState(LoginFormState.resetFinished);
      console.log(
        `Login store login form state <${loginFormState.value}>.`,
      );
    }

    return data;
  }

  return {
    user,
    accessToken,
    refreshToken,
    jwtExpiration,
    loginFormState,
    passwordResetEmail,
    isUserLoggedIn,
    login,
    logout,
    resetPassword,
    validateAccessToken
  }
});
