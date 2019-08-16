import { InjectionToken } from '@angular/core';

export let APP_CONFIG = new InjectionToken('app.config');

export interface AiotalAppConfig {
  portfolioSite: string;
  apiendpoint: string;
  tokenendpoint: string;
}

export const AppConfig: AiotalAppConfig = {
  portfolioSite: 'http://localhost:52538',
  apiendpoint: 'http://10.11.0.82:9091',
  tokenendpoint: 'http://10.11.0.82:9090',
};
