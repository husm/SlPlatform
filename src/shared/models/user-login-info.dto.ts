export interface IUserLoginInfoDto {
    name: string | undefined;
    surname: string | undefined;
    userName: string | undefined;
    emailAddress: string | undefined;
    id: number | undefined;
}

export class UserLoginInfoDto implements IUserLoginInfoDto {
    name: string | undefined;
    surname: string | undefined;
    userName: string | undefined;
    emailAddress: string | undefined;
    id: number | undefined;

    static fromJS(data: any): UserLoginInfoDto {
        data = typeof data === 'object' ? data : {};
        const result = new UserLoginInfoDto();
        result.init(data);
        return result;
    }

    constructor(data?: IUserLoginInfoDto) {
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
            this.name = data['name'];
            this.surname = data['surname'];
            this.userName = data['userName'];
            this.emailAddress = data['emailAddress'];
            this.id = data['id'];
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['name'] = this.name;
        data['surname'] = this.surname;
        data['userName'] = this.userName;
        data['emailAddress'] = this.emailAddress;
        data['id'] = this.id;
        return data;
    }

    clone(): UserLoginInfoDto {
        const json = this.toJSON();
        const result = new UserLoginInfoDto();
        result.init(json);
        return result;
    }
}
