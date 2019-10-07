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
  apiendpoint: 'http://localhost:9090',
  tokenendpoint: 'http://localhost:9797',
  socialAndWorkLogin: 'http://localhost:9797'

};
