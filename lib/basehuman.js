"use strict";
const BASE_MIN = 2;
const BASE_MAX = 10000;
// see: http://www.unicode.org/reports/tr18/#Line_Boundaries
const NEWLINE = /\r\n|[\n\v\f\r\x85\u2028\u2029]/g.compile();
const MAX_SHIFTABLE = Math.pow(2, 32) - 1;
;
class BaseHuman {
    /**
     * constructor
     */
    constructor(options) {
        this.dict = [];
        this.opt = {
            language: "en",
            base: 8192,
            seperator: " "
        };
        this.opt = Object.assign(this.opt, options);
        //check language so we don't let someone open a bad file
        if (!/^[a-z]{2}$/.test(this.opt.language)) {
            throw new Error("invalid language identifier passed");
        }
        if (this.opt.base < BASE_MIN || this.opt.base > BASE_MAX) {
            throw new Error(`base must be between ${BASE_MIN} and ${BASE_MAX}`);
        }
        this.dict = require(`./data/${this.opt.language}`);
    }
    /**
     * encodes data
     */
    encode(data) {
        let digits = [];
        let n = data;
        if (0 === data) {
            return this.dict[0];
        }
        while (n > 0) {
            let r = n % this.opt.base;
            n = Math.floor(n / this.opt.base);
            digits.push(this.dict[r]);
        }
        return digits.reverse().join(this.opt.seperator);
    }
    /**
     * decodes data
     */
    decode(encoded) {
        let digits = encoded.split(this.opt.seperator);
        let val = 0;
        for (let dix in digits) {
            let ix = this.dict.findIndex((val) => val === digits[dix]);
            val = (val * this.opt.base) + ix;
        }
        return val;
    }
    /**
     * get/set the base
     */
    base(b) {
        return this.opt.base;
    }
}
exports.BaseHuman = BaseHuman;
