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
  piendpoint:String;
}

export const AppConfig: AiotalAppConfig = {
  portfolioSite: 'http://10.11.0.82:9098/ang_pages/startforfree.html',
  apiendpoint: 'http://apdev.epsoftinc.in',
  tokenendpoint: 'http://idmdev.epsoftinc.in',
  proxyTokenendpoint: 'http://10.11.0.107:3001',
  authorizationendpoint: 'http://authdev.epsoftinc.in',
  socialAndWorkLogin: 'http://ezbotdevapi.aiotal.in',
  notificationsendpoint: 'http://alertsdev.epsoftinc.in',
  Subscriptionendpoint:'http://subscriptiondev.epsoftinc.in',
  productendpoint: 'http://eiapdev.epsoftinc.in',
  rpaendpoint:"http://rpadev.epsoftinc.in",
  piendpoint:"http://pidev.epsoftinc.in",
  socialLoginRedirectURL: 'http://eiapclouddev.epsoftinc.in/#/user',
  isTwoFactorAuthenticationEnabled: false,
  isSecurityManagerEnabled : true
};


