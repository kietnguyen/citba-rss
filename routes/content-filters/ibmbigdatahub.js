#!/usr/bin/env node
'use strict';

// only work with http://www.ibmbigdatahub.com/blog
var host = 'ibmbigdatahub.com';
var fn = function ($, tweetInfo) {
  console.log('\n\n@%s: %s', host, tweetInfo.url);

  // return if not a blog post
  if (tweetInfo.url.split('/')[3] !== 'blog') return null;

  var $title = $('.field-blog-title').text().trim();
  console.log('\ttitle: %s', $title);

  var $author = $('.field-user-fullname a').text().trim();
  console.log('\tauthour: %s', $author);

  $('.field-item iframe').remove();
  var $description = $('.field-item').html();
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
