#!/usr/bin/env node
'use strict';

var host = 'directionsmag.com';
var fn = function ($, tweetInfo) {
  console.log('\n\n@%s: %s', host, tweetInfo.url);

  var $title = $('.title').text().trim();
  console.log('\ttitle: %s', $title);

  var $author = $('.info .source a, .info .authors a').text().trim();
  console.log('\tauthour: %s', $author);

  var $description = $('.content').html();
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
