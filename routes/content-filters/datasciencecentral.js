#!/usr/bin/env node
'use strict';

var host = 'datasciencecentral.com';
var fn = function ($, tweetInfo) {
  console.log('\n\n@%s: %s', host, tweetInfo.url);

  var $title = $('.xg_headline .tb h1').text().trim();
  console.log('\ttitle: %s', $title);

  var $author = $('.xg_headline .byline a').eq(1).text().trim();
  console.log('\tauthour: %s', $author);

  $('.entry-content #jp-post-flair').remove();
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
