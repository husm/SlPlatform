import { ApplicationInfoDto, UserLoginInfoDto, TenantLoginInfoDto } from '@shared/models';

export interface ICurrentLoginInformationVwm {
    application: ApplicationInfoDto | undefined;
    user: UserLoginInfoDto | undefined;
    tenant: TenantLoginInfoDto | undefined;
}

export class CurrentLoginInformationVwm implements ICurrentLoginInformationVwm {
    application: ApplicationInfoDto | undefined;
    user: UserLoginInfoDto | undefined;
    tenant: TenantLoginInfoDto | undefined;

    static fromJS(data: any): CurrentLoginInformationVwm {
        data = typeof data === 'object' ? data : {};
        const result = new CurrentLoginInformationVwm();
        result.init(data);
        return result;
    }

    constructor(data?: ICurrentLoginInformationVwm) {
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
            this.application = data['application'] ? ApplicationInfoDto.fromJS(data['application']) : <any>undefined;
            this.user = data['user'] ? UserLoginInfoDto.fromJS(data['user']) : <any>undefined;
            this.tenant = data['tenant'] ? TenantLoginInfoDto.fromJS(data['tenant']) : <any>undefined;
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['application'] = this.application ? this.application.toJSON() : <any>undefined;
        data['user'] = this.user ? this.user.toJSON() : <any>undefined;
        data['tenant'] = this.tenant ? this.tenant.toJSON() : <any>undefined;
        return data;
    }

    clone(): CurrentLoginInformationVwm {
        const json = this.toJSON();
        const result = new CurrentLoginInformationVwm();
        result.init(json);
        return result;
    }
}
