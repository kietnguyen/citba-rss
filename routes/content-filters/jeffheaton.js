#!/usr/bin/env node
'use strict';

var host = 'jeffheaton.com';
var fn = function ($, tweetInfo) {
  console.log('\n\n@%s: %s', host, tweetInfo.url);

  var $title = $(".entry-title").text().trim();
  console.log('\ttitle: %s', $title);

  var $author = "Jeff Heaton";
  console.log('\tauthour: %s', $author);

  var $description = $('.entry-content').html();
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
