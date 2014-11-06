#!/usr/bin/env node
'use strict';

var host = 'blogs.hbr.org';
var fn = function ($, tweetInfo) {
  console.log('\n\n@%s: %s', host, tweetInfo.url);

  var $title = $('h1#articleTitle').text().trim();
  console.log('\ttitle: %s', $title);

  var byline = $('p.byline').text().trim();
  var $author = byline.substring(byline.search('by')+3, byline.search('&nbsp;'));
  console.log('\tauthour: %s', $author);

  var $description = $('#articleBody').html();
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
