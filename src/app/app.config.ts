import { InjectionToken } from '@angular/core';

export let APP_CONFIG = new InjectionToken('app.config');

export interface AiotalAppConfig {
  portfolioSite: string;
  apiendpoint: string;
  tokenendpoint: string;
  socialAndWorkLogin: string;
  authorizationendpoint: String;
  notificationsendpoint: String;
  Subscriptionendpoint:String;
}

export const AppConfig: AiotalAppConfig = {
  portfolioSite: 'http://10.11.0.82:9098/ang_pages/startforfree.html',
  apiendpoint: 'http://apdev.epsoftinc.in',
  tokenendpoint: 'http://idmdev.epsoftinc.in',
  authorizationendpoint: 'http://authdev.epsoftinc.in',
  socialAndWorkLogin: 'http://ezbotdevapi.aiotal.in',
  notificationsendpoint: 'http://alertsdev.epsoftinc.in',
  Subscriptionendpoint:'http://subscriptiondev.epsoftinc.in'
};


