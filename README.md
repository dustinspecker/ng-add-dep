# ng-add-dep [![NPM version](https://badge.fury.io/js/ng-add-dep.svg)](http://badge.fury.io/js/ng-add-dep) [![Build Status](https://travis-ci.org/dustinspecker/ng-add-dep.svg)](https://travis-ci.org/dustinspecker/ng-add-dep) [![Coverage Status](https://img.shields.io/coveralls/dustinspecker/ng-add-dep.svg)](https://coveralls.io/r/dustinspecker/ng-add-dep?branch=master)
[![Dependencies](https://david-dm.org/dustinspecker/ng-add-dep.svg)](https://david-dm.org/dustinspecker/ng-add-dep/#info=dependencies&view=table) [![DevDependencies](https://david-dm.org/dustinspecker/ng-add-dep/dev-status.svg)](https://david-dm.org/dustinspecker/ng-add-dep/#info=devDependencies&view=table) [![PeerDependencies](https://david-dm.org/dustinspecker/ng-add-dep/peer-status.svg)](https://david-dm.org/dustinspecker/ng-add-dep/#info=peerDependencies&view=table)


> Add a module dependency to an Angular module

## Usage

```javascript
var ngAddDep = require('ng-add-dep')
  , fs = require('fs');

/* module.js
angular
  .module('module', [
  ]);
*/
var fileContents = fs.readFileSync('module.js');

ngAddDep(fileContents, 'child');
/* =>
angular
  .module('module', [
    'child'
  ]);
*/
```

## License
MIT