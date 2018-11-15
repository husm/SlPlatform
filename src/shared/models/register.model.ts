export interface IRegisterInput {
    phoneNumber: string;
    password: string;
    verifyCode: string;
}

export class RegisterInput implements IRegisterInput {
    phoneNumber: string;
    password: string;
    verifyCode: string;

    static fromJS(data: any): RegisterInput {
        data = typeof data === 'object' ? data : {};
        const result = new RegisterInput();
        result.init(data);
        return result;
    }

    constructor(data?: IRegisterInput) {
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
            this.phoneNumber = data['phoneNumber'];
            this.password = data['password'];
            this.verifyCode = data['verifyCode'];
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['phoneNumber'] = this.phoneNumber;
        data['password'] = this.password;
        data['verifyCode'] = this.verifyCode;
        return data;
    }

    clone(): RegisterInput {
        const json = this.toJSON();
        const result = new RegisterInput();
        result.init(json);
        return result;
    }
}

export interface IRegisterOutput {
    accessToken: string | undefined;
    encryptedAccessToken: string | undefined;
    expireInSeconds: number | undefined;
    userId: number | undefined;
}

export class RegisterOutput implements IRegisterOutput {
    accessToken: string | undefined;
    encryptedAccessToken: string | undefined;
    expireInSeconds: number | undefined;
    userId: number | undefined;

    static fromJS(data: any): RegisterOutput {
        data = typeof data === 'object' ? data : {};
        const result = new RegisterOutput();
        result.init(data);
        return result;
    }

    constructor(data?: IRegisterOutput) {
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

    clone(): RegisterOutput {
        const json = this.toJSON();
        const result = new RegisterOutput();
        result.init(json);
        return result;
    }
}
