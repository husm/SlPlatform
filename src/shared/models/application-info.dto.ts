import * as moment from 'moment';

export interface IApplicationInfoDto {
    version: string | undefined;
    releaseDate: moment.Moment | undefined;
    features: { [key: string]: boolean; } | undefined;
}

export class ApplicationInfoDto implements IApplicationInfoDto {
    version: string | undefined;
    releaseDate: moment.Moment | undefined;
    features: { [key: string]: boolean; } | undefined;

    static fromJS(data: any): ApplicationInfoDto {
        data = typeof data === 'object' ? data : {};
        const result = new ApplicationInfoDto();
        result.init(data);
        return result;
    }

    constructor(data?: IApplicationInfoDto) {
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
            this.version = data['version'];
            this.releaseDate = data['releaseDate'] ? moment(data['releaseDate'].toString()) : <any>undefined;
            if (data['features']) {
                this.features = {};
                for (const key in data['features']) {
                    if (data['features'].hasOwnProperty(key)) {
                        this.features[key] = data['features'][key];
                    }
                }
            }
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['version'] = this.version;
        data['releaseDate'] = this.releaseDate ? this.releaseDate.toISOString() : <any>undefined;
        if (this.features) {
            data['features'] = {};
            for (const key in this.features) {
                if (this.features.hasOwnProperty(key)) {
                    data['features'][key] = this.features[key];
                }
            }
        }
        return data;
    }

    clone(): ApplicationInfoDto {
        const json = this.toJSON();
        const result = new ApplicationInfoDto();
        result.init(json);
        return result;
    }
}
