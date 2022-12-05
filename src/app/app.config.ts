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
  newproductendpoint: String;
  socialLoginRedirectURL: String;
  isSecurityManagerEnabled : boolean;
  isTwoFactorAuthenticationEnabled : boolean;
  rpaendpoint:String;
  piendpoint:String;
  isNewDesignEnabled : boolean;
}

export const AppConfig: AiotalAppConfig = {

  // Dev Cloud Properties

  portfolioSite: 'http://10.11.0.82:9098/ang_pages/startforfree.html',
   apiendpoint: 'https://ezflow.dev.epsoftinc.com/aiotalplatform',
   tokenendpoint: 'https://ezidm.dev.epsoftinc.com',
   proxyTokenendpoint: 'https://ezflow.dev.epsoftinc.com/securitymgr',
   authorizationendpoint: 'https://ezflow.dev.epsoftinc.com/authservices',
   socialAndWorkLogin: 'https://ezbotdevapi.aiotal.in',
   notificationsendpoint: 'https://ezflow.dev.epsoftinc.com/alerts',
   Subscriptionendpoint:'https://ezflow.dev.epsoftinc.com/subscriptions',
   productendpoint: 'https://eziap.dev.epsoftinc.com',
   newproductendpoint: 'https://eziap.dev.epsoftinc.com',
   socialLoginRedirectURL: 'https://ezflow.dev.epsoftinc.com/#/user',
   rpaendpoint:"https://ezflow.dev.epsoftinc.com/wfrpa",
   piendpoint:"https://ezflow.dev.epsoftinc.com/prcintel",
   isTwoFactorAuthenticationEnabled: false,
   isSecurityManagerEnabled : false,
   isNewDesignEnabled : true

  
  // demo
  //portfolioSite: 'https://10.11.0.82:9098/ang_pages/startforfree.html',
  //apiendpoint: 'https://eiapbeta.epsoftinc.com/aiotalplatform',
  //tokenendpoint: 'https://idmbeta.epsoftinc.com',
  //proxyTokenendpoint: 'https://eiapbeta.epsoftinc.com/securitymgr',
  //authorizationendpoint: 'https://eiapbeta.epsoftinc.com/authservices',
  //socialAndWorkLogin: 'https://ezbotdevapi.aiotal.in',
  //notificationsendpoint: 'https://eiapbeta.epsoftinc.com/alerts',
  //Subscriptionendpoint:'https://eiapbeta.epsoftinc.com/subscriptions',
  //productendpoint: 'https://eiapbeta.epsoftinc.com',
  //socialLoginRedirectURL: 'https://eiapcloudbeta.epsoftinc.com/#/user',
  //isSecurityManagerEnabled : true,
  //isTwoFactorAuthenticationEnabled: false,
  //rpaendpoint:"https://eiapbeta.epsoftinc.com/wfrpa",
  //piendpoint:"https://eiapbeta.epsoftinc.com/prcintel"


//   // QA cloud Urls
// portfolioSite: 'http://10.11.0.82:9098/ang_pages/startforfree.html',
//    apiendpoint: 'https://ezflow.qa.epsoftinc.com/aiotalplatform',
//    tokenendpoint: 'https://ezidm.qa.epsoftinc.com',
//    proxyTokenendpoint: 'https://ezflow.qa.epsoftinc.com/securitymgr',
//    authorizationendpoint: 'https://ezflow.qa.epsoftinc.com/authservices',
//    socialAndWorkLogin: 'https://ezbotdevapi.aiotal.in',
//    notificationsendpoint: 'https://ezflow.qa.epsoftinc.com/alerts',
//    Subscriptionendpoint:'https://ezflow.qa.epsoftinc.com/subscriptions',
//    productendpoint: 'https://eziap.qa.epsoftinc.com',
//    newproductendpoint: 'https://eziap.qa.epsoftinc.com',
//    socialLoginRedirectURL: 'https://ezflow.qa.epsoftinc.com/#/user',
//    rpaendpoint:"https://ezflow.qa.epsoftinc.com/wfrpa",
//    piendpoint:"https://ezflow.qa.epsoftinc.com/prcintel",
//    isTwoFactorAuthenticationEnabled: false,
//    isSecurityManagerEnabled : false,
//    isNewDesignEnabled : true


};

