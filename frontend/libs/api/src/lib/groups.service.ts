import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILightGroup } from 'node-hue-api';
import { ApiState } from './+state/api.reducer';
import { Store } from '@ngrx/store';
import { switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class GroupsService {
    constructor(protected readonly http : HttpClient,
                protected readonly store : Store<ApiState>) {}
    
    getGroups(type?: string) {
        return this.store.select('api').pipe(
            switchMap(({ bridge, account }) => this.http.get<ILightGroup[]>(`/api/bridge/${bridge}/${account}/groups`, {
                params: { type }
            }))
        )
    }
}
