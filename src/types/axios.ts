import { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';

declare module 'axios' {
  interface AxiosRequestConfig {
    requiresAuth?: boolean;
  }
  interface InternalAxiosRequestConfig {
    requiresAuth?: boolean;
  }
}