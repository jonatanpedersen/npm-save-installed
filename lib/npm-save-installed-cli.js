var npmSaveInstalled = require('./npm-save-installed');
var packageNames = process.argv.slice(2);
npmSaveInstalled(packageNames);
