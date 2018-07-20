import { NemModule } from '@neoskop/nem';
import { ApiModule } from './modules/api/api.module';
import './_fix-server';

@NemModule({
    modules: [
        [ '/api', ApiModule ]
    ]
})
export class ServerModule {

}
