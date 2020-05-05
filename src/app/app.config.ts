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
  apiendpoint: 'http://apqa.epsoftinc.in',
  tokenendpoint: 'http://idmqa.epsoftinc.in',
  authorizationendpoint: 'http://authqa.epsoftinc.in',
  socialAndWorkLogin: 'http://ezbotqaapi.aiotal.in',
  notificationsendpoint: 'http://alertsqa.epsoftinc.in',
  Subscriptionendpoint:'http://subscriptionqa.epsoftinc.in',
};


