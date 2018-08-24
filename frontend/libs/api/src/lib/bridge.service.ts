import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUpnpSearchResultItem } from 'node-hue-api';
import { Observable } from 'rxjs/Observable';

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
    
    register(host : string) {
        return this.http.get<string>(`/api/bridge/${host}/register`);
    }
}
