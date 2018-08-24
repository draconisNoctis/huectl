import { NemModule } from '@neoskop/nem';
import { ApiModule } from './modules/api/api.module';
import proxy from 'http-proxy-middleware';
import './_fix-server';

@NemModule({
    modules: [
        [ '/api', ApiModule ]
    ],
    middlewares: [
        proxy({ target: 'http://localhost:4200' }),
    ]
    
})
export class ServerModule {

}
