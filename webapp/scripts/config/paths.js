'use strict';

const path = require('path');
const fs = require('fs');
const url = require('url');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebook/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
    appBuild: resolveApp('build'),
    appBuildHtml: resolveApp('build/index.html'),
    serverPath: resolveApp('../server'),
    serverPublicPath: resolveApp('../server/public'),
    serverViewsPath: resolveApp('../server/resources/views'),
};
