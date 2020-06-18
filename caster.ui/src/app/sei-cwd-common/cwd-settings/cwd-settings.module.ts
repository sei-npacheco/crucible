/*
Crucible
Copyright 2020 Carnegie Mellon University.
NO WARRANTY. THIS CARNEGIE MELLON UNIVERSITY AND SOFTWARE ENGINEERING INSTITUTE MATERIAL IS FURNISHED ON AN "AS-IS" BASIS. CARNEGIE MELLON UNIVERSITY MAKES NO WARRANTIES OF ANY KIND, EITHER EXPRESSED OR IMPLIED, AS TO ANY MATTER INCLUDING, BUT NOT LIMITED TO, WARRANTY OF FITNESS FOR PURPOSE OR MERCHANTABILITY, EXCLUSIVITY, OR RESULTS OBTAINED FROM USE OF THE MATERIAL. CARNEGIE MELLON UNIVERSITY DOES NOT MAKE ANY WARRANTY OF ANY KIND WITH RESPECT TO FREEDOM FROM PATENT, TRADEMARK, OR COPYRIGHT INFRINGEMENT.
Released under a MIT (SEI)-style license, please see license.txt or contact permission@sei.cmu.edu for full terms.
[DISTRIBUTION STATEMENT A] This material has been approved for public release and unlimited distribution.  Please see Copyright notice for non-US Government use and distribution.
Carnegie Mellon(R) and CERT(R) are registered in the U.S. Patent and Trademark Office by Carnegie Mellon University.
DM20-0181
*/

import {
  APP_INITIALIZER,
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CwdSettingsConfig, CwdSettingsService } from './services';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  ApiModule,
  BASE_PATH,
  Configuration,
  ConfigurationParameters,
} from '../../generated/caster-api';
import { CWD_SETTINGS_TOKEN } from '../sei-cwd-common.module';

export function get_settings(settings: CwdSettingsService, http: HttpClient) {
  return () => settings.load();
}

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule, CwdSettingsConfig],
  providers: [
    CwdSettingsService,
    { provide: CWD_SETTINGS_TOKEN, useExisting: CwdSettingsService },
    {
      provide: APP_INITIALIZER,
      useFactory: get_settings,
      deps: [CWD_SETTINGS_TOKEN],
      multi: true,
    },
  ],
  exports: [CwdSettingsConfig],
})
export class CwdSettingsModule {
  constructor(
    @Optional() @SkipSelf() parentModule: CwdSettingsModule,
    private settings: CwdSettingsService
  ) {
    if (parentModule) {
      throw new Error(
        `SeiSettingsModule is already loaded. Import into AppModule only`
      );
    }
  }

  static forRoot(
    config: CwdSettingsConfig
  ): ModuleWithProviders<CwdSettingsModule> {
    return {
      ngModule: CwdSettingsModule,
      providers: [{ provide: CwdSettingsConfig, useValue: config }],
    };
  }
}
