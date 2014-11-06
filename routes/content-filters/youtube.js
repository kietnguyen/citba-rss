#!/usr/bin/env node
'use strict';

var querystring = require('querystring');

var host = 'youtube.com';
var fn = function ($, tweetInfo) {
  console.log('\n\n@youtube: ' + tweetInfo.url);

  var title = $('.watch-title').text().trim();
  console.log('\ttitle: ' + title);

  var author = $('.yt-user-name').first().text();
  console.log('\tauthour: ' + author);

  var v = querystring.parse(tweetInfo.url.match(/v=.+/)[0]).v;
  $('#watch-description-text').prepend('<iframe width="560" height="315" src="//www.youtube.com/embed/' + v + '" frameborder="0" allowfullscreen></iframe>');
  var description = $('#watch-description-text').html();
  //console.log('\tdescription: ' + description);

  if (typeof title === 'string' &&
      typeof author === 'string' &&
      typeof description === 'string') {

    return {
      title: title,
      description: description,
      url: tweetInfo.url,
      author: author,
      date: tweetInfo.date
    };

  } else {

    return null;

  }

};

module.exports = {};
module.exports[host] = fn;
