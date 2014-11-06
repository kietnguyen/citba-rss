#!/usr/bin/env node
'use strict';

var host = 'beautifuldata.net';
var fn = function ($, tweetInfo) {
  console.log('\n\n@%s: %s', host, tweetInfo.url);

  var $title = $(".post-title h1").text().trim();
  console.log('\ttitle: %s', $title);

  var $author = $(".author a").text().trim();
  console.log('\tauthour: %s', $author);

  $('.entry_content sharedaddy').remove();
  var $description = $('.entry_content').html();
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
