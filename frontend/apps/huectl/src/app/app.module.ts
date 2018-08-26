import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NxModule } from '@nrwl/nx';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { MetaReducer, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { storeFreeze } from 'ngrx-store-freeze';
import { configReducer } from './+state/config.reducer';
import { ConfigEffects } from './+state/config.effects';
import { localStorageSync } from 'ngrx-store-localstorage';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { RouterEffects } from './+state/router.effects';
import { SetupDialogComponent } from './setup-dialog/setup-dialog.component';
import { SetupEffects } from './+state/setup.effects';
import { setupReducer } from './+state/setup.reducer';
import { ReactiveFormsModule } from '@angular/forms';
import { roomsReducer } from './+state/rooms.reducer';
import { ApiModule } from '@huectl/api';
import { ConfigurationDialogComponent } from './configuration-dialog/configuration-dialog.component';
import { RoomsEffects } from './+state/rooms.effects';
import { LoadingModule } from '@huectl/loading';

const metaReducers : MetaReducer<any, any>[] = [];

if(!environment.production) {
    metaReducers.push(storeFreeze);
}

metaReducers.push(localStorageSync({ keys: [ 'api', 'config' ], rehydrate: true, storage: localStorage }));

@NgModule({
    declarations: [ AppComponent, DashboardComponent, SetupDialogComponent, ConfigurationDialogComponent ],
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        NxModule.forRoot(),
        AppRoutingModule,
        FlexLayoutModule,
        MaterialModule,
        HttpClientModule,
        !environment.production ? StoreDevtoolsModule.instrument() : [],
        StoreModule.forRoot({
            config: configReducer,
            setup: setupReducer,
            rooms: roomsReducer
        }, {
            metaReducers
        }),
        StoreRouterConnectingModule.forRoot({
            stateKey: 'router'
        }),
        EffectsModule.forRoot([ ConfigEffects, RouterEffects, SetupEffects, RoomsEffects ]),
        ReactiveFormsModule,
        ApiModule,
        LoadingModule
    ],
    providers   : [ ConfigEffects ],
    bootstrap   : [ AppComponent ],
    entryComponents: [ SetupDialogComponent, ConfigurationDialogComponent ]
})
export class AppModule {
}
