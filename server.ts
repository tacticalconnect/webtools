/**
 * @copyright 2019 Tactical Tools LLC.
 * @author Darren Hill darren@tacticaltools.com
 */

import * as http from 'http';
import * as express from 'express';
import {AddressInfo} from 'net';
import {Request, Response} from 'express-serve-static-core';
import {getAccountType, getAllLicensePromise, getPaginatedElements} from './keyGenAPI';
import {Datum} from './keyGenResponse';

const router = express();

router.use('/delay/:milliseconds', (req: Request, res: Response) => {
    const timeOutLength = +req.params.milliseconds > 0 ? +req.params.milliseconds : 5000;

    // req.params.milliseconds
    setTimeout(() => {
        res.send(`Waited for ${req.params.milliseconds} milliseconds`);
    }, timeOutLength);
});

router.use('/allLicenses/:secret', async (req: Request, res: Response) => {
    if (req.params.secret && req.params.secret === 'darren') {
        getPaginatedElements(getAllLicensePromise).then((elements: Datum[]) => {
            const chartData = elements.map(element => {
                if (element) {
                    const instanceAccountId = element.attributes.key;
                    const [netsuiteAccountId, accountTypeId] = instanceAccountId.split('_');

                    return {
                        name: element.attributes.name,
                        netsuiteAccountId: netsuiteAccountId,
                        instanceAccountId: instanceAccountId,
                        accountType: getAccountType(instanceAccountId, accountTypeId),
                        expiry: element.attributes.expiry,
                        licenseStatus: element.attributes.status,
                        created: element.attributes.created,
                        lastValidated: element.attributes.lastValidated
                    };
                }
            });
            res.json(chartData);
        });
    } else {
        res.json({
            error: 'Do you know the secret?'
        });
    }
});

router.use(express.static('public'));

router.get('/', (req, res) => {
    res.sendStatus(200);
});

const server = http.createServer(router);

server.listen(process.env.PORT || 3000, +process.env.IP, () => {
    const addr: AddressInfo = <AddressInfo>server.address();
    console.log(`Chat server listening at ${addr.address} : ${addr.port}`);
});
