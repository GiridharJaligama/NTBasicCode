import { Component, OnInit , Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DemoService } from '../../../login/http-service';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    pushRightClass: string = 'push-right';
    pushToggleSidebarFullscreen: string  = 'hide-sidebar' ;
    User: string ;
    // @Input() types: Array<any> = [];
    // @Input() label ;
    constructor(private translate: TranslateService, public router: Router , private _demoService: DemoService) {

        this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de', 'zh-CHS']);
        this.translate.setDefaultLang('en');
        const browserLang = this.translate.getBrowserLang();
        this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de|zh-CHS/) ? browserLang : 'en');
        this.User = window.atob(sessionStorage.getItem('username')) ;
        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });
    }

    ngOnInit() {

    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }
    toggleSidebarFullScreen() {
        if (
            window.innerWidth <= 992
        ) {
            this.toggleSidebar();
        } else {
            const dom: any = document.querySelector('body');
            dom.classList.toggle(this.pushToggleSidebarFullscreen);
        }
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    onLoggedout() {
        sessionStorage.removeItem('isLoggedin');
        sessionStorage.clear();
        sessionStorage.clear();
    }

    changeLang(language: string) {
        this.translate.use(language);
    }
}
