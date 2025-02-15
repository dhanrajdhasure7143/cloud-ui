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
  productendpoint: 'http://epsoftiap.internaldev.ai',
  newproductendpoint: 'http://epsoftiap.internaldev.ai',
  socialLoginRedirectURL: 'http://epsoft.internaldev.ai/#/user',
  rpaendpoint:"http://rpa.dev.epsoftinc.in",
  piendpoint:"http://pi.dev.epsoftinc.in",
  projectendpoint_url: "http://pcs.dev.epsoftinc.in",
  isTwoFactorAuthenticationEnabled: false,
  isSecurityManagerEnabled : false,
  isNewDesignEnabled : true,
  isSubscrptionEnabled : true,
  paymentSuccessURL:"http://epsoft.internaldev.ai/#/success",
  paymentFailuerURL:"http://epsoft.internaldev.ai/#/",
  stripeKey:"pk_test_51Q0n8DRvIuDE09bYUTJnNOV5RPgHvGxNjuT1MLilaJUObc6ot82f7APP2ht3SJhpCWykkvf9Pl2pG8ptKlnjcjVA001C5iK2RP",
  product:"AiAgents",
  isWebhookEnabled: false,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.