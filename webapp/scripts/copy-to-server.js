'use strict';

const path = require('path');
const fs = require('fs-extra');
const paths = require('./config/paths');


// Remove all content but keep the directory so that
// if you're in it, you don't end up in Trash
fs.emptyDirSync(paths.serverPublicPath);
copyBuildFolder();
moveIndex();

function copyBuildFolder() {
    fs.copySync(paths.appBuild, paths.serverPublicPath
        , {
            dereference: true,
            filter: file => file !== paths.appBuildHtml,
        }
    );
}

function moveIndex() {
    fs.moveSync(
        paths.appBuildHtml,
        path.join(paths.serverViewsPath, 'app.blade.php'),
        { overwrite: true },
    );
}
