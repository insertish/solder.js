const { create_directories, getpath, exist, loadfile, md5hash } = require('./util'),
    fs = require('fs');
var config = null;
try {
    config = require('./dev-config')
} catch (e) {
    config = require('./config');
}

create_directories(['','modpacks','mods']);

function mod(name) {
    try {
        var m = loadfile('mods', name, 'mod.json');
    } catch(e) {
        console.error(`mod.json does not exist for ${name}!`);
        return { error: `mod.json does not exist for ${name}!` };
    }
    var v = [];
    if (fs.existsSync(getpath('mods', name, 'versions')))
        fs.readdirSync(getpath('mods', name, 'versions')).forEach(x => {
            v.push(x.replace(/\.jar$|\.zip$|\.json$/g,''));
        });
    m['versions'] = v;
    if (!m['donate']) m['donate'] = null;
    return m;
}

function ver(name, version, ext) {
    if (ext=='json') {
        return loadfile('mods', name, 'versions', version+'.json');
    } else {
        var v = 'mods/'+name+'/versions/'+version+'.'+ext;
        return {
            md5: md5hash(config.data+v),
            url: config.addr+v
        };
    }
}

function modpack(slug) {
    try {
        var m = loadfile('modpacks', slug, 'modpack.json');
    } catch(e) {
        console.log(`modpack.json does not exist for ${slug}!`);
        return { error: `modpack.json does not exist for ${slug}!` };
    }
    var b = [];
    if (exist('modpacks', slug, 'builds'))
        fs.readdirSync(getpath('modpacks', slug, 'builds')).forEach(x => {
            b.push(x.replace(/\.json$/g,''));
        });
    m['builds'] = b;
    if (exist('modpacks', slug, 'icon.png')) {
        m['icon'] = config.addr + 'resources/'+slug+'/icon.png';
        m['icon_md5'] = md5hash(getpath('modpacks', slug, 'icon.png'));
    }
    if (exist('modpacks', slug, 'logo.png')) {
        m['logo'] = config.addr + 'resources/'+slug+'/logo.png';
        m['logo_md5'] = md5hash(getpath('modpacks', slug, 'logo.png'));
    }
    if (exist('modpacks', slug, 'background.png')) {
        m['background'] = config.addr + 'resources/'+slug+'/background.png';
        m['background_md5'] = md5hash(getpath('modpacks', slug, 'background.png'));
    }
    return m;
}

function buil(slug, build, include) {
    try {
        var b = loadfile('modpacks', slug, 'builds', build+'.json');
    } catch(e) {
        console.log(`build.json does not exist for modpack ${slug} build ${build}!`);
        return { error: `build.json does not exist for modpack ${slug} build ${build}!` };
    }
    var m = b.mods;
    var n = [];
    m.forEach(x => {
        var ext = 'jar';
        if (exist('mods', x.name, 'versions', x.version+'.zip')) ext = 'zip';
        if (exist('mods', x.name, 'versions', x.version+'.json')) ext = 'json';
        var v = 'mods/'+x.name+'/versions/'+x.version+'.'+ext;
        var md5 = md5hash(config.data+v);
        var url = config.addr+v;
        if (include && include=='mods') {
            try {
                var temp = loadfile('mods', x.name, 'mod.json');
                temp['version'] = x.version;
                temp['md5'] = md5;
                temp['url'] = url;
                return n.push(temp);
            } catch (e) {
                // oh noes it didn't work, let's just fall back onto the other one
            }
        }
        n.push({
            name: x.name,
            version: x.version,
            md5: md5hash(config.data+v),
            url: config.addr+v
        });
    });
    b['mods'] = n;
    return b;
}

module.exports = {
    config,
    webui: require('./webui'),
    modpack: (opts) => {
        return new Promise((resolve, reject) => {
            var slug = opts.slug,
                build = opts.build,
                include = opts.include;
            if (slug) {
                if (build) {
                    if (exist('modpacks', slug, 'builds', build+'.json')) {
                        let builddata = buil(slug, build, include);
                        if(!builddata.error) resolve(builddata);
                        else reject(builddata);
                    } else {
                        resolve({
                            error: 'Build does not exist!'
                        });
                    }
                } else {
                    if (exist('modpacks', slug)) {
                        let modpackdata = modpack(slug);
                        if(!modpackdata.error) resolve(modpackdata);
                        else reject(modpackdata);
                    } else {
                        resolve({
                            error: 'Modpack does not exist!'
                        });
                    }
                }
            } else {
                var modpacks = {};
                fs.readdirSync(getpath('modpacks')).forEach(x => {
                    try {
                        if (include && include=='full') return modpacks[x] = modpack(x);
                        modpacks[x] = loadfile('modpacks', x, 'modpack.json')['display_name'];
                    } catch(e) {
                        console.error(`modpack.json does not exist for ${x}!`);
                        reject({
                            error: `modpack.json does not exist for ${x}!`
                        });
                    }
                });
                resolve({
                    modpacks,
                    mirror_url: 'http://mirror.technicpack.net/Technic/'
                });
            }
        });
    },
    mod: (opts) => {
        return new Promise((resolve, reject) => {
            var name = opts.name,
                version = opts.ver,
                include = opts.include;
            if (name) {
                if (version) {
                    if (exist('mods', name, 'versions', version+'.jar')) {
                        resolve(ver(name, version, 'jar'));
                    } else if (exist('mods', name, 'versions', version+'.zip')) {
                        resolve(ver(name, version, 'zip'));
                    } else if (exist('mods', name, 'versions', version+'.json')) {
                        resolve(ver(name, version, 'json'));
                    } else {
                        resolve({
                            error: 'Mod version does not exist!'
                        });
                    }
                } else {
                    if (exist('mods', name)) {
                        let moddata = mod(name);
                        if(!moddata.error) resolve(moddata);
                        else reject(moddata);
                    } else {
                        resolve({
                            error: 'Mod does not exist!'
                        });
                    }
                }
            } else {
                var mods = {};
                fs.readdirSync(getpath('mods')).forEach(x => {
                    try {
                        if (include && include=='full') return mods[x] = mod(x);
                        mods[x] = loadfile('mods', x, 'mod.json')['pretty_name'];
                    } catch(e) {
                        console.error(`mod.json does not exist for ${x}!`);
                        reject({
                            error: `mod.json does not exist for ${x}!`
                        });
                    }
                });
                resolve({
                    mods
                });
            }
        });
    }
};
