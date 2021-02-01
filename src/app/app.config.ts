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
  isTwoFactorAuthenticationEnabled : boolean;
  rpaendpoint:String;
  piendpoint:String;
}

export const AppConfig: AiotalAppConfig = {
  portfolioSite: 'https://10.11.0.82:9098/ang_pages/startforfree.html',
  apiendpoint: 'https://eiapdemoapi.epsoftinc.com:96/aiotalplatform',
  tokenendpoint: 'https://eiapdemoapi.epsoftinc.com:96/idm',
  proxyTokenendpoint: 'https://eiapdemoapi.epsoftinc.com:96/securitymgr/Idm',
  authorizationendpoint: 'https://eiapdemoapi.epsoftinc.com:96/authservices',
  socialAndWorkLogin: 'https://ezbotdevapi.aiotal.in',
  notificationsendpoint: 'https://eiapdemoapi.epsoftinc.com:96/alerts',
  Subscriptionendpoint:'https://eiapdemoapi.epsoftinc.com:96/subscriptions',
  productendpoint: 'https://eiapdemo.epsoftinc.com:86',
  socialLoginRedirectURL: 'https://eiapclouddemo.epsoftinc.com:86/#/user',
  isSecurityManagerEnabled : false,
  isTwoFactorAuthenticationEnabled: false,
  rpaendpoint:"http://rpaqa.epsoftinc.in",
  piendpoint:"http://piqa.epsoftinc.in"

};

