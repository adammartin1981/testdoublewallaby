import {expect} from 'chai';
import td from 'testdouble';

describe('demo tests', () => {

  afterEach(() => {
    td.reset();
  })

  it('should pass with relative path from root', () => {
    const x = td.replace('./client/components/core/utils').tester;
    td.when(x()).thenReturn('foo');
    const tester = require('./client/components/core/utils').tester;
    expect(tester()).to.equal('foo');
  });

  it('should pass with 2 relative path', () => {
    const x = td.replace('./core/utils').tester;
    td.when(x()).thenReturn('foo');
    const tester = require('./core/utils').tester;
    expect(tester()).to.equal('foo');
  });

  it('should pass with relative path and alias', () => {
    const x = td.replace('./core/utils').tester;
    td.when(x()).thenReturn('foo');
    const tester = require('sheep').tester;
    expect(tester()).to.equal('foo');
  });

  it('should pass with alias and alias', () => {
    const x = td.replace('core/utils').tester;
    td.when(x()).thenReturn('foo');
    const tester = require('core/utils').tester;
    expect(tester()).to.equal('foo');
  });
});
