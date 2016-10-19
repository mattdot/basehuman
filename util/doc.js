"use strict";
const BaseHuman = require("../lib/basehuman").BaseHuman;
const bh = new BaseHuman();
const base32 = require("base32");

let examples = [
    3212781663,
    2356682812,
    1892374852,
    2348348959
];

examples.forEach((v) => {
    let b = new Buffer(4);
    b.writeUInt32LE(v);
    console.log('|' + v.toLocaleString() + '|' + base32.encode(b) + '|' + bh.encode(v) +  '|');
});