var path = require('path');
var fs = require('fs');
var detectIndent = require('detect-indent');

function npmSaveInstalled (packageNames) {
	var noPackagesSpecified = packageNames.length == 0;

	var dependentPackageJsonPath = path.join('package.json');
	var dependentPackageJsonContents = fs.readFileSync(dependentPackageJsonPath, 'utf8');
	var dependentPackageJsonIndent = detectIndent(dependentPackageJsonContents).indent;
	var dependentPackageJson = JSON.parse(dependentPackageJsonContents);

	if (noPackagesSpecified) {
		packageNames = Object.keys(dependentPackageJson.dependencies || {}).concat(Object.keys(dependentPackageJson.devDependencies || {}));
	}

	packageNames.forEach(packageName => {
		var dependencyPackageJsonPath = path.join('node_modules', packageName, 'package.json');
		var dependencyPackageJsonContents = fs.readFileSync(dependencyPackageJsonPath, 'utf8');
		var dependencyPackageJson = JSON.parse(dependencyPackageJsonContents);

		var isHosted = !!dependencyPackageJson._requested.hosted;
		var resolvedPackageUrl = isHosted ? dependencyPackageJson._resolved : dependencyPackageJson._id;

		var isDependency = dependentPackageJson.dependencies && dependentPackageJson.dependencies[packageName];
		var isDevDependency = dependentPackageJson.devDependencies && dependentPackageJson.devDependencies[packageName];

		if (isDependency) {
			dependentPackageJson.dependencies && (dependentPackageJson.dependencies[packageName] = resolvedPackageUrl);
		}

		if (isDevDependency) {
			dependentPackageJson.devDependencies && (dependentPackageJson.devDependencies[packageName] = resolvedPackageUrl);
		}
	})

	var updatedDependentPackageJsonContents = JSON.stringify(dependentPackageJson, null, dependentPackageJsonIndent);

	if (updatedDependentPackageJsonContents !== dependentPackageJsonContents) {
		fs.writeFileSync(dependentPackageJsonPath, updatedDependentPackageJsonContents, 'utf8');
	}
}

module.exports = npmSaveInstalled;
