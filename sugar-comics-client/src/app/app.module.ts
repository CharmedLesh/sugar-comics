import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExploreComponent } from './pages/explore/explore.component';
import { SubmitComponent } from './pages/submit/submit.component';
import { ErrorComponent } from './pages/error/error.component';

@NgModule({
    declarations: [AppComponent, ExploreComponent, SubmitComponent, ErrorComponent],
    imports: [BrowserModule, AppRoutingModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
