/**
 * @copyright 2019 Tactical Tools LLC.
 * @author Darren Hill darren@tacticaltools.com
 */

import {Datum, KeyGenResponse} from './keyGenResponse';
import fetch from 'node-fetch';

export const getAccountType = (instanceAccountId: string, accountTypeId: string): 'Production' | 'Sandbox' | 'ReleasePreview' | 'Unknown' | 'TestAccount' => {
    if (accountTypeId) {
        if (accountTypeId.includes('SB')) {
            return 'Sandbox';
        } else if (accountTypeId.includes('RP')) {
            return 'ReleasePreview';
        } else {
            return 'Unknown';
        }
    } else {
        if (instanceAccountId.includes('TST')) {
            return 'TestAccount';
        } else {
            return 'Production';
        }
    }
};

type GetResourcePromise = (nextLink: string) => Promise<KeyGenResponse>;

export const getAllLicensePromise: GetResourcePromise = (nextLink = `/v1/accounts/${process.env.KEYGEN_ACCOUNT_ID}/licenses?page[size]=100&page[number]=1`) => {
    return fetch(`https://api.keygen.sh${nextLink}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/vnd.api+json',
            'Authorization': `Bearer ${process.env.KEYGEN_PRODUCT_TOKEN}`,
        }
    }).then(httpResponse => httpResponse.json() as Promise<KeyGenResponse>);
};

export const getPaginatedElements = (getResourcePromise: GetResourcePromise, nextLink?: string, elements: Datum[] = []) => {
    return new Promise((resolve, reject) =>
        getResourcePromise(nextLink)
            .then(rootObject => {
                const newElements = elements.concat(rootObject.data);
                if (rootObject?.links?.next) {
                    getPaginatedElements(getResourcePromise, rootObject.links.next, newElements)
                        .then(resolve)
                        .catch(reject);
                } else {
                    console.log('Done?');
                    resolve(newElements);
                }
            }).catch(reject));
};
