#!/usr/bin/env node
'use strict';

var host = 'spectrum.ieee.org';
var fn = function ($, tweetInfo) {
  console.log('\n\n@%s: %s', host, tweetInfo.url);

  var $title = $('.article-detail h1').text().trim();
  console.log('\ttitle: %s', $title);

  var byline = $('.metadata .byline').text().trim();
  var $author = byline.substring(byline.search('By')+3, byline.search('Posted')).trim();
  console.log('\tauthour: %s', $author);

  $('.article-detail #artImg').prevAll().remove();
  $('.article-detail .entry-content').nextAll().remove();
  var $description = $('.article-detail').html();
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
