import { AppConsts } from '@app/AppConsts';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Injectable } from '@angular/core';
import { AuthUtilService } from '@shared/util/auth-util.service';

@Injectable()
export class AppPreBootstrap {

    constructor(
        private _httpClient: HttpClient,
        private _authUtilService: AuthUtilService
    ) {
    }

    /**
     * Run pre bootstrap for the application, and setup the application & user configuration
     * @param appRootUrl Application root url
     */
    public run(appRootUrl): Promise<any> {
        return this.runAsync(appRootUrl).then((result) => {
            console.log('----- AppPreBootstrap: run', result);
            return result;
        });
    }

    private async runAsync(appRootUrl): Promise<any> {
        const appConfig = await<any> this.getApplicationConfigAsync(appRootUrl);
        const userConifg = await<any> this.getUserConfigurationAsync(appRootUrl);
        return {
            appConfig,
            userConifg
        };
    }

    /**
     * Get the Application configuration informations
     * @param appRootUrl Application root url
     */
    private getApplicationConfigAsync(appRootUrl: string): Promise<any> {
        const url = appRootUrl + 'assets/' + environment.appConfig;
        const promiseResult = this._httpClient.get(url).toPromise()
            .then((result) => {
                AppConsts.remoteServiceBaseUrl = (<any>result).remoteServiceBaseUrl;
                AppConsts.appBaseUrl = (<any>result).appBaseUrl;

                return result;
            }, (err) => {
                console.log('----- error', err);
            });
        return promiseResult;
    }

    /**
     * Get the user configuration informations
     * @param appRootUrl Application root url
     */
    private getUserConfigurationAsync(appRootUrl: string): Promise<any> {
        const url = `${AppConsts.remoteServiceBaseUrl}/AbpUserConfiguration/GetAll`;
        const header = new HttpHeaders({
            Authorization: 'Bearer ' + this._authUtilService.getAuthToken(),
        })
        const promiseResult = this._httpClient.get(url, {
            headers: header
        }).toPromise()
            .then((result) => {
                return result;
            }, (err) => {
                console.log('------ getUserConfigurationAsync:error', err);
            });
        return promiseResult;
    }
}
