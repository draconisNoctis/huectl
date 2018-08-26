import { Body, Get, JsonController, Param, Put } from '@neoskop/nem';
import { HueApi, lightState } from 'node-hue-api';
import { Hue } from '../decorators/hue.decorator';

@JsonController()
export class LightsController {
    
    @Get('/')
    async list(@Hue() api : HueApi) {
        return (await api.getLights()).lights;
    }
    
    @Get('/:id')
    @Get('/:id/state')
    light(@Hue() api : HueApi,
          @Param('id') id : string) {
        return api.lightStatus(id);
    }
    
    @Put('/:id')
    @Put('/:id/state')
    setLightState(@Hue() api : HueApi,
                  @Param('id') id : string,
                  @Body() body : Object) {
        return api.setLightState(id, lightState.create(body));
    }
    
    @Put('/:id/:value')
    switchLight(@Hue() api : HueApi,
                @Param('id') id : string,
                @Param('value', { validate: v => 'on' === v || 'off' === v }) value : 'on' | 'off') {
        return api.setLightState(id, lightState.create()[ value ]());
    }
}
