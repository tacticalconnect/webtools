/**
 * @copyright 2019 Tactical Tools LLC.
 * @author Darren Hill darren@tacticaltools.com
 */

import * as http from 'http';
import * as express from 'express';
import {AddressInfo} from 'net';

const router = express();

router.use('/delay/:milliseconds', (req, res) => {
    // req.params.milliseconds
    setTimeout(() => {
        res.send(`Waited for ${req.params.milliseconds} milliseconds`);
    }, req.params.milliseconds);
});

const server = http.createServer(router);

router.get('/', (req, res) => {
    res.sendStatus(200);
});

server.listen(process.env.PORT || 3000, +process.env.IP,  () => {
    const addr: AddressInfo = <AddressInfo>server.address();
    console.log(`Chat server listening at ${addr.address} : ${addr.port}`);
});
