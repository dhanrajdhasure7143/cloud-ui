import { InjectionToken } from '@angular/core';
import { ContentfulConfig } from '../models/contentful-config';

/**
 * This is not a real service, but it looks like it from the outside.
 * It's just an InjectionTToken used to import the config object, provided from the outside
 */
export const ContentfulConfigService = new InjectionToken<ContentfulConfig>('ContentfulConfig');
