// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  portfolioSite: 'http://10.11.0.82:9098/ang_pages/startforfree.html',
  apiendpoint: 'http://aiotalplatform.dev.epsoftinc.in',
  tokenendpoint: 'http://idm.dev.epsoftinc.in',
  proxyTokenendpoint: 'http://ezflow.dev.epsoftinc.in/securitymgr',
  authorizationendpoint: 'http://authservices.dev.epsoftinc.in',
  socialAndWorkLogin: 'http://ezbotdevapi.aiotal.in',
  notificationsendpoint: 'http://alerts.dev.epsoftinc.in',
  Subscriptionendpoint:'http://subscription.dev.epsoftinc.in',
  productendpoint: 'http://eziap.dev.epsoftinc.in',
  newproductendpoint: 'http://eziap.dev.epsoftinc.in',
  socialLoginRedirectURL: 'http://ezflow.dev.epsoftinc.in/#/user',
  rpaendpoint:"http://rpa.dev.epsoftinc.in",
  piendpoint:"http://pi.dev.epsoftinc.in",
  asquareproductendpoint: 'http://asquare.dev.epsoftinc.in',
  isTwoFactorAuthenticationEnabled: false,
  isSecurityManagerEnabled : false,
  isNewDesignEnabled : true,
  isSubscrptionEnabled : false,
  paymentSuccessURL:"http://ezflow.dev.epsoftinc.in/#/success",
  paymentFailuerURL:"http://ezflow.dev.epsoftinc.in/#/subscription",
  stripeKey:"pk_test_51K5EsdSGPu394velvnjppO7wSsy1J1RLBGQ9wsHR2r6MnZvZmOXbP8laJ1vVaAgQFayDJeNJea1qyxwJyyWjrS7f00q4AByMTq",
  product:"EZFlow"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.