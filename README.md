# npm-save-installed
Updates package.json with the exact version of the installed package in the node_modules directory. Useful for forcing installation of exact commit of git dependencies (packages not hosted on NPM).

[![Build Status](https://travis-ci.org/jonatanpedersen/npm-save-installed.svg?branch=master)](https://travis-ci.org/jonatanpedersen/npm-save-installed)
[![NPM Version](https://img.shields.io/npm/v/npm-save-installed.svg)](https://www.npmjs.com/package/npm-save-installed)
[![NSP Status](https://nodesecurity.io/orgs/jonatanpedersen/projects/7c4a12cc-45b8-49c8-9130-b388108148f2/badge)](https://nodesecurity.io/orgs/jonatanpedersen/projects/7c4a12cc-45b8-49c8-9130-b388108148f2)
[![Greenkeeper badge](https://badges.greenkeeper.io/jonatanpedersen/npm-save-installed.svg)](https://greenkeeper.io/)

# Installation
``` bash
$ npm install npm-save-installed -g
```

# Usage

``` bash
$ npm-save-installed [packakeName1] [packakeName2] [packakeNameN]
```

If no package name is specified, all installed packages specified in package.json will be saved.

## Example

When you install your dependency like this:
```
$ npm install git+ssh://git@github.com/foobar/bar.git --save
```

Your package.json will look like this:

```
{
  "name": "foo",
  "dependencies": {
    "bar": "git+ssh://git@github.com/foobar/bar.git"
  }
}
```
No version or commit specified. After running npm-save-installed
```
$ npm-save-installed bar
```

Your packgage.json will look like this.

```
{
  "name": "foo",
  "dependencies": {
    "bar": "git+ssh://git@github.com/foobar/bar.git#0c73a9b40664558ae79f8be002614ffb7633546b"
  }
}
```

# License
MIT License

Copyright (c) 2016 [Jonatan Pedersen](https://www.jonatanpedersen.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
