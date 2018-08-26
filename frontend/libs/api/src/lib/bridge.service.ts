import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUpnpSearchResultItem } from 'node-hue-api';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class BridgeService {
    constructor(protected readonly http: HttpClient) {}

    search(timeout?: number) {
        return this.http.get<IUpnpSearchResultItem[]>('/api/bridge/search', {
            params: {
                ...(timeout ? { timeout: timeout.toString() } : {})
            }
        });
    }
    
    register(_host : string) {
        return of("wwDrY4zCLgpzB1EZKoPEnCWLohOojH3CSV85QGIK").pipe(delay(500))
        // return this.http.get<string>(`/api/bridge/${host}/register`);
    }
}
