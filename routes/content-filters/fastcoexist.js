#!/usr/bin/env node
'use strict';

var host = 'fastcoexist.com';
var fn = function ($, tweetInfo) {
  console.log('\n\n@%s: %s', host, tweetInfo.url);

  var $title = $('h1.title').text().trim();
  console.log('\ttitle: %s', $title);

  var $author = $('h4.author-name').text().trim();
  console.log('\tauthour: %s', $author);

  var $description = $('.body').html();
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
