/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly REACT_APP_CRYPTO_KEY: string;
    readonly REACT_APP_CRYPTO_SECRET: string;
  }
}
