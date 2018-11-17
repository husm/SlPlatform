import { Injectable, Inject } from '@angular/core';
import { UserLoginInfoDto, TenantLoginInfoDto, ApplicationInfoDto } from '@shared/models';
import { SessionProxy } from '@shared/service-proxies/session.proxy';
import { API_BASE_URL } from '@shared/consts/service.const';
import { HttpClient } from '@angular/common/http';
import { CurrentLoginInformationVwm } from '@shared/view-models/current-login-infomation.vwm';


@Injectable()
export class AppSessionService {

    private _user: UserLoginInfoDto;
    private _tenant: TenantLoginInfoDto;
    private _application: ApplicationInfoDto;

    get application(): ApplicationInfoDto {
        return this._application;
    }

    get user(): UserLoginInfoDto {
        return this._user;
    }

    get userId(): number {
        return this._user ? this._user.id : null;
    }

    get tenant(): TenantLoginInfoDto {
        return this._tenant;
    }

    get tenantId(): number {
        return this.tenant ? this.tenant.id : null;
    }

    constructor(
        private _httpClient: HttpClient,
        private _sessionService: SessionProxy,
        @Inject(API_BASE_URL) private baseUrl?: string
    ) {
        console.log('-------- AppSessionService:constructor', this.baseUrl)
    }

    init(): Promise<boolean> {

        return new Promise<boolean>((resolve, reject) => {
            this._sessionService.getCurrentLoginInformations().then((result: CurrentLoginInformationVwm) => {
                this._application = result.application;
                this._user = result.user;
                console.log('------- AppSessionService:init', result);
                resolve(true);
            }, (err) => {
                reject(err);
            });
        });
    }
}
