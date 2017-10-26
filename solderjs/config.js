/**
 * API Name
 * @default solder.js
 */
const api = 'solder.js';

/**
 * ExpressJS Port
 * @default 3000
 */
const port = 3000;

/**
 * API Address
 * @default http://localhost:${port}/api/
 */
const addr = 'http://localhost:'+port+'/api/';

/**
 * Data Storage
 * @default './data/'
 */
const data = './data/';

/**
 * JSON Pretty Print
 * Set to 0 to disable
 * @default 2
 */
const jpp = 2;

/**
 * Solder.js Authentication Key
 * @default 'solderjs_auth_key'
 */
const authkey = 'solderjs_auth_key';

/**
 * Web Interface Web Root
 * @default /solderjs/
 */
const webroot = '/solderjs/';

/**
 * Technic Solder API Keys
 * @default []
 */
const solder_key = [
    'your_solder_key'
];

/**
 * Technic Key Management TM
 * @default 'solderjs_key' 0
 */
const technic_key = 'solderjs_key';
const technic_cat = 0;

module.exports = {
    api, port, addr, data, jpp,
    authkey, webroot,
    technic_key, technic_cat,
    solder_key,
    stream: 'DEV',
    ver: 'v1.0.0',
};