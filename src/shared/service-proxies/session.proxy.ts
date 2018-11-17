import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponseBase, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, from, of, throwError } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';

import { API_BASE_URL } from '@shared/consts/service.const';
import { CurrentLoginInformationVwm } from '@shared/view-models/current-login-infomation.vwm';

@Injectable()
export class SessionProxy {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : '';
        console.log('--------- SessionProxy', this.baseUrl);
    }

    async getCurrentLoginInformations(): Promise<any> {
        const response: any = await this.getCurrentLoginInformationsAsync();
        const result: any = await this.processCurrentLoginInformationAsync(response);

        return result.result;
    }

    getCurrentLoginInformationsAsync(): Promise<any> {
        let url = this.baseUrl + '/api/services/app/Session/GetCurrentLoginInformations';
        url = url.replace(/[?&]$/, '');

        const options: any = {
            observe: 'response',
            responseType: 'json',
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
        };

        return this.http.request('get', url, options).toPromise()
            .then(
                (result) => {
                    return result;
                }, (err) => {
                    return err;
                }
            );

        // return this.http.request('get', url, options)
        // .pipe(
        //     mergeMap((response: any) => {
        //         return this.processCurrentLoginInformation(<any>response);
        //     })
        // )
        // .pipe(
        //     catchError(
        //         (response: any) => {
        //             if (response instanceof HttpResponseBase) {
        //                 try {
        //                     return this.processCurrentLoginInformation(<any>response);
        //                 } catch (e) {
        //                     return <Observable<CurrentLoginInformationVwm>><any>throwError(e);
        //                 }
        //             } else {
        //                 return <Observable<CurrentLoginInformationVwm>><any>throwError(response);
        //             }
        //         }
        //     )
        // );
    }

    protected processCurrentLoginInformationAsync(response: HttpResponseBase): Promise<any> {
        const status = response.status;
        const responseResult = response instanceof HttpResponse ? response.body :
        (<any>response).error ? (<any>response).error : undefined;

        if (status === 200) {
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

    protected processCurrentLoginInformation(response: HttpResponseBase): Observable<CurrentLoginInformationVwm> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        const headers: any = {};
        if (response.headers) {
            for (const key of response.headers.keys()) {
                headers[key] = response.headers.get(key);
            }
        };

        if (status === 200) {
            return blobToText(responseBlob).pipe(
                mergeMap(responseText => {
                    let result200: any = null;
                    const resultData200 = responseText === '' ? null : JSON.parse(responseText, this.jsonParseReviver);
                    result200 = resultData200 ? CurrentLoginInformationVwm.fromJS(resultData200) : new CurrentLoginInformationVwm();
                    return of(result200);
                }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(
                mergeMap(_responseText => {
                    return throwError('An unexpected server error occurred.');
                })
            );
        }
        return of<CurrentLoginInformationVwm>(<any>null);
    }
}

function blobToText(blob: any): Observable<string> {
    return new Observable<string>((observer: any) => {
        if (!blob) {
            observer.next('');
            observer.complete();
        } else {
            const reader = new FileReader();
            reader.onload = function () {
                observer.next(this.result);
                observer.complete();
            }
            reader.readAsText(blob);
        }
    });
}
