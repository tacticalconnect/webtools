/**
 * @copyright 2019 Tactical Tools LLC.
 * @author Darren Hill darren@tacticaltools.com
 */

export interface Attributes {
    name: string;
    key: string;
    expiry: Date;
    status: string;
    uses: number;
    suspended: boolean;
    scheme?: any;
    encrypted: boolean;
    strict: boolean;
    floating: boolean;
    concurrent: boolean;
    protected: boolean;
    maxMachines?: any;
    maxCores?: any;
    maxUses?: any;
    requireHeartbeat: boolean;
    requireCheckIn: boolean;
    lastValidated?: any;
    lastCheckIn?: any;
    nextCheckIn?: any;
    created: Date;
    updated: Date;
}

export interface Datum {
    id: string;
    type: string;
    attributes: Attributes;
    relationships: string[];
    links: string[];
}

export interface Meta {
    pages: number;
    count: number;
}

export interface Links {
    self: string;
    prev?: any;
    next: string;
    first: string;
    last: string;
    meta: Meta;
}

export interface KeyGenResponse {
    data: Datum[];
    links: Links;
}
