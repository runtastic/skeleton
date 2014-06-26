var compileES6     = require('broccoli-es6-concatenator');
var moveFile       = require('broccoli-file-mover');
var mergeTrees     = require('broccoli-merge-trees');
var exportTree     = require('broccoli-export-tree');
var compileCoffee  = require('broccoli-coffee');
var coffeelintTree = require('broccoli-coffeelint');

var lib   = 'lib';
var tests = 'tests';

var loader = moveFile('vendor', {
  srcFile: 'loader.js/loader.js',
  destFile: '/loader.js',
  copy: true
});

var mergedForLinting  = mergeTrees([lib, tests]);
var lintedLibAndTests = coffeelintTree(mergedForLinting);

var coffeeLib   = compileCoffee(lib, { bare: true });
var coffeeTests = compileCoffee(tests, { bare: true});

var lib = mergeTrees([coffeeLib, loader]);

var compiledLib = compileES6(lib, {
  loaderFile: 'loader.js',
  ignoredModules: [],
  inputFiles: ['*.js'],
  legacyFilesToApp: [],
  wrapInEval: true,
  outputFile: '/lib.js'
});

var exportLib = exportTree(compiledLib, {
  destDir: 'tmp/output/lib'
});

var exportTest = exportTree(coffeeTests, {
  destDir: 'tmp/output/tests'
});

module.exports = mergeTrees([
  compiledLib, 
  exportLib, 
  exportTest, 
  lintedLibAndTests
]);
