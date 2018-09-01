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
        if(process.env.HUE_ACCOUNT) {
            return await new Promise(resolve => {
                setTimeout(() => resolve(process.env.HUE_ACCOUNT), 2000)
            });
        }
        const api = new HueApi();
        const start = Date.now();
        while(true) {
            try {
                return await api.createUser(host, description);
            } catch(e) {
                if(Date.now() >= start + timeout || e.message !== 'link button not pressed') {
                    throw e;
                }
            }
        }
    }
}
