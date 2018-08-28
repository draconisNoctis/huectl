import { Pipe, PipeTransform } from '@angular/core';
import { Color } from '@huectl/utils';

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
        
        const c = Color.fromHSV(H, S, V);
        
        return `rgb(${c.R},${c.G},${c.B})`;
    }
    
}
