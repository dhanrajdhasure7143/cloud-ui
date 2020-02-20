import { InjectionToken } from '@angular/core';

export let APP_CONFIG = new InjectionToken('app.config');

export interface AiotalAppConfig {
  portfolioSite: string;
  apiendpoint: string;
  tokenendpoint: string;
  socialAndWorkLogin: string;
  authorizationendpoint: String;
}

export const AppConfig: AiotalAppConfig = {
  portfolioSite: 'http://10.11.0.82:9098/ang_pages/startforfree.html',
  apiendpoint: 'http://10.11.0.82:9090',
  tokenendpoint: 'https://10.11.0.82:9090',
  authorizationendpoint: 'http://10.11.0.82:9095/',
  socialAndWorkLogin: 'http://ezbotdevapi.aiotal.in'
};
