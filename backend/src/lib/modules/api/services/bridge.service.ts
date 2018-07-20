import { Injectable } from '@angular/core';
import { HueApi } from 'node-hue-api';

@Injectable({ providedIn: 'root' })
export class BridgeService {
    protected readonly bridges = new Map<string, HueApi>();
    protected defaultBridge? : HueApi;
    
    getDefaultBridge() {
        return this.defaultBridge;
    }
    
    setDefaultBridge(bridge : HueApi) {
        this.defaultBridge = bridge;
    }
    
    setBridge(host : string, bridge : HueApi) {
        this.bridges.set(host, bridge);
    }
    
    getBridge(host? : string) {
        return host ? this.bridges.get(host) : this.getDefaultBridge();
    }
    
    deleteBridge(host : string) {
        this.bridges.delete(host);
    }
    
    hasBridge(host : string) {
        return this.bridges.has(host);
    }
}
