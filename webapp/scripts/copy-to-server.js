'use strict';

const path = require('path');
const fs = require('fs-extra');
const paths = require('./config/paths');

const filesToKeep = getFilesToKeep();
const filesToKeepFilter = f => !filesToKeep.includes(f);

// Remove all content but keep the directory
// and files in .keep
fs.readdir(paths.serverPublicPath).then(files => {
  return Promise.all(files
    .filter(filesToKeepFilter)
    .map(file => fs.remove(path.join(paths.serverPublicPath, file)))
  );
}).then(() => {
  copyBuildFolder();
  moveIndex();
});

/*
 * Get files to keep from .keep in server public path
 */
function getFilesToKeep() {
  try {
    // read content of .keep from server public path
    const data = fs.readFileSync(path.join(paths.serverPublicPath, '.keep'), 'UTF-8');

    // split the contents by new line and remove empty lines
    const lines = data
      .split(/\r?\n/)
      .filter(l => l !== '');

    // add .keep
    lines.push('.keep');

    return lines;
  } catch (err) {
    console.error(err);
  }
}

/*
 * Copy all files from build to server public path,
 * except the app build index.html
 */
function copyBuildFolder() {
    fs.copySync(paths.appBuild, paths.serverPublicPath, {
      dereference: true,
      filter: file => file !== paths.appBuildHtml
    });
}

/*
 * Move the app build index.html to
 * the server views path
 */
function moveIndex() {
    fs.moveSync(
      paths.appBuildHtml,
      path.join(paths.serverViewsPath, 'app.blade.php'),
      { overwrite: true },
    );
}
