#!/usr/bin/env node
'use strict';

var host = 'datascience.berkeley.edu';
var fn = function ($, tweetInfo) {
  console.log('\n\n@%s: %s', host, tweetInfo.url);

  var $title = $("h1.blog-post-header").text().trim();
  console.log('\ttitle: %s', $title);

  var $author = $(".postmetadata a").first().text().trim();
  console.log('\tauthour: %s', $author);

  var $description = $(".entry").html();
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
