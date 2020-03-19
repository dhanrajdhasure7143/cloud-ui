import { InjectionToken } from '@angular/core';

export let APP_CONFIG = new InjectionToken('app.config');

export interface AiotalAppConfig {
  portfolioSite: string;
  apiendpoint: string;
  tokenendpoint: string;
  socialAndWorkLogin: string;
  authorizationendpoint: String;
  notificationsendpoint: String;

}

export const AppConfig: AiotalAppConfig = {
  portfolioSite: 'http://10.11.0.82:9098/ang_pages/startforfree.html',
  apiendpoint: 'http://10.11.1.117:9090',
  tokenendpoint: 'http://10.11.1.117:9797',
  authorizationendpoint: 'http://10.11.1.117:9095',
  socialAndWorkLogin: 'http://ezbotdevapi.aiotal.in',
  notificationsendpoint: 'http://10.11.1.117:9092'
};


