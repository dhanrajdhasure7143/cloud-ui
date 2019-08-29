import { InjectionToken } from '@angular/core';

export let APP_CONFIG = new InjectionToken('app.config');

export interface AiotalAppConfig {
  portfolioSite: string;
  apiendpoint: string;
  tokenendpoint: string;
  socialAndWorkLogin: string;
}

export const AppConfig: AiotalAppConfig = {
  portfolioSite: 'http://localhost:52538',
  apiendpoint: 'http://10.11.0.82:9091',
  tokenendpoint: 'https://10.11.0.82:8080',
  socialAndWorkLogin: 'https://kube.aiotaldomain.com:9090'
};
