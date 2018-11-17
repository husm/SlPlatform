export interface ITenantLoginInfoDto {
    tenancyName: string | undefined;
    name: string | undefined;
    id: number | undefined;
}

export class TenantLoginInfoDto implements ITenantLoginInfoDto {
    tenancyName: string | undefined;
    name: string | undefined;
    id: number | undefined;

    static fromJS(data: any): TenantLoginInfoDto {
        data = typeof data === 'object' ? data : {};
        const result = new TenantLoginInfoDto();
        result.init(data);
        return result;
    }

    constructor(data?: ITenantLoginInfoDto) {
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
            this.tenancyName = data['tenancyName'];
            this.name = data['name'];
            this.id = data['id'];
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['tenancyName'] = this.tenancyName;
        data['name'] = this.name;
        data['id'] = this.id;
        return data;
    }

    clone(): TenantLoginInfoDto {
        const json = this.toJSON();
        const result = new TenantLoginInfoDto();
        result.init(json);
        return result;
    }
}
