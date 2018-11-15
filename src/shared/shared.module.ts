import { NgModule, ModuleWithProviders } from '@angular/core';
import { AppRouteGuard } from './auth/auth-route-guard';
import { AppSessionService } from './session/app-session.service';
import { AuthUtilService } from './util/auth-util.service';
import { CommUtilService } from './util/comm-util.service';
import { AppHttpInterceptor } from './appHttpInterceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


@NgModule({
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                CommUtilService,
                AuthUtilService,
                AppSessionService,
                AppRouteGuard,
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: AppHttpInterceptor,
                    multi: true
                }
            ]
        };
    }
}
