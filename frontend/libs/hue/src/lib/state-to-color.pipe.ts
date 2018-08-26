import { Pipe, PipeTransform } from '@angular/core';

export interface IState {
    on : boolean;
    bri : number;
    hue? : number;
    sat? : number;
    ct?: number;
    colormode: 'ct' | 'xy';
}

@Pipe({
    name: 'stateToColor'
})
export class StateToColorPipe implements PipeTransform {
    
    transform(state : IState) : any {
        if(!state) {
            return 'rgba(0,0,0,0)';
        } else if(!state.on) {
            return 'rgb(0,0,0)';
        } else if(state.colormode === 'ct') {
            return 'rgb(255,255,255)'
        } else if(undefined === state.hue || undefined === state.sat) {
            return `rgb(${state.bri},${state.bri},${state.bri})`
        }
        
        const H = state.hue / 65535 * 360;
        const S = state.sat / 255;
        const V = state.bri / 255;
        
        const h = H / 60 | 0;
        const f = H / 60  - h;
        const p = V * (1 - S);
        const q = V * (1 - S * f);
        const t = V * (1 - S * (1 - f));
    
        let R = 0, G = 0, B = 0;
        
        if(H < 60) {
            R = V;
            G = t;
            B = p;
        } else if(H < 120) {
            R = q;
            G = V;
            B = p;
        } else if(H < 180) {
            R = p;
            G = V;
            B = t;
        } else if(H < 240) {
            R = p;
            G = q;
            B = V;
        } else if(H < 300) {
            R = t;
            G = p;
            B = V;
        } else {
            R = V;
            G = p;
            B = q;
        }
        
        return `rgb(${R*255|0},${G*255|0},${B*255|0})`;
    }
    
}
