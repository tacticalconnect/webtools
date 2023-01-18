/**
 * @copyright 2019 Tactical Tools LLC.
 * @author Darren Hill darren@tacticaltools.com
 */
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const express = require("express");
const keyGenAPI_1 = require("./keyGenAPI");
const router = express();
router.use('/delay/:milliseconds', (req, res) => {
    const timeOutLength = +req.params.milliseconds > 0 ? +req.params.milliseconds : 5000;
    // req.params.milliseconds
    setTimeout(() => {
        res.send(`Waited for ${req.params.milliseconds} milliseconds`);
    }, timeOutLength);
});
router.use('/allLicenses/:secret', async (req, res) => {
    if (req.params.secret && req.params.secret === 'darren') {
        (0, keyGenAPI_1.getPaginatedElements)(keyGenAPI_1.getAllLicensePromise).then((elements) => {
            const chartData = elements.map(element => {
                if (element) {
                    const instanceAccountId = element.attributes.key;
                    const [netsuiteAccountId, accountTypeId] = instanceAccountId.split('_');
                    return {
                        name: element.attributes.name,
                        netsuiteAccountId: netsuiteAccountId,
                        instanceAccountId: instanceAccountId,
                        accountType: (0, keyGenAPI_1.getAccountType)(instanceAccountId, accountTypeId),
                        expiry: element.attributes.expiry,
                        licenseStatus: element.attributes.status,
                        created: element.attributes.created,
                        lastValidated: element.attributes.lastValidated
                    };
                }
            });
            res.json(chartData);
        });
    }
    else {
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
    const addr = server.address();
    console.log(`Chat server listening at ${addr.address} : ${addr.port}`);
});
