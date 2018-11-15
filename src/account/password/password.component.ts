import { Component, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { RegisterInput } from '@shared/models/register.model';
import { PasswordService } from './password.service';
import { faPhone, faLock , faMailBulk} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
    templateUrl: './password.component.html'
})
export class PasswordComponent extends AppComponentBase {
    inputModel: RegisterInput = new RegisterInput();
    iconPhone = faPhone;
    iconMessage = faMailBulk;
    iconPassword = faLock;

    constructor(
        injector: Injector,
        private router: Router,
        private passwordService: PasswordService
    ) {
        super(injector);
    }

    sendVerifyCode(event) {
        this.passwordService.sendVerifyCode(this.inputModel.phoneNumber);
    }

    save(): void {
        this.passwordService.register(this.inputModel);
    }

    goBack(event): void {
        this.router.navigate(['account/login']);
    }
}
