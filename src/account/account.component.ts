import { Component, ViewEncapsulation, OnInit, Injector, ElementRef, Renderer2 } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';

@Component({
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.less'],
    encapsulation: ViewEncapsulation.None
})
export class AccountComponent extends AppComponentBase implements OnInit {
    public constructor(
        injector: Injector,
        private el: ElementRef,
        private renderer: Renderer2
    ) {
        super(injector);
    }

    ngOnInit(): void {
        // $('body').attr('class', 'login-page');
        const parentEl = this.el.nativeElement.offsetParent;
        this.renderer.setAttribute(parentEl, 'class', 'login-page');
        // console.log('------------------', this.el.nativeElement.offsetParent);
    }
}
