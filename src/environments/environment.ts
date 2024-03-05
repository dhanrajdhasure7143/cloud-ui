// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
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
  asquareproductendpoint: 'https://ezflowasquare.dev.epsoftinc.com',
  isTwoFactorAuthenticationEnabled: false,
  isSecurityManagerEnabled : false,
  isNewDesignEnabled : true,
  isSubscrptionEnabled : true,
  isNewSignupFlow : true,
  paymentSuccessURL:"https://ezflow.dev.epsoftinc.com/#/success",
  paymentFailuerURL:"https://ezflow.dev.epsoftinc.com/#/fail",
  stripeKey:"pk_test_51K5EsdSGPu394velvnjppO7wSsy1J1RLBGQ9wsHR2r6MnZvZmOXbP8laJ1vVaAgQFayDJeNJea1qyxwJyyWjrS7f00q4AByMTq"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
