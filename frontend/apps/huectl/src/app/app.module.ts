import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule, TRANSLATIONS, TRANSLATIONS_FORMAT } from '@angular/core';
import { AppComponent } from './app.component';
import { NxModule } from '@nrwl/nx';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { ActionReducer, compose, StoreModule } from '@ngrx/store';
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
import { HueModule } from '@huectl/hue';
import { ConfigurationDialogComponent } from './configuration-dialog/configuration-dialog.component';
import { LoadingModule } from '@huectl/loading';
import { HeaderComponent } from './header/header.component';
import { HueIconsModule } from './hue-icons/hue-icons.module';
import { GroupsComponent } from './groups/groups.component';
import { GroupLightsComponent } from './group-lights/group-lights.component';
import { UtilsModule } from '@huectl/utils';
import { menuReducer } from './+state/menu.reducer';
import { I18n } from '@ngx-translate/i18n-polyfill';

const storeReducer = localStorageSync({ keys: [
        'config',
        { hue: [ 'api' ] }
    ], rehydrate: true });
const devReducer = compose(storeFreeze, storeReducer);
const prodReducer = storeReducer;

export function metaReducer(action : ActionReducer<any, any>) : any {
    if(!environment.production) {
        return devReducer(action);
    } else {
        return prodReducer(action);
    }
}

export function translationFactory(locale : string) {
    locale = (locale || 'en').toLowerCase().split(/[-_]/)[0];
    return require(`raw-loader!../../locale/${locale}.xtb`);
}

@NgModule({
    declarations   : [ AppComponent, DashboardComponent, SetupDialogComponent, ConfigurationDialogComponent, GroupsComponent, HeaderComponent, GroupLightsComponent ],
    imports        : [
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
            setup : setupReducer,
            menu: menuReducer
        }, {
            metaReducers: [
                metaReducer
            ]
        }),
        StoreRouterConnectingModule.forRoot({
            stateKey: 'router'
        }),
        EffectsModule.forRoot([ ConfigEffects, RouterEffects, SetupEffects ]),
        ReactiveFormsModule,
        HueModule,
        LoadingModule,
        HueIconsModule,
        UtilsModule,
    ],
    providers      : [
        I18n,
        { provide: TRANSLATIONS_FORMAT, useValue: 'xtb' },
        {
            provide: TRANSLATIONS,
            useFactory: translationFactory,
            deps: [ LOCALE_ID ]
        }
    ],
    bootstrap      : [ AppComponent ],
    entryComponents: [ SetupDialogComponent, ConfigurationDialogComponent ]
})
export class AppModule {
}
