#!/usr/bin/env node
'use strict';

// only work with http://www.analyticsvidhya.com/blog
var host = 'analyticsvidhya.com';
var fn = function ($, tweetInfo) {
  console.log('\n\n@%s: %s', host, tweetInfo.url);

  var $title = '';
  console.log('\ttitle: %s', $title);

  var $author = '';
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
