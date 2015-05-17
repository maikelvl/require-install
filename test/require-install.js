var expect = require('chai').expect;
var require_install = require('../lib/require-install.js');
var fs = require('fs');

describe("require-install", function() {

	it("should detect relative modules", function() {
		expect(function(){
			require_install()._isRelativeModule('git://github.com/fdsa/fdsafdsaf')
		}).to.throw('To require install a package by repository, pass the repository url as the second argument');
		
		expect(require_install()._isRelativeModule('@fsfdsa')).equal(false);
		expect(require_install()._isRelativeModule('fsfdsa')).equal(false);

		expect(require_install()._isRelativeModule('./fdsa')).equal(true);
		expect(require_install()._isRelativeModule('/fdsfa')).equal(true);
		expect(require_install()._isRelativeModule('fsf/dsa')).equal(true);
	});

	it("should detect a repository url", function() {

		expect(require_install()._isRepositoryUrl('fsf/dsa')).equal(false);
		expect(require_install()._isRepositoryUrl('./fdsa')).equal(false);
		expect(require_install()._isRepositoryUrl('^0.1.2')).equal(false);
		expect(require_install()._isRepositoryUrl('~0.3')).equal(false);
		expect(require_install()._isRepositoryUrl('git://github.com/fdsaffsdsfsda/fdsfa')).equal(true);
		expect(require_install()._isRepositoryUrl('svn://github.com/sdsfd/ffdsaf')).equal(true);
		expect(require_install()._isRepositoryUrl('http://github.com/asdf/sfafsa')).equal(true);
		expect(require_install()._isRepositoryUrl('git://gitlab.com/ffdsa/asf')).equal(true);

	});

	it("should directly require already installed modules", function() {
		expect(require_install('fs')).equal(require('fs'));
	});

	it("should detect non installed modules", function() {
		expect(require_install()._tryRequire('not-installed-module')).equal(false);
	});

	it("should throw eerror on require an invalid local module", function() {
		expect(function(){
			require_install()._tryRequire('./lib/not-installed-local-module');
		}).throw();
	});

});