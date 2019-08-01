import { InjectionToken } from '@angular/core';

export let APP_CONFIG = new InjectionToken('app.config');

export interface EzflowAppConfig {
  apiHost: string;
  apiURL: string;
  loopbackHost: string;
  imagePath: string;
  isProduction: boolean;
}

export const AppConfig: EzflowAppConfig = {
  apiHost: 'http://ezbotdev.aiotal.in',
  loopbackHost: 'http://10.11.0.64:3000',
  apiURL: '/ezflow_rest',
  imagePath: '',
  isProduction: true
};
