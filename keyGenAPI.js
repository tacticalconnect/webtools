/**
 * @copyright 2019 Tactical Tools LLC.
 * @author Darren Hill darren@tacticaltools.com
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaginatedElements = exports.getAllLicensePromise = exports.getAccountType = void 0;
var node_fetch_1 = require("node-fetch");
var getAccountType = function (instanceAccountId, accountTypeId) {
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
var getAllLicensePromise = function (nextLink) {
    if (nextLink === void 0) { nextLink = "/v1/accounts/".concat(process.env.KEYGEN_ACCOUNT_ID, "/licenses?page[size]=100&page[number]=1"); }
    return (0, node_fetch_1.default)("https://api.keygen.sh".concat(nextLink), {
        method: 'GET',
        headers: {
            'Accept': 'application/vnd.api+json',
            'Authorization': "Bearer ".concat(process.env.KEYGEN_PRODUCT_TOKEN),
        }
    }).then(function (httpResponse) { return httpResponse.json(); });
};
exports.getAllLicensePromise = getAllLicensePromise;
var getPaginatedElements = function (getResourcePromise, nextLink, elements) {
    if (elements === void 0) { elements = []; }
    return new Promise(function (resolve, reject) {
        return getResourcePromise(nextLink)
            .then(function (rootObject) {
            var _a;
            var newElements = elements.concat(rootObject.data);
            if ((_a = rootObject === null || rootObject === void 0 ? void 0 : rootObject.links) === null || _a === void 0 ? void 0 : _a.next) {
                (0, exports.getPaginatedElements)(getResourcePromise, rootObject.links.next, newElements)
                    .then(resolve)
                    .catch(reject);
            }
            else {
                console.log('Done?');
                resolve(newElements);
            }
        }).catch(reject);
    });
};
exports.getPaginatedElements = getPaginatedElements;
