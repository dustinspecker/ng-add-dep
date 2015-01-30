/* global describe, beforeEach, it */
'use strict';
var assert = require('assert')
  , EOL = require('os').EOL
  , ngAddDep = require('./');

describe('ng-add-dep', function () {
  var fileContents;

  beforeEach(function () {
    fileContents = ['angular' + EOL,
                    '  .module(\'module\', [' + EOL,
                    '  ]);'].join('');
  });

  it('should add test dep', function () {
    var expected = ['angular' + EOL,
                    '  .module(\'module\', [' + EOL,
                    '    \'test\'' + EOL,
                    '  ]);'].join('');
    assert(ngAddDep(fileContents, 'test') === expected);
  });

  it('should add comma and new line delimeted deps', function () {
    var expected = ['angular' + EOL,
                    '  .module(\'module\', [' + EOL,
                    '    \'test\',' + EOL,
                    '    \'test2\'' + EOL,
                    '  ]);'].join('');
    assert(ngAddDep(ngAddDep(fileContents, 'test'), 'test2') === expected);
  });
});
