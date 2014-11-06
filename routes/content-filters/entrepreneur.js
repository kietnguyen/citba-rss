#!/usr/bin/env node
'use strict';

var host = 'entrepreneur.com';
var fn = function ($, tweetInfo) {
  console.log('\n\n@%s: %s', host, tweetInfo.url);

  var $title = $('.article-title').text().trim();
  console.log('\ttitle: %s', $title);

  var $author = $('.title.author').text().trim();
  console.log('\tauthour: %s', $author);

  $('#article .Dbio').remove();
  $('#article .moretopics').remove();
  $('#article .prov').remove();
  var $description = $('#article').html();
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
