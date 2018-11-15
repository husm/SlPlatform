import { Component, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { RegisterInput } from '@shared/models/register.model';
import { RegisterService } from './register.service';
import { faPhone, faLock , faMailBulk} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
    templateUrl: './register.component.html'
})
export class RegisterComponent extends AppComponentBase {
    inputModel: RegisterInput = new RegisterInput();
    iconPhone = faPhone;
    iconMessage = faMailBulk;
    iconPassword = faLock;

    constructor(
        injector: Injector,
        private router: Router,
        private registerService: RegisterService
    ) {
        super(injector);
    }

    sendVerifyCode(event) {
        this.registerService.sendVerifyCode(this.inputModel.phoneNumber);
    }

    save(): void {
        this.registerService.register(this.inputModel);
    }

    goBack(event): void {
        this.router.navigate(['account/login']);
    }
}
