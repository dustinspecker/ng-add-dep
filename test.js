/* global describe, it */
'use strict';
import assert from 'assert';
import {EOL} from 'os';
import ngAddDep from './lib/';

describe('ng-add-dep', () => {
  let fileContents = [
    'angular\n',
    `  .module('module', [\r\n`,
    '  ]);'
  ].join('');

  it('should add test dep', () => {
    let expected = [
      `angular${EOL}`,
      `  .module('module', [${EOL}`,
      `    'test'${EOL}`,
      '  ]);'
    ].join('');
    assert(ngAddDep(fileContents, 'test') === expected);
  });

  it('should add comma and new line delimeted deps', () => {
    let expected = [
      `angular${EOL}`,
      `  .module('module', [${EOL}`,
      `    'test',${EOL}`,
      `    'test2'${EOL}`,
      '  ]);'
    ].join('');
    assert(ngAddDep(ngAddDep(fileContents, 'test'), 'test2') === expected);
  });

  it('should not add exising dep', () => {
    let expected = [
      `angular${EOL}`,
      `  .module('module', [${EOL}`,
      `    'test'${EOL}`,
      '  ]);'
    ].join('');
    assert(ngAddDep(ngAddDep(fileContents, 'test'), 'test') === expected);
  });
});
