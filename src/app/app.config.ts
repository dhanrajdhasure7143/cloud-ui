import { InjectionToken } from '@angular/core';
import { environment } from 'src/environments/environment';

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
  asquareproductendpoint: String;
}

export const AppConfig: AiotalAppConfig = {

  // Dev Cloud Properties

   portfolioSite: environment.portfolioSite,
   apiendpoint: environment.apiendpoint,
   tokenendpoint: environment.tokenendpoint,
   proxyTokenendpoint: environment.proxyTokenendpoint,
   authorizationendpoint: environment.authorizationendpoint,
   socialAndWorkLogin: environment.socialAndWorkLogin,
   notificationsendpoint: environment.notificationsendpoint,
   Subscriptionendpoint:environment.Subscriptionendpoint,
   productendpoint: environment.productendpoint,
   newproductendpoint: environment.newproductendpoint,
   socialLoginRedirectURL: environment.socialLoginRedirectURL,
   rpaendpoint:environment.rpaendpoint,
   piendpoint:environment.piendpoint,
   isTwoFactorAuthenticationEnabled: environment.isTwoFactorAuthenticationEnabled,
   isSecurityManagerEnabled : environment.isSecurityManagerEnabled,
   isNewDesignEnabled : environment.isNewDesignEnabled,
   asquareproductendpoint : environment.asquareproductendpoint,

  
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

