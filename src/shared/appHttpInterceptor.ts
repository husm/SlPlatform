import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthUtilService } from './util/auth-util.service';


@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

    constructor(
        private authUtilService: AuthUtilService
    ) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const modifiedRequest = this.normalizeRequestHeaders(request);
        return next.handle(modifiedRequest);
    }

    protected normalizeRequestHeaders(request: HttpRequest<any>): HttpRequest<any> {
        let modifiedHeaders = new HttpHeaders();
        modifiedHeaders = request.headers.set('Prama', 'no-cache')
                            .set('Cache-Control', 'no-cache')
                            .set('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT');

        modifiedHeaders = this.addAuthorizationHeaders(modifiedHeaders);
        return request.clone({
            headers: modifiedHeaders
        });
    }

    protected addAuthorizationHeaders(headers: HttpHeaders): HttpHeaders {
        let authorizationHeaders = headers ? headers.getAll('Authorization') : null;
        if (!authorizationHeaders) {
            authorizationHeaders = [];
        }

        if (!this.itemExists(authorizationHeaders, (item: string) => item.indexOf('Bearer ') === 0)) {
            const token = this.authUtilService.getAuthToken();
            if (headers && token) {
                headers = headers.set('Authorization', 'Bearer ' + token);
            }
        }

        return headers;
    }

    private itemExists<T>(items: T[], predicate: (item: T) => boolean): boolean {
        for (let i = 0; i < items.length; i++) {
            if (predicate(items[i])) {
                return true;
            }
        }

        return false;
    }

}
