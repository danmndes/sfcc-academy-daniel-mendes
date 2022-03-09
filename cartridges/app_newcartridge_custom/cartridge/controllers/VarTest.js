'use strict';

var server = require('server');


server.get('varTest', function (req, res, next) {
    var myVar = res.getViewData();
    myVar.example = "Just a String";
    res.setViewData(myVar);
    res.render("vartest/vartest")
    return next();
});


module.exports = server.exports();
