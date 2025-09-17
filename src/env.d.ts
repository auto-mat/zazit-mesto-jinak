/* eslint-disable */
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    VUE_ROUTER_MODE: 'hash' | 'history' | 'abstract' | undefined;
    VUE_ROUTER_BASE: string | undefined;
    ZAZIT_MESTO_JINAK_CONFIG: string;
    ZAZIT_MESTO_JINAK_DEPLOYED_VERSION: string;
  }
}
