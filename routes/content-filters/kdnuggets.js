#!/usr/bin/env node
'use strict';

var host = 'kdnuggets.com';
var fn = function ($, tweetInfo) {
  console.log('\n\n@%s: %s', host, tweetInfo.url);

  var $title = $("#content h1").text().trim();
  console.log('\ttitle: %s', $title);

  var $author = "KDnuggets";
  console.log('\tauthour: %s', $author);

  var $description = $('#post-').html();
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
