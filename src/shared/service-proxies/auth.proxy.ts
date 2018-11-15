import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponseBase, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { API_BASE_URL } from '@shared/consts/service.const';
import { AuthenticateModel, AuthenticateResultModel } from '@shared/models';
import { Observable, observable } from 'rxjs';
import { mergeMap, observeOn, reduce } from 'rxjs/operators';
import { ObserversModule } from '@angular/cdk/observers';

@Injectable()
export class AuthProxy {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : '';
        console.log('--------- AuthProxy', this.baseUrl);
    }

    // authenticate(model: AuthenticateModel | null | undefined): Observable<AuthenticateResultModel> {
    //     let url = this.baseUrl + '/api/TokenAuth/Authenticate';
    //     url = url.replace(/[?&]$/, '');

    //     const params = JSON.stringify(model);
    //     const options: any = {
    //         body: params,
    //         observe: 'response',
    //         responseType: 'blob',
    //         headers: new HttpHeaders({
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json'
    //         })
    //     };

    //     return this.http.request('post', url, options).pipe(mergeMap((response: any) => {
    //         console.log('-------- AuthProxy:authenticate', response);
    //         return <any>null;
    //     }));
    // }

    async authenticate(model: AuthenticateModel | null | undefined): Promise<any> {
        const authResponse: any = await this.authenticateAsync(model);
        const authResult: any = await this.processAuthenticateAsync(authResponse);

        return authResult;
    }

    private authenticateAsync(input: AuthenticateModel | null | undefined): Promise<any> {
        let url = this.baseUrl + '/api/TokenAuth/Authenticate';
        url = url.replace(/[?&]$/, '');

        const params = JSON.stringify(input);
        const options: any = {
            body: params,
            observe: 'response',
            responseType: 'json',
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
        };

        const promiseResult = this.http.request('post', url, options).toPromise()
            .then((result) => {
                return result;
            }, (err) => {
                return err;
            });

        return promiseResult;
    }

    private processAuthenticateAsync(response: HttpResponseBase): Promise<any> {
        const status = response.status;
        const responseResult =
            response instanceof HttpResponse ? response.body :
                (<any>response).error ? (<any>response).error : undefined;

        if (status === 200) {
            console.log('------- 200result', responseResult, response);
            return responseResult;
        } else if (status !== 200 && status !== 204 && status !== 0) {
            console.log('------- 500result', responseResult, response);
            return responseResult;
        } else if (status === 0) {
            return <any>{
                error: {
                    code: 0,
                    details: (<HttpErrorResponse>response).message,
                    message: (<HttpErrorResponse>response).message,
                    validationErrors: null
                },
                result: null,
                success: false,
                targetUrl: null,
                unAuthorizedRequest: false,
                __abp: true
            }
        }
    }

    async sendVerifyCode(phoneNumber: string): Promise<any> {
        return this.sendVerifyCodeAsync(phoneNumber);
    }

    private sendVerifyCodeAsync(phoneNumber: string): Promise<any> {
        let url = this.baseUrl + '/api/services/app/Message/GetVerifyCode';
        url = url.replace(/[?&]$/, '');

        // const params = JSON.stringify({phoneNumber});
        const params = {
            phoneNumber
        };
        const options: any = {
            params,
            observe: 'response',
            responseType: 'json',
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
        };

        const promiseResult = this.http.request('get', url, options).toPromise()
            .then((result) => {
                return result;
            }, (err) => {
                return err;
            });

        return promiseResult;
    }
}
