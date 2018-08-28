import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILight, lightState } from 'node-hue-api';
import { select, Store } from '@ngrx/store';
import { switchMap } from 'rxjs/operators';
import { HueState, selectHueApi } from './+state/hue.reducer';
import State = lightState.State;

@Injectable({
    providedIn: 'root'
})
export class LightsService {
    constructor(protected readonly http : HttpClient,
                protected readonly store : Store<HueState>) {}
    
    getLights() {
        return this.store.pipe(
            select(selectHueApi),
            switchMap(({ bridge, account }) => this.http.get<ILight[]>(`/api/bridge/${bridge}/${account}/lights`))
        )
    }
    
    on(light : string) {
        return this.store.pipe(
            select(selectHueApi),
            switchMap(({ bridge, account }) => this.http.put<boolean>(`/api/bridge/${bridge}/${account}/lights/${light}/on`, ''))
        )
    }
    
    off(light : string) {
        return this.store.pipe(
            select(selectHueApi),
            switchMap(({ bridge, account }) => this.http.put<boolean>(`/api/bridge/${bridge}/${account}/lights/${light}/off`, ''))
        )
    }
    
    state(light, state : { [P in keyof State]?: any }) {
        return this.store.pipe(
            select(selectHueApi),
            switchMap(({ bridge, account }) => this.http.put<boolean>(`/api/bridge/${bridge}/${account}/lights/${light}/state`, JSON.stringify(state), {
                headers: {
                    'Content-Type': 'application/json'
                }
            }))
        )
    }
}
