var data = {
    modpacks: {},
    mods: {}
};

var dom = {
    update: {
        mods: function() {
            // mod data has updated, reload it
            $('#mod_counter').html(Object.keys(data.mods).length);
        },
        modpacks: function() {
            // modpack data has updated, reload it
            $('#modpack_counter').html(Object.keys(data.modpacks).length);
        }
    }
};

$(document).ready(function() {
    $.get('/api/mod?include=full', function(resp) {
        data.mods = resp.mods;
        dom.update.mods();
    });
    $.get('/api/modpack?include=full', function(resp) {
        data.modpacks = resp.modpacks;
        dom.update.modpacks();
    });
});