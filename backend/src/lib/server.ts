import { NemModule } from '@neoskop/nem';
import { ApiModule } from './modules/api/api.module';
import proxy from 'http-proxy-middleware';
import express from 'express';
import './_fix-server';
import { HomeController } from './home.controller';

@NemModule({
    modules: [
        [ '/api', ApiModule ]
    ],
    controller: [
        [ '/', HomeController ]
    ],
    middlewares: [
        process.env.NODE_ENV === 'production' ? express.static('www') : proxy({ target: 'http://localhost:4200' })
    ]
    
})
export class ServerModule {

}
