import {expect} from 'chai';

// import {tester} from 'sheep';
// import td from 'testdouble';

const td = require('testdouble');
// const bar = td.replace('sheep');


describe('demo tests', () => {
    let tester;

    beforeEach(() => {
        // tester = td.replace('sheep');
        // const foo = td.replace('x')
    });

    it('should pass', () => {
        expect(1).to.equal(1);

        expect(tester()).to.equal('bah');
    });

    it('should fail', () => {
        expect(1).not.to.equal(2);
    })
});
