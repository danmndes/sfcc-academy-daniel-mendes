"use strict";
var server = require("server");

server.use('Start', function (req, res, next) {
    var URLUtils = require("dw/web/URLUtils");
    var Resource = require("dw/web/Resource");
    var ContentMgr = require('dw/content/ContentMgr');

    var profileForm = server.forms.getForm("training");
    profileForm.clear();

    res.render("trainingform", {
        title: Resource.msg("training.form.title.submit", "forms", null),
        profileForm: profileForm,
        actionUrl: URLUtils.url("Training-SubmitRegistration").toString()
    });

    next();
});

module.exports = server.exports();
