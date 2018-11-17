import { Injectable } from '@angular/core';
import { AuthenticateModel, AuthenticateResultModel } from '@shared/models';
import { AuthProxy } from '@shared/service-proxies/auth.proxy';
import { Router } from '@angular/router';
import { AuthUtilService } from '@shared/util/auth-util.service';
import { UrlHelper } from '@shared/helpers/UrlHelper';
import { AppConsts } from '@app/AppConsts';

@Injectable()
export class LoginService {
    authenticateModel: AuthenticateModel;
    authenticateResult: AuthenticateResultModel;
    rememberMe: boolean;

    constructor(
        private router: Router,
        private authService: AuthProxy,
        private authUtilService: AuthUtilService
    ) {
        this.init();
    }

    authenticate() {
        this.authService.authenticate(this.authenticateModel)
            .then((result) => {
                console.log('------ LoginService:authenticate', result);
                this.processAuthenticateResult(result.result);
            });
    }

    /**
     * Initialize the service properties
     */
    private init(): void {
        this.authenticateModel = new AuthenticateModel();
    }

    private processAuthenticateResult(authenticateResult: AuthenticateResultModel) {
        this.authenticateResult = authenticateResult;
        console.log('-------- processAuthenticateResult', authenticateResult);
        if (authenticateResult.accessToken) {
            this.login(authenticateResult.accessToken, authenticateResult.encryptedAccessToken,
                authenticateResult.expireInSeconds, this.rememberMe);
        } else {
            this.router.navigate(['account/login']);
        }
    }

    private login(accessToken: string, eccryptedAccessToken: string, expireInSeconds: number, rememberMe?: boolean): void {
        const tokenExpireDate = rememberMe ? (new Date(new Date().getTime() + 1000 * expireInSeconds)) : undefined;

        this.authUtilService.setAuthToken(accessToken, tokenExpireDate);

        let initialUrl = UrlHelper.initialUrl;
        if (initialUrl.indexOf('/login') > 0) {
            initialUrl = AppConsts.appBaseUrl;
        }

        // console.log('------- login', initialUrl);

        location.href = initialUrl;
    }
}
