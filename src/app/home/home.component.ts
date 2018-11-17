import { Component } from '@angular/core';
import { SessionProxy } from '@shared/service-proxies/session.proxy';

@Component({
    selector: 'app-home-component',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.less']
})
export class HomeComponent {
    constructor(sessionProxy: SessionProxy) {
    }
}
