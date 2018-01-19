import {expect} from 'chai';

import {tester} from 'sheep';

// In wallaby this also isn't being resolved (but the alias is)
// import {tester as tester2} from './client/components/core/utils';

import td from 'testdouble';

describe('demo tests', () => {
    beforeEach(() => {
        const x = td.replace('./client/components/core/utils').tester;

        // Not picking up the alias so enable this to see the problem
        // const y = td.replace('sheep');

        // This isn't overwriting the 'sheep' version'
        td.when(x()).thenReturn('foo');
    });

    afterEach(() => {
        td.reset();
    })

    it('should pass', () => {
        expect(1).to.equal(1);
        // This is what I would like to mock out via td
        expect(tester()).to.equal('bah');
    });

    it('should fail', () => {
        expect(1).not.to.equal(2);
    })
});
