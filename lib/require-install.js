module.exports = function(_package, repository) {

	var _this = this;

	this._require = function(_package){
		var _required = this._tryRequire(_package);
		if (_required) {
			return _required;
		}
		
		this._install(_package);
		return this._tryRequire(_package);
	}

	this._tryRequire = function(_package) {
		var _require;
		try {
			_require = require(_package);
		}
		catch(e) {
			var name = this.packageName(_package);
			if (name) {
				var _required = this._tryRequire(name);
				if (_required) {
					return _required;
				}
			}

			if ( ! repository) {
				return undefined;
			}

			name = this.packageName(repository);
			if (name) {
				var _required = this._tryRequire(name);
				if (_required) {
					return _required;
				}
			}

			// The package is not installed and not relative to the project
			return undefined;
		}
		return _require;
	}

	this._install = function(_package) {
		var error;
		var npm_config = {
			save: true
		};
		var install_name = _package;
		var version = _this.packageVersion(_package);
		if (version !== undefined) {
			npm_config.save = false;
			if (_this._isRepositoryUrl(version)) {
				install_name = version;
			}
			else {
				install_name += "@"+version;
			}
		}
		else if (repository !== undefined) {
			install_name = repository;
		}

		_this.descrevit().do(function(){
			_this.npm().load(npm_config, function (load_er) {
	  			if (load_er) {
	  				error = load_er;
	  				_this.descrevit().done();
	  				return;
	  			}
				_this.npm().commands.install([install_name], function(install_er, data){
					if (install_er) {
						error = install_er;
						return;
					}
					_this.descrevit().done();
				});
			});
		});

		if (error) {
			if (error.statusCode === 404) {
				throw new Error(error.statusCode+' Package '+_package+' is no valid NPM package.');
			}
			throw error;
		}
		
	}

	this._isRepositoryUrl = function(repo) {
		return repo.indexOf('://') >= 0;
	}

	this.npm = function() {
		if (_this._npm === undefined) {
			_this._npm = require('npm');
		}
		return _this._npm;
	}

	this.descrevit = function() {
		if (_this._descrevit === undefined) {
			_this._descrevit = require('descrevit');
		}
		return _this._descrevit;
	}

	this.DotJson = function() {
		if (_this._DotJson === undefined) {
			_this._DotJson = require('dot-json');
		}
		return _this._DotJson;
	}

	this.packageConfig = function() {
		if (_this._package_config === undefined) {
			_this._package_config = new (this.DotJson())('./package.json');
		}
		return _this._package_config;
	}

	this.packageVersion = function(_package) {
		var dep_keys = ['devDependencies', 'dependencies'];
		for (var dep in dep_keys) {
			var dependencies = _this.packageConfig().get(dep_keys[dep]);
			if  (dependencies === undefined) {
				continue;
			}
			if (dependencies[_package] === undefined) {
				continue;
			}
			return dependencies[_package];
		}
		return undefined;
	}

	this.packageName = function(_package) {
		var dep_keys = ['devDependencies', 'dependencies'];
		for (var dep in dep_keys) {
			var dependencies = _this.packageConfig().get(dep_keys[dep]);
			if  (dependencies === undefined) {
				continue;
			}
			for (var k in dependencies) {
				if (dependencies[k].toLowerCase().indexOf(_package.toLowerCase()) !== -1) {
					return k;
				}
			}
		}
		return undefined;
	}

	if (_package === undefined) {
		return this;
	}

	return this._require(_package);
}
