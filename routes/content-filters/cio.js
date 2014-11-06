#!/usr/bin/env node
'use strict';

var _ = require('lodash');

var host = 'cio.com';
var fn = function ($, tweetInfo) {
  console.log('\n\n@%s: %s', host, tweetInfo.url);

  var $title = $('.headline').text().trim();
  console.log('\ttitle: %s', $title);

  var $author =  _.find($('#byline').text().split(/[\t\r\n\v\f]+/), function (str) {
    return (str.search('By') === 0);
  }).replace('By ', '');
  if ($author === "") {
    $author = $('#byline a').text().trim();
  }
  console.log('\tauthour: %s', $author);

  var $description = '';
  //console.log('\tdescription: %s', $description);

  return {
    title: $title,
    description: $description,
    url: tweetInfo.url,
    author: $author,
    date: tweetInfo.date
  };
};

module.exports = {};
module.exports[host] = fn;
