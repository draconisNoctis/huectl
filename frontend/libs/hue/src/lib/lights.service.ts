import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILight } from 'node-hue-api';
import { Store } from '@ngrx/store';
import { switchMap } from 'rxjs/operators';
import { HueState, selectHueApi } from './+state/hue.reducer';

@Injectable({
    providedIn: 'root'
})
export class LightsService {
    constructor(protected readonly http : HttpClient,
                protected readonly store : Store<HueState>) {}
    
    getLights() {
        return this.store.select(selectHueApi).pipe(
            switchMap(({ bridge, account }) => this.http.get<ILight[]>(`/api/bridge/${bridge}/${account}/lights`))
        )
    }
}
