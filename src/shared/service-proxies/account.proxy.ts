import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponseBase, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { API_BASE_URL } from '@shared/consts/service.const';
import { RegisterInput } from '@shared/models/register.model';

@Injectable()
export class AccountProxy {
    private http: HttpClient;
    private baseUrl: string;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : '';
        console.log('--------- AccountProxy', this.baseUrl);
    }

    async register(input: RegisterInput | null | undefined): Promise<any> {
        const registerResponse: any = await this.registerAsync(input);
        const registerResult: any = await this.processRegisterAsync(registerResponse);

        return registerResult;
    }

    registerAsync(input: RegisterInput | null | undefined): Promise<any> {
        let url = this.baseUrl + '/api/TokenAuth/RegisterAndAuthenticate';
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

    processRegisterAsync(response: HttpResponseBase): Promise<any> {
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
}
