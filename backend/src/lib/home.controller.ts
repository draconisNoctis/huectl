import { Controller, Get, NotFoundError, Raw } from '@neoskop/nem';
import fs from 'fs-extra';

@Controller()
export class HomeController {
    
    @Get('/*')
    @Raw()
    async index() {
        if(await fs.pathExists('www/index.html')) {
            return await fs.readFile('www/index.html');
        }
        throw new NotFoundError()
    }
}
