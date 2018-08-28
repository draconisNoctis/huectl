import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IScene } from 'node-hue-api';
import { select, Store } from '@ngrx/store';
import { switchMap } from 'rxjs/operators';
import { HueState, selectHueApi } from './+state/hue.reducer';

@Injectable({
    providedIn: 'root'
})
export class ScenesService {
    constructor(protected readonly http : HttpClient,
                protected readonly store : Store<HueState>) {}
    
    getScenes() {
        return this.store.pipe(
            select(selectHueApi),
            switchMap(({ bridge, account }) => this.http.get<IScene[]>(`/api/bridge/${bridge}/${account}/scenes`))
        )
    }
}
