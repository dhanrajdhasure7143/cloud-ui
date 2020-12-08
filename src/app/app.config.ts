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
  isTwoFactorAuthenticationEnabled : boolean
  isSecurityManagerEnabled : boolean;
  rpaendpoint:String;
}

export const AppConfig: AiotalAppConfig = {
  portfolioSite: 'http://10.11.0.82:9098/ang_pages/startforfree.html',
  apiendpoint: 'http://apqa.epsoftinc.in',
  tokenendpoint: 'http://idmqa.epsoftinc.in',
  proxyTokenendpoint: 'http://10.11.0.108:3001',
  authorizationendpoint: 'http://authqa.epsoftinc.in',
  socialAndWorkLogin: 'http://ezbotdevapi.aiotal.in',
  notificationsendpoint: 'http://alertsqa.epsoftinc.in',
  Subscriptionendpoint:'http://subscriptionqa.epsoftinc.in',
  productendpoint: 'http://eiapqa.epsoftinc.in',
  socialLoginRedirectURL: 'http://eiapcloudqa.epsoftinc.in/#/user',
  rpaendpoint:"http://rpadev.epsoftinc.in",
  socialLoginRedirectURL: 'http://eiapclouddev.epsoftinc.in/#/user',
  isTwoFactorAuthenticationEnabled: false,
  isSecurityManagerEnabled : true
};


