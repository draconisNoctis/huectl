import { nem } from '@neoskop/nem';
import { ServerModule } from '../lib/server';


nem().bootstrap(ServerModule).listen(5050).then(() => {
    console.log('Started...')
}, error => {
    console.error(error);
    process.exit(1);
});
