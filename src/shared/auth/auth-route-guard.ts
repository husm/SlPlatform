import { Injectable } from '@angular/core';
import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    CanActivateChild
} from '@angular/router';
import { AppSessionService } from '@shared/session/app-session.service';

@Injectable()
export class AppRouteGuard implements CanActivate, CanActivateChild {

    constructor(
        private _router: Router,
        private _sessionService: AppSessionService
    ) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        console.log('------ AppRouteGuard:canActivate', route, state);
        if (!this._sessionService.user) {
            this._router.navigate(['/account/login']);
            return false;
        }
        return true;
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        console.log('------ AppRouteGuard:canActivateChild', childRoute, state);
        return true;
    }
}
