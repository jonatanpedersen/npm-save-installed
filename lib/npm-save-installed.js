var path = require('path');
var fs = require('fs');
var detectIndent = require('detect-indent');

function npmSaveInstalled (packageName) {
	var dependentPackageJsonPath = './package.json';
	var dependentPackageJsonContents = fs.readFileSync(dependentPackageJsonPath, 'utf8');
	var dependentPackageJsonIndent = detectIndent(dependentPackageJsonContents).indent;
	var dependentPackageJson = JSON.parse(dependentPackageJsonContents);

	var dependencyPackageJsonPath = './node_modules/' + packageName + '/package.json';
	var dependencyPackageJsonContents = fs.readFileSync(dependencyPackageJsonPath, 'utf8');
	var dependencyPackageJson = JSON.parse(dependencyPackageJsonContents);

	var resolvedPackageUrl = dependencyPackageJson._resolved;
	var isDevDependency = dependentPackageJson.devDependencies[packageName];

	if (isDevDependency) {
		dependentPackageJson.devDependencies[packageName] = resolvedPackageUrl;
	} else {
		dependentPackageJson.dependencies[packageName] = resolvedPackageUrl;
	}

	var updatedDependentPackageJsonContents = JSON.stringify(dependentPackageJson, null, dependentPackageJsonIndent);

	if (updatedDependentPackageJsonContents !== dependentPackageJsonContents) {
		fs.writeFileSync(dependentPackageJsonPath, updatedDependentPackageJsonContents, 'utf8');
	}
}

module.exports = npmSaveInstalled;
