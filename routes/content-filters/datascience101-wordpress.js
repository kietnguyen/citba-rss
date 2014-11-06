#!/usr/bin/env node
'use strict';

var host = 'datascience101.wordpress.com';
var fn = function ($, tweetInfo) {
  console.log('\n\n@%s: %s', host, tweetInfo.url);

  var $title = $(".entry-title").text().trim();
  console.log('\ttitle: %s', $title);

  var $author = $(".author-link").text().trim();
  console.log('\tauthour: %s', $author);

  $('.entry-content #jp-post-flair').remove();
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
