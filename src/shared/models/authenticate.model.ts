export interface IAuthenticateModel {
    userNameOrEmailAddress: string;
    password: string;
    rememberClient: boolean | undefined;
}

export class AuthenticateModel implements IAuthenticateModel {
    userNameOrEmailAddress: string;
    password: string;
    rememberClient: boolean;

    static fromJS(data: any): AuthenticateModel {
        data = typeof data === 'object' ? data : {};
        const result = new AuthenticateModel();
        result.init(data);
        return result;
    }

    constructor(data?: IAuthenticateModel) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.userNameOrEmailAddress = data['userNameOrEmailAddress'];
            this.password = data['password'];
            this.rememberClient = data['rememberClient'];
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['userNameOrEmailAddress'] = this.userNameOrEmailAddress;
        data['password'] = this.password;
        data['rememberClient'] = this.rememberClient;
        return data;
    }

    clone(): AuthenticateModel {
        const json = this.toJSON();
        const result = new AuthenticateModel();
        result.init(json);
        return result;
    }
}

export interface IAuthenticateResultModel {
    accessToken: string | undefined;
    encryptedAccessToken: string | undefined;
    expireInSeconds: number | undefined;
    userId: number | undefined;
}

export class AuthenticateResultModel implements IAuthenticateResultModel {
    accessToken: string | undefined;
    encryptedAccessToken: string | undefined;
    expireInSeconds: number | undefined;
    userId: number | undefined;

    static fromJS(data: any): AuthenticateResultModel {
        data = typeof data === 'object' ? data : {};
        const result = new AuthenticateResultModel();
        result.init(data);
        return result;
    }

    constructor(data?: IAuthenticateResultModel) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.accessToken = data['accessToken'];
            this.encryptedAccessToken = data['encryptedAccessToken'];
            this.expireInSeconds = data['expireInSeconds'];
            this.userId = data['userId'];
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['accessToken'] = this.accessToken;
        data['encryptedAccessToken'] = this.encryptedAccessToken;
        data['expireInSeconds'] = this.expireInSeconds;
        data['userId'] = this.userId;
        return data;
    }

    clone(): AuthenticateResultModel {
        const json = this.toJSON();
        const result = new AuthenticateResultModel();
        result.init(json);
        return result;
    }
}
