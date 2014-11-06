#!/usr/bin/env node
'use strict';

var host = 'informationweek.com';
var fn = function ($, tweetInfo) {
  console.log('\n\n@%s: %s', host, tweetInfo.url);

  var $title = $('#article-main header').text().trim();
  console.log('\ttitle: %s', $title);

  var $author = $('.author-info-block .color-link').text().trim();
  console.log('\tauthour: %s', $author);

  $('#article-main header').remove();
  $('#article-main .divsplitter').remove();
  $('#article-main .italic').nextAll().remove();
  $('#article-main .italic').remove();
  var $description = $('#article-main').html();
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
