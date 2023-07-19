import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExploreComponent } from './pages/explore/explore.component';
import { SubmitComponent } from './pages/submit/submit.component';
import { ErrorComponent } from './pages/error/error.component';

const routes: Routes = [
    { path: '', redirectTo: 'explore', pathMatch: 'full' },
    { path: 'home', redirectTo: '/explore', pathMatch: 'full' },
    {
        path: 'explore',
        title: 'SugarComics - Explore page',
        component: ExploreComponent,
    },
    {
        path: 'submit',
        title: 'SugarComics - Submit page',
        component: SubmitComponent,
    },
    { path: '**', title: 'Page not found', component: ErrorComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
