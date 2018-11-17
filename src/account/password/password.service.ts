import { Injectable } from '@angular/core';
import { AccountProxy } from '@shared/service-proxies/account.proxy';
import { RegisterInput, RegisterOutput } from '@shared/models/register.model';
import { AuthUtilService } from '@shared/util/auth-util.service';
import { UrlHelper } from '@shared/helpers/UrlHelper';
import { AppConsts } from '@app/AppConsts';
import { Router } from '@angular/router';
import { AuthProxy } from '@shared/service-proxies/auth.proxy';

@Injectable()
export class PasswordService {
    constructor(
        private _router: Router,
        private _accountService: AccountProxy,
        private _authService: AuthProxy,
        private _authUtilService: AuthUtilService
    ) {
    }

    sendVerifyCode(phoneNumber: string) {
        this._authService.sendVerifyCode(phoneNumber).then(
            (result) => {
                console.log('---------- sendVerifyCode', result);
            }, (err) => {
                console.log('---------- sendVerifyCode', err);
            }
        )
    }

    register(input: RegisterInput) {
        this._accountService.register(input)
            .then((result) => {
                this.processRegisterResult(result.result);
            });
    }

    private processRegisterResult(registerResult: RegisterOutput) {
        if (registerResult.accessToken) {
            this.login(registerResult.accessToken, registerResult.encryptedAccessToken,
                registerResult.expireInSeconds);
        } else {
            this._router.navigate(['account/register']);
        }
    }

    private login(accessToken: string, eccryptedAccessToken: string, expireInSeconds: number, rememberMe?: boolean): void {
        const tokenExpireDate = rememberMe ? (new Date(new Date().getTime() + 1000 * expireInSeconds)) : undefined;

        this._authUtilService.setAuthToken(accessToken, tokenExpireDate);

        let initialUrl = UrlHelper.initialUrl;
        if (initialUrl.indexOf('/register') > 0) {
            initialUrl = AppConsts.appBaseUrl;
        }

        location.href = initialUrl;
    }
}
