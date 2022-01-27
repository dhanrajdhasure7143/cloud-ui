import { Injectable, Compiler, Inject, ReflectiveInjector, Injector, COMPILER_OPTIONS } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Needed for the new modules
import * as AngularCore from '@angular/core';
import * as AngularCommon from '@angular/common';
import * as AngularRouter from '@angular/router';
import * as BrowserAnimations from '@angular/platform-browser/animations';
import { ModuleData } from '../_models/module.model';

declare var System: any;


@Injectable()
export class ModuleService {

  source = `http://${window.location.host}/`;

  constructor(private compiler: Compiler, private http: HttpClient) {
     
  }

  loadModules(): Observable<any> {
    return this.http.get<any>('./assets/moduels/modules.json').pipe(map(res => {
        return res;
    }));
  }

  loadModule(moduleInfo: ModuleData): Observable<any> {
      const url = this.source + moduleInfo.location;

      return this.http.get<any>(url).pipe(map(res => res.text()), map(source => {
          const exports = {}; // this will hold module exports
          const modules = {   // this is the list of modules accessible by plugins
              '@angular/core': AngularCore,
              '@angular/common': AngularCommon,
              '@angular/router': AngularRouter,
              '@angular/platform-browser/animations': BrowserAnimations
          };

          // shim 'require' and eval
          const require: any = (module) => modules[module];
          eval(source);
          this.compiler.compileModuleAndAllComponentsSync(exports[`${moduleInfo.moduleName}`])
          return exports;
      }));
  }

  loadModuleSystem(moduleInfo: ModuleData): Promise<any> {
    const url = this.source + moduleInfo.location;
    System.set('@angular/core', System.import(AngularCore));
    System.set('@angular/common', System.import(AngularCommon));
    System.set('@angular/router', System.import(AngularRouter));
    System.set('@angular/platform-browser/animations', System.import(BrowserAnimations));

    // now, import the new module
    return System.import(`${url}`).then((module) => {
      
        return this.compiler.compileModuleAndAllComponentsAsync(module[`${moduleInfo.moduleName}`]).then(compiled => {
            return module;
        });
    });
}
}
