import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginService } from './login/login.service';
import { RegisterService } from './register/register.service';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { PasswordComponent } from './password/password.component';
import { PasswordService } from './password/password.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        AccountRoutingModule,
        FontAwesomeModule,
        NgZorroAntdModule,
    ],
    declarations: [
        AccountComponent,
        LoginComponent,
        RegisterComponent,
        PasswordComponent
    ],
    providers: [
        { provide: NZ_I18N, useValue: zh_CN },
        LoginService,
        RegisterService,
        PasswordService
    ]
})
export class AccountModule {
}
