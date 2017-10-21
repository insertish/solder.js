const fs = require('fs'),
    path = require('path'),
    md5File = require('md5-file');
var config = null;
try {
    config = require('./dev-config')
} catch (e) {
    config = require('./config');
}
function exist(...list) {
    return fs.existsSync(getpath(list));
}
function getpath(...list) {
    return path.resolve(path.join.apply(path.join, [config.data].concat(list.reduce(function(a, b) {
        return a.concat(b);
    }, []))));
}
function create_directories(list) {
    list.forEach(x => {
        if (!exist(x))
            fs.mkdirSync(getpath(x));
    });
}
function loadfile(...file) {
    return JSON.parse(
        fs.readFileSync(
            getpath.apply(getpath, file)
        ).toString()
    )
}
function md5hash(file) {
    return md5File.sync(file);
}
module.exports = {
    exist, getpath, create_directories, loadfile, md5hash
}