/**
 * @copyright 2019 Tactical Tools LLC.
 * @author Darren Hill darren@tacticaltools.com
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaginatedElements = exports.getAllLicensePromise = exports.getAccountType = void 0;
const getAccountType = (instanceAccountId, accountTypeId) => {
    if (accountTypeId) {
        if (accountTypeId.includes('SB')) {
            return 'Sandbox';
        }
        else if (accountTypeId.includes('RP')) {
            return 'ReleasePreview';
        }
        else {
            return 'Unknown';
        }
    }
    else {
        if (instanceAccountId.includes('TST')) {
            return 'TestAccount';
        }
        else {
            return 'Production';
        }
    }
};
exports.getAccountType = getAccountType;
const getAllLicensePromise = (nextLink = `/v1/accounts/${process.env.KEYGEN_ACCOUNT_ID}/licenses?page[size]=100&page[number]=1`) => {
    return fetch(`https://api.keygen.sh${nextLink}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/vnd.api+json',
            'Authorization': `Bearer ${process.env.KEYGEN_PRODUCT_TOKEN}`,
        }
    }).then(httpResponse => httpResponse.json());
};
exports.getAllLicensePromise = getAllLicensePromise;
const getPaginatedElements = (getResourcePromise, nextLink, elements = []) => {
    return new Promise((resolve, reject) => getResourcePromise(nextLink)
        .then(rootObject => {
        var _a;
        const newElements = elements.concat(rootObject.data);
        if ((_a = rootObject === null || rootObject === void 0 ? void 0 : rootObject.links) === null || _a === void 0 ? void 0 : _a.next) {
            (0, exports.getPaginatedElements)(getResourcePromise, rootObject.links.next, newElements)
                .then(resolve)
                .catch(reject);
        }
        else {
            console.log('Done?');
            resolve(newElements);
        }
    }).catch(reject));
};
exports.getPaginatedElements = getPaginatedElements;
