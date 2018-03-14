const fs = require('fs');
const path = require('path');
const ROOT_PATH = path.resolve(__dirname, "../");
const BUILD_DIR = path.resolve(ROOT_PATH, 'dist');
const TARGET_DIR = path.resolve(ROOT_PATH, 'lib');
const CSS_FILE_NAME = "react-stateful-forms.css";

var fromPath = path.join(BUILD_DIR, CSS_FILE_NAME);
var toPath = path.join(TARGET_DIR, CSS_FILE_NAME);

console.log("Copy file '%s' to '%s'.", fromPath, toPath);
fs.createReadStream(fromPath).pipe(fs.createWriteStream(toPath));