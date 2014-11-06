#!/usr/bin/env node
'use strict';

var fs = require('fs'),
    _ = require('lodash'),
    cfilter = {};

// Bootstrap all content filters
var filterPath = __dirname + '/content-filters';
fs.readdirSync(filterPath).forEach(function(file) {
  if (~file.indexOf('.js')) {
    _.extend(cfilter, require(filterPath + '/' + file));
  }
});

module.exports = cfilter;

