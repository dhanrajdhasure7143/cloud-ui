import { InjectionToken } from '@angular/core';

export let APP_CONFIG = new InjectionToken('app.config');

export interface EzflowAppConfig {
  portfolioSite: string;
  apiHost: string;
  apiURL: string;
  loopbackHost: string;
  imagePath: string;
  isProduction: boolean;
}

export const AppConfig: EzflowAppConfig = {
  portfolioSite: 'https://aiotal.com',
  apiHost: 'http://ezbotdev.aiotal.in',
  loopbackHost: '',
  apiURL: '/aiotal',
  imagePath: '',
  isProduction: true
};
