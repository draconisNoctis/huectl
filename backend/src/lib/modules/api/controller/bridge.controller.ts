import { Get, JsonController, Param, QueryParam } from '@neoskop/nem';
import { HueApi, upnpSearch } from 'node-hue-api';

@JsonController()
export class BridgeController {
    
    @Get('/search')
    search(@QueryParam('timeout', { type: 'int' }) timeout = 5000) {
        return upnpSearch(timeout);
    }
    
    @Get('/:host/register')
    async register(@Param('host') host : string,
                   @QueryParam('description') description: string = 'huectl - API',
                   @QueryParam('timeout', { type: 'int' }) timeout = 60000) {
        const api = new HueApi();
        const start = Date.now();
        while(true) {
            try {
                const result = await api.createUser(host, description);
    
                return result;
            } catch(e) {
                if(Date.now() >= start + timeout || e.message !== 'link button not pressed') {
                    throw e;
                }
            }
        }
    }
}
