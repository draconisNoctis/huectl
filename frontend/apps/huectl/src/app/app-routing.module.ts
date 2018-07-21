import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes : Routes = [
    { path: '', component: DashboardComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    declarations: [ DashboardComponent ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {
}
