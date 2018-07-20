import { Get, JsonController, Param, Put } from '@neoskop/nem';
import { HueApi } from 'node-hue-api';
import { Hue } from '../decorators/hue.decorator';

@JsonController()
export class ScenesController {
    
    @Get('/')
    list(@Hue() api : HueApi) {
        return api.getScenes();
    }
    
    @Get('/:id')
    scene(@Hue() api : HueApi,
          @Param('id') id : string) {
        return api.getScene(id);
    }
    
    @Put('/:id/activate')
    activateScene(@Hue() api : HueApi,
                  @Param('id') id : string) {
        return api.activateScene(id);
    }
}
