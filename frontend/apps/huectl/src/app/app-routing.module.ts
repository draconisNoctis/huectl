import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RoomsComponent } from './rooms/rooms.component';
import { RoomLightsComponent } from './room-lights/room-lights.component';

const routes : Routes = [
    { path: '', component: DashboardComponent },
    { path: 'rooms', component: RoomsComponent },
    { path: 'rooms/:id', component: RoomLightsComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {
}
