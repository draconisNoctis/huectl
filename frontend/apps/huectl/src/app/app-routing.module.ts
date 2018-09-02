import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GroupsComponent } from './groups/groups.component';
import { GroupLightsComponent } from './group-lights/group-lights.component';

const routes : Routes = [
    { path: '', component: DashboardComponent },
    { path: 'rooms', component: GroupsComponent, data: { type: 'Room' } },
    { path: 'rooms/:id', component: GroupLightsComponent, data: { type: 'Room' } },
    { path: 'light-groups', component: GroupsComponent, data: { type: 'LightGroup' } },
    { path: 'light-groups/:id', component: GroupLightsComponent, data: { type: 'LightGroup' } }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {
}
