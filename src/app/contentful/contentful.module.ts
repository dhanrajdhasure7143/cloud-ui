import { NgModule, ModuleWithProviders } from '@angular/core';

import { ContentfulService, ContentfulConfigService, ContentfulConfig } from '.';

@NgModule()
export class ContentfulModule {

  static forRoot(config: ContentfulConfig): ModuleWithProviders {
    return {
      ngModule: ContentfulModule,
      providers: [
        ContentfulService,
        {
          provide: ContentfulConfigService,
          useValue: config
        }
      ]
    };
  }
}
