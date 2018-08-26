import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILightGroup } from 'node-hue-api';
import { select, Store } from '@ngrx/store';
import { switchMap } from 'rxjs/operators';
import { HueState, selectHueApi } from './+state/hue.reducer';

@Injectable({
    providedIn: 'root'
})
export class GroupsService {
    constructor(protected readonly http : HttpClient,
                protected readonly store : Store<HueState>) {}
    
    getGroups(type?: string) {
        return this.store.pipe(
            select(selectHueApi),
            switchMap(({ bridge, account }) => this.http.get<ILightGroup[]>(`/api/bridge/${bridge}/${account}/groups`, {
                params: {
                    ...(type ? { type } : {})
                }
            }))
        )
    }
    
    on(group : string) {
        return this.store.pipe(
            select(selectHueApi),
            switchMap(({ bridge, account }) => this.http.put<boolean>(`/api/bridge/${bridge}/${account}/groups/${group}/on`, ''))
        )
    }
    
    off(group : string) {
        return this.store.pipe(
            select(selectHueApi),
            switchMap(({ bridge, account }) => this.http.put<boolean>(`/api/bridge/${bridge}/${account}/groups/${group}/off`, ''))
        )
    }
}
