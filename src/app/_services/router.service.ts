import { Router, Route } from '@angular/router';
import { Injectable, Compiler } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ModuleData } from './../_models/module.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RouterService {
    existingRoutes: BehaviorSubject<Route[]>;

    constructor(private router: Router, private compiler: Compiler, private http: HttpClient) { 
        this.existingRoutes = new BehaviorSubject<Route[]>(this.routes);
    }

    private get routes(): Route[]{
        var routesToReturn = this.router.config;
        return routesToReturn.filter(x => x.path !== "");
    }

    createAndRegisterRoute(moduleToRegister: ModuleData, exports: any) {
        let route: Route = { 
            path: moduleToRegister.path,
            loadChildren: () => exports[`${moduleToRegister.moduleName}`]
        };

        this.registerRoute(route);
    }

    routeIsRegistered(path: string) {
        return this.router.config.filter(r => r.path === path).length > 0;
    }

    registerRoute(route: Route){
        if(this.routeIsRegistered(route.path)) return;

        this.router.config.push(route);
        this.updateRouteConfig(this.router.config);
    }

    unRegisterRoute(path: string){
       
        this.updateRouteConfig(this.router.config.filter(route => route.path !== path));
    }    

    private updateRouteConfig(config) {
        this.router.resetConfig(config);
        this.existingRoutes.next(this.routes);
    }


}