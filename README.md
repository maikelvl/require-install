# Require Install
Require install enable you to automatically install packages when you require them. Very usefull for keeping your productivity high.

There is no performance lost (other than loading this package of course) because require-install at very first tries to require() your package the usual way.

## Installation
Global
```bash
npm install -g require-install
```
or local
```bash
npm install --save require-install
```

## Usage
```javascript
var require_install = require('require-install');

// Just replace your require() with require_install():
var the_package = require_install('the-package');

// If it can't require it, it will install it and add it to your dependencies

the_package.doSomething();
```

## Specific version
When a package is not available it will install the package according to the ./package.json. It will look up the version number if it exists. Else it will just install the latest and add it to the dependencies.

## License
Copyright (c) 2015 Maikel Vlasman

Permission is hereby granted, free of charge, to any person obtaining a
copy of this software and associated documentation files (the "Software"),
to deal in the Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish, distribute, sublicense,
and/or sell copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
DEALINGS IN THE SOFTWARE.