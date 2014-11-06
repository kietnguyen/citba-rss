#!/usr/bin/env node
'use strict';

var host = 'r-bloggers.com';
var fn = function ($, tweetInfo) {
  console.log('\n\n@%s: %s', host, tweetInfo.url);

  var $title = $("#leftcontent h1").text().trim();
  console.log('\ttitle: %s', $title);

  var $author = $(".meta a").text().trim();
  console.log('\tauthour: %s', $author);

  $('.entry social4i').remove();
  var $description = $('.entry').html();
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
