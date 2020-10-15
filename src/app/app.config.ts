import { InjectionToken } from '@angular/core';

export let APP_CONFIG = new InjectionToken('app.config');

export interface AiotalAppConfig {
  portfolioSite: string;
  apiendpoint: string;
  tokenendpoint: string;
  proxyTokenendpoint: string;
  socialAndWorkLogin: string;
  authorizationendpoint: String;
  notificationsendpoint: String;
  Subscriptionendpoint:String;
  productendpoint: String;
  isSecurityManagerEnabled : boolean;
}

export const AppConfig: AiotalAppConfig = {
  portfolioSite: 'http://10.11.0.82:9098/ang_pages/startforfree.html',
  apiendpoint: 'http://eiapdemoapi.epsoftinc.com:96/aiotalplatform',
  tokenendpoint: 'http://eiapdemoapi.epsoftinc.com:96/idm',
  proxyTokenendpoint: 'http://10.11.0.112:3001',
  authorizationendpoint: 'http://eiapdemoapi.epsoftinc.com:96/authservices',
  socialAndWorkLogin: 'http://ezbotdevapi.aiotal.in',
  notificationsendpoint: 'http://eiapdemoapi.epsoftinc.com:96/alerts',
  Subscriptionendpoint:'http://eiapdemoapi.epsoftinc.com:96/subscriptions',
  productendpoint: 'http://eiapdemo.epsoftinc.com:86',
  isSecurityManagerEnabled : false
};
