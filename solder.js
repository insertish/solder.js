const solder = require('./solderjs'),
    {getpath} = require('./solderjs/util'),
    config = solder.config,
    express = require('express'),
    app = express(),
    fs = require('fs');

function json(res, json) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(json, null, config.jpp));
}

function promise(res, promise) {
    promise.then(data => {
        json(res, data);
    }).catch(err => {
        res.status(500);
        json(res, {error: err.message});
    })
}

app.use((req, res, next) => {
    console.log(req.url);
    next();
});

app.get('/', (req, res) => {
    res.send(config.api+' // '+config.ver);
});

app.get('/api', (req, res) => {
    json(res, {
        api: config.api,
        version: config.ver,
        stream: config.stream
    });
});

app.get('/api/verify/:token', (req, res) => {
    if (config.solder_key.indexOf(req.params.token) > -1) {
        json(res, {
            valid: 'Key Validated.',
            name: config.technic_key,
            created_at: config.technic_cat
        });
    } else {
        json(res, {
            no: true
        });
    }
});

app.get('/api/modpack', (req, res) => {
    if (req.query.include && req.query.include=='full') return promise(res, solder.modpack_full());
    promise(res, solder.modpack({}));
});
app.get('/api/modpack/:slug', (req, res) => {
    promise(res, solder.modpack({slug: req.params.slug}));
});
app.get('/api/modpack/:slug/:build', (req, res) => {
    promise(res, solder.modpack({slug: req.params.slug, build: req.params.build, include: req.query.include}));
});
app.get('/api/mod/:modname', (req, res) => {
    promise(res, solder.mod(req.params.modname));
});
app.get('/api/mod/:modname/:modversion', (req, res) => {
    promise(res, solder.mod(req.params.modname, req.params.modversion));
});

app.get('/api/mods/:modname/versions/:modfile', (req, res) => {
    res.send(fs.readFileSync(getpath('mods', req.params.modname, 'versions', req.params.modfile)));
});
app.use('/api/resources/', express.static(getpath('modpacks')));

app.listen(config.port, () => {
    console.log('solder.js listening on :'+config.port);
});