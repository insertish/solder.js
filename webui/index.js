const express = require('express'),
    cookieParser = require('cookie-parser'),
    fs = require('fs');

var app = new express.Router(), config = null;

if (fs.existsSync('../solderjs/dev-config.js')) config = require('../solderjs/dev-config');
else config = require('../solderjs/config');

app.use(cookieParser(config.cookie));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

function y(x) {
    return fs.readFileSync(x).toString().replace(/\${root}/g, config.webroot);
}

app.get('/admin.html', (req, res) => res.redirect(config.webroot+'admin'));
app.get('/admin', (req, res) => {
    if (!req.signedCookies['solderjs_auth']) return res.redirect(config.webroot);
    if (req.signedCookies['solderjs_auth']!=config.authkey) return res.redirect(config.webroot);
    res.send(y('./public/admin.html'));
});

app.get('/logout', (req, res) => {
    res.cookie('solderjs_auth', 'LOGGED_OUT', {path: config.webroot, signed: true});
    res.redirect(config.webroot);
});

app.get('/', (req, res) => res.send(y('./public/index.html')));
app.post('/login', (req, res) => {
    if (req.body['token']) {
        if (req.body['token']==config.authkey) {
            res.cookie('solderjs_auth', config.authkey, {path: config.webroot, signed: true});
            res.redirect(config.webroot+'admin');
        } else {
            res.redirect(config.webroot+'?error=invalidkey');
        }
    } else {
        res.redirect(config.webroot+'?error=notoken');
    }
});

app.use('/', express.static('public'));

module.exports = app;