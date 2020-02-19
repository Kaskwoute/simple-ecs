const { exec } = require('child_process');

const puts = function(error, stdout) {
  console.log(stdout);
};

const WebpackShellPlugin = function(options) {
  const defaultOptions = {
    onBuildEnd: [],
  };

  this.options = Object.assign(defaultOptions, options);
};

WebpackShellPlugin.prototype.apply = function (compiler) {
  const { options } = this;

  compiler.hooks.afterCompile.tap('WebpackShellPlugin', () => {
    if (options.onBuildEnd.length) {
      console.log('Executing afterCompile scripts');
      options.onBuildEnd.forEach((script) => exec(script, puts));
    }
  });
};

module.exports = WebpackShellPlugin;
