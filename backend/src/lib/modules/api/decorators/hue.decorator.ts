import { AbstractParam, Annotator } from '@neoskop/nem';
import { Request } from 'express';
import { HueApi } from 'node-hue-api';

export interface HueDecorator {
    () : any;
    new () : Hue;
}

export interface Hue extends AbstractParam<Hue> {

}

export const Hue : HueDecorator = Annotator.makeParamDecorator(
    'Hue',
    () => ({
        resolve: (_options : Hue, req : Request) => {
            return new HueApi(req.params.host, req.params.username);
        }
    }),
    AbstractParam
);
