import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILightGroup, lightState } from 'node-hue-api';
import { select, Store } from '@ngrx/store';
import { filter, first, switchMap } from 'rxjs/operators';
import { HueState, selectHueApi } from './+state/hue.reducer';
import { Observable } from 'rxjs/Observable';
import { ApiData } from '@huectl/hue';
import State = lightState.State;

@Injectable({
    providedIn: 'root'
})
export class GroupsService {
    constructor(protected readonly http : HttpClient,
                protected readonly store : Store<HueState>) {}
    
    get apiConfig() : Observable<ApiData> {
        return this.store.pipe(
            select(selectHueApi),
            first(),
            filter(s => !!(s && s.bridge && s.account))
        )
    }
    
    getGroups(type?: string) {
        return this.apiConfig.pipe(
            switchMap(({ bridge, account }) => this.http.get<ILightGroup[]>(`/api/bridge/${bridge}/${account}/groups`, {
                params: {
                    ...(type ? { type } : {})
                }
            }))
        )
    }
    
    on(group : string) {
        return this.apiConfig.pipe(
            switchMap(({ bridge, account }) => this.http.put<boolean>(`/api/bridge/${bridge}/${account}/groups/${group}/on`, ''))
        )
    }
    
    off(group : string) {
        return this.apiConfig.pipe(
            switchMap(({ bridge, account }) => this.http.put<boolean>(`/api/bridge/${bridge}/${account}/groups/${group}/off`, ''))
        )
    }
    
    state(group : string, state : { [P in keyof State]?: any }) {
        return this.apiConfig.pipe(
            switchMap(({ bridge, account }) => this.http.put<boolean>(`/api/bridge/${bridge}/${account}/groups/${group}/state`, JSON.stringify(state), {
                headers: {
                    'Content-Type': 'application/json'
                }
            }))
        )
    }
    
    scene(group : string, scene : string) {
        return this.apiConfig.pipe(
            switchMap(({ bridge, account }) => this.http.put<boolean>(`/api/bridge/${bridge}/${account}/groups/${group}/scene/${scene}/activate`, ''))
        )
    }
}
