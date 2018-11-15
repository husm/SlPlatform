import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';

@Injectable()
export class CommUtilService {
    constructor(
        private _cookieService: CookieService
    ) {
    }

    /**
     * Gets a cookie with given key.
     * @param {string} key
     */
    getCookieValue(key): string {
        return this._cookieService.get(key);
    }

    /**
     * Sets a cookie value for given key.
     * @param {string} key
     * @param {string} value
     * @param {Date} expireDate (optional). If not specified the cookie will expire at the end of session.
     * @param {string} path (optional)
     */
    setCookieValue(key: string, value: string, expireDate?: Date, path?: string, domain?: string): void {
        console.log('------- setCookieValue', key, value, expireDate, path, domain);
        this._cookieService.put(key, value, {
            expires: expireDate,
            domain: domain,
            path: path
        });

    }
}
