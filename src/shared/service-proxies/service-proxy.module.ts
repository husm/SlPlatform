import { NgModule } from '@angular/core';
import { SessionProxy } from './session.proxy';
import { AuthProxy } from './auth.proxy';
import { AccountProxy } from './account.proxy';

@NgModule({
    providers: [
        AccountProxy,
        AuthProxy,
        SessionProxy
    ]
})
export class ServiceProxyModule { }
