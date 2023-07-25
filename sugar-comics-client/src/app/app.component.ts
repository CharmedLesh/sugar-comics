import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    isHamburgerMenuOpen: boolean = false;

    isSignInModalOpen: boolean = false;
    isSignUpModalOpen: boolean = false;

    hamburgerMenuClick() {
        this.isHamburgerMenuOpen = !this.isHamburgerMenuOpen;
    }

    signInModalOpen() {
        this.isSignInModalOpen = !this.isSignInModalOpen;
    }

    signUpModalOpen() {
        this.isSignUpModalOpen = !this.isSignUpModalOpen;
    }

    closeAuthModal() {
        if (this.isSignInModalOpen) {
            this.isSignInModalOpen = false;
        }

        if (this.isSignUpModalOpen) {
            this.isSignUpModalOpen = false;
        }
    }
}
