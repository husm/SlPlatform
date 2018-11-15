import { Injectable } from '@angular/core';
import { CommUtilService } from './comm-util.service';

@Injectable()
export class AuthUtilService {
    private authTokenName = 'NxEdu.AuthToken';
    private appPath = '/';

    constructor(
        private _commUtilService: CommUtilService
    ) {
    }

    getAuthToken(): string {
        return this._commUtilService.getCookieValue(this.authTokenName);
    }

    setAuthToken(authToken, expireDate): void {
        this._commUtilService.setCookieValue(this.authTokenName, authToken, expireDate, this.appPath, expireDate);
    }
}
