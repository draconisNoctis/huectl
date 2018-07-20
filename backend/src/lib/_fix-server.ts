import { ControllerRouterFactory, ModuleRouterFactory } from '@neoskop/nem';
import { After, AopManager, Before, JoinpointContext } from '@neoskop/phantom';
import { Router } from 'express';

class FixNemAspect {
    @Before(ModuleRouterFactory, 'initContext')
    beforeInitContext(jp : JoinpointContext<ModuleRouterFactory, 'createRouterFromModule'>) {
        if(!jp.getArgument(1) || !jp.getArgument(1)!.router) {
            const router = Router({ mergeParams: true });
            const options = {
                ...(jp.getArgument(1) || {}),
                router
            };
            jp.setArgument(1, options);
        }
    }
    
    @After(ControllerRouterFactory, 'initContext')
    afterInitContext(jp : JoinpointContext<ControllerRouterFactory, any>) {
        jp.getResult()!.router = Router({ mergeParams: true });
    }
}

new AopManager().install([ new FixNemAspect() ]);
