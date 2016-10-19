"use strict";
const chai = require("chai");
chai.should();

const BaseHuman = require("../lib/basehuman").BaseHuman;
const data = require("../lib/data/en");

console.log('starting tests...', new Date().toISOString());

describe("basehuman", ()=> {
    let bases = [128, 1024, 2048, 4096, 8192, 10000];
    bases.forEach(function(base) {
        describe(`base-${base}`, ()=> {
            let bh = new BaseHuman({ base : base });
            describe("encode", () => {
                it("should encode 0 as 'the'", ()=> {
                    chai.assert.equal(bh.encode(0x0), 'the');
                });
                it("should encode -1 as ''", ()=> {
                    chai.assert.equal(bh.encode(-1), '');
                });
            });

            describe("decode", () => {
                let levels = [0,1,2].map((p) => Math.pow(bh.base(),p));
                let tests = levels.concat(levels.map((x)=> x-1), levels.map((x)=> x+1), levels.map((x)=>x+2)).concat(
                    Array.from({length:50}).fill(0).map(()=>Math.ceil(Math.random()*Math.pow(2,32)))
                );
                tests.forEach((i) => {
                    it(`should decode '${bh.encode(i)}' as ${i}`, ()=>{    
                        //let n = Math.ceil(Math.random() * Number.MAX_VALUE);
                        chai.assert.equal(bh.decode(bh.encode(i)), i);
                    });
                });

                it(`should decode '${bh.encode(Number.MAX_SAFE_INTEGER)}' as ${Number.MAX_SAFE_INTEGER}`, ()=>{    
                    //let n = Math.ceil(Math.random() * Number.MAX_VALUE);
                    chai.assert.equal(bh.decode(bh.encode(Number.MAX_SAFE_INTEGER)), Number.MAX_SAFE_INTEGER);
                });

                it(`should decode '${bh.encode(Number.MAX_VALUE)}' as ${Number.MAX_VALUE}`, ()=>{    
                    //let n = Math.ceil(Math.random() * Number.MAX_VALUE);
                    chai.assert.equal(bh.decode(bh.encode(Number.MAX_VALUE)), Number.MAX_VALUE);
                });
            });
        });
    });
});