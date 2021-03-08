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
  apiendpoint: 'https://eiapbeta.epsoftinc.com/aiotalplatform',
  tokenendpoint: 'https://idmbeta.epsoftinc.com',
  proxyTokenendpoint: 'https://eiapbeta.epsoftinc.com/securitymgr',
  authorizationendpoint: 'https://eiapbeta.epsoftinc.com/authservices',
  socialAndWorkLogin: 'https://ezbotdevapi.aiotal.in',
  notificationsendpoint: 'https://eiapbeta.epsoftinc.com/alerts',
  Subscriptionendpoint:'https://eiapbeta.epsoftinc.com/subscriptions',
  productendpoint: 'https://eiapbeta.epsoftinc.com',
  socialLoginRedirectURL: 'https://eiapcloudbeta.epsoftinc.com/#/user',
  isSecurityManagerEnabled : true,
  isTwoFactorAuthenticationEnabled: false,
  rpaendpoint:"https://eiapbeta.epsoftinc.com/wfrpa",
  piendpoint:"https://eiapbeta.epsoftinc.com/prcintel"

};

