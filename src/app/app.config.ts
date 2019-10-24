import { InjectionToken } from '@angular/core';

export let APP_CONFIG = new InjectionToken('app.config');

export interface AiotalAppConfig {
  portfolioSite: string;
  apiendpoint: string;
  tokenendpoint: string;
  socialAndWorkLogin: string;
}

export const AppConfig: AiotalAppConfig = {
  portfolioSite: 'http://localhost:4200/#/home',
  apiendpoint: 'http://10.11.0.82:9091',
  tokenendpoint: 'http://localhost:9797',
  socialAndWorkLogin: 'http://localhost:9797'
};
