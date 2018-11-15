import { Component, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { LoginService } from './login.service';

@Component({
    templateUrl: './login.component.html',
    // styleUrls: ['./login.component.less']
})
export class LoginComponent extends AppComponentBase {
    iconPerson = faUser;
    iconPassword = faLock;

    constructor(
        injector: Injector,
        public loginService: LoginService
    ) {
        super(injector);
    }

    login(): void {
        console.log('------- login submit', this.loginService.authenticateModel);
        this.loginService.authenticate();
    }
}
