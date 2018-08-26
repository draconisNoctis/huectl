import { Body, Get, JsonController, Param, Put, QueryParam } from '@neoskop/nem';
import { HueApi, lightState } from 'node-hue-api';
import { Hue } from '../decorators/hue.decorator';

@JsonController()
export class GroupsController {
    
    @Get('/')
    async list(@Hue() api : HueApi,
               @QueryParam('type') type?: string) {
        let groups = await api.getGroups();
        
        if(type) {
            groups = groups.filter(group => group.type === type);
        }
        
        return groups;
    }
    
    @Get('/:id')
    group(@Hue() api : HueApi,
          @Param('id') id : string) {
        return api.getGroup(id);
    }
    
    @Get('/:id/lights')
    async lights(@Hue() api : HueApi,
           @Param('id') id : string) {
        const group = await api.getGroup(id);
        
        return group.lights ? Promise.all(group.lights.map(light => api.lightStatus(light))) : [];
    }
    
    @Put('/:id/state')
    setGroupState(@Hue() api : HueApi,
                  @Param('id') id : string,
                  @Body() body : Object) {
        return api.setGroupLightState(id, lightState.create(body));
    }
    
    @Put('/:id/:value')
    switchGroup(@Hue() api : HueApi,
                  @Param('id') id : string,
                  @Param('value', { validate: v => 'on' === v || 'off' === v }) value : 'on'|'off') {
        return api.setGroupLightState(id, lightState.create()[value]());
    }
    
    @Put('/:id/scene/:scene/activate')
    activateScene(@Hue() api : HueApi,
                  @Param('id') id : string,
                  @Param('scene') scene : string) {
        return api.activateScene(scene, id);
    }
}
