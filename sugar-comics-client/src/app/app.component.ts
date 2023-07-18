import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    isHamburgerMenuOpen: boolean = false;

    hamburgerMenuClick() {
        this.isHamburgerMenuOpen = !this.isHamburgerMenuOpen;
    }
}
