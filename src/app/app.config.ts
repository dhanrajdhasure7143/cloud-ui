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
  socialLoginRedirectURL: String;
  isSecurityManagerEnabled : boolean;
}

export const AppConfig: AiotalAppConfig = {
  portfolioSite: 'http://10.11.0.82:9098/ang_pages/startforfree.html',
  apiendpoint: 'https://eiapdemoapi.epsoftinc.com:96/aiotalplatform',
  tokenendpoint: 'https://eiapdemoapi.epsoftinc.com:96/idm',
  proxyTokenendpoint: 'http://10.11.0.112:3001',
  authorizationendpoint: 'https://eiapdemoapi.epsoftinc.com:96/authservices',
  socialAndWorkLogin: 'http://ezbotdevapi.aiotal.in',
  notificationsendpoint: 'https://eiapdemoapi.epsoftinc.com:96/alerts',
  Subscriptionendpoint:'https://eiapdemoapi.epsoftinc.com:96/subscriptions',
  productendpoint: 'http://eiapdemo.epsoftinc.com:86',
  socialLoginRedirectURL: 'http://eiapclouddemo.epsoftinc.com:86/#/user',
  isSecurityManagerEnabled : false

};

