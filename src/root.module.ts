import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, APP_INITIALIZER, Injector } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CookieModule } from 'ngx-cookie';


import { SharedModule } from '@shared/shared.module';
import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
import { API_BASE_URL } from '@shared/consts/service.const';


import { RootRoutingModule } from './root-routing.module';
import { RootComponent } from './root.component';
import { AppConsts } from '@app/AppConsts';
import { PlatformLocation } from '@angular/common';
import { AppPreBootstrap } from 'AppPreBootstrap';
import { AppSessionService } from '@shared/session/app-session.service';
import { from } from 'rxjs';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RootRoutingModule,
        HttpClientModule,
        CookieModule.forRoot(),
        SharedModule.forRoot(),
        ServiceProxyModule
    ],
    declarations: [
        RootComponent
    ],
    providers: [
        AppPreBootstrap,
        { provide: API_BASE_URL, useFactory: getRemoteServiceBaseUrl },
        {
            provide: APP_INITIALIZER,
            useFactory: appInitializerFactory,
            deps: [Injector, PlatformLocation, AppPreBootstrap],
            multi: true
        }
    ],
    bootstrap: [ RootComponent ]
})
export class RootModule {

}

export function appInitializerFactory(
    injector: Injector,
    platformLocation: PlatformLocation,
    appPreBootstrap: AppPreBootstrap
) {
    return () => {

        // TODO: Display loading figure when application is initializing

        return new Promise<boolean>((resolve, reject) => {
            AppConsts.appBaseHref = getBaseHref(platformLocation);
            const appBaseUrl = getDocumentOrigin() + AppConsts.appBaseHref;

            appPreBootstrap.run(appBaseUrl).then((data) => {
                console.log('----- appInitializerFactory', data);
                resolve();
            }).then((result) => {
                const appSessionService: AppSessionService = injector.get(AppSessionService);
                appSessionService.init();
            });

        })
    }
}

export function getRemoteServiceBaseUrl(): string {
    console.log('------- getRemoteServiceBaseUrl', AppConsts.remoteServiceBaseUrl);
    return AppConsts.remoteServiceBaseUrl;
}

export function getBaseHref(platformLocation: PlatformLocation): string {
    const baseUrl = platformLocation.getBaseHrefFromDOM();
    if (baseUrl) {
        return baseUrl;
    }

    return '/';
}

export function getDocumentOrigin() {
    if (!document.location.origin) {
        return document.location.protocol
            + '//'
            + document.location.hostname
            + (document.location.port ? ':' + document.location.port : '');
    }

    return document.location.origin;
}

