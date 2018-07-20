import { NemModule } from '@neoskop/nem';
import * as bodyParser from 'body-parser';
import { BridgeController } from './controller/bridge.controller';
import { GroupsController } from './controller/groups.controller';
import { LightsController } from './controller/lights.controller';
import { ScenesController } from './controller/scenes.controller';

@NemModule({
    controller: [
        [ '/bridge', BridgeController ],
        [ '/bridge/:host/:username/groups', GroupsController ],
        [ '/bridge/:host/:username/lights', LightsController ],
        [ '/bridge/:host/:username/scenes', ScenesController ]
    ],
    middlewares: [
        bodyParser.json()
    ]
})
export class ApiModule {}
