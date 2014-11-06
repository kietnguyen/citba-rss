#!/usr/bin/env node
'use strict';

var host = 'analyticbridge.com';
var fn = function ($, tweetInfo) {
  console.log('\n\n@%s: %s', host, tweetInfo.url);

  var $title = $('.tb h1').text().trim();
  console.log('\ttitle: %s', $title);

  var $author = $('.navigation.byline li a').eq(1).text().trim();
  console.log('\tauthour: %s', $author);

  var $description = $('.postbody .xg_user_generated').html();
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
