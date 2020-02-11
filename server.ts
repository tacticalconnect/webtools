/**
 * @copyright 2019 Tactical Tools LLC.
 * @author Darren Hill darren@tacticaltools.com
 */

import * as express from 'express';
import * as serverless from 'serverless-http';

const router = express();

router.use('/delay/:milliseconds', (req, res) => {
    // req.params.milliseconds
    setTimeout(() => {
        res.send(`Waited for ${req.params.milliseconds} milliseconds`);
    }, req.params.milliseconds);
});

router.get('/', (req, res) => {
    res.sendStatus(200);
});

serverless(router);
