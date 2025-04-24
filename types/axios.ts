// src/types/axios.ts
import { AxiosRequestConfig } from 'axios';

declare module 'axios' {
  interface AxiosRequestConfig {
    requiresAuth?: boolean;
  }
}