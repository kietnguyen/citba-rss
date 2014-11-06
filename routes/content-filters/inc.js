#!/usr/bin/env node
'use strict';

var host = 'inc.com';
var fn = function ($, tweetInfo) {
  console.log('\n\n@%s: %s', host, tweetInfo.url);

  var $author = $('#headline .byline a').text().trim();
  console.log('\tauthour: %s', $author);

  $('#headline .byline').remove();
  var $title = $('#headline').text().trim();
  console.log('\ttitle: %s', $title);

  var $description = $('.bodycopy').html();
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
