#!/usr/bin/env node
'use strict';

var host = 'careers.analytictalent.com';
var fn = function ($, tweetInfo) {
  console.log('\n\n@analytictalent: ' + tweetInfo.url);

  var title = $('h1').text().trim();
  console.log('\ttitle: ' + title);

  var author = $('.aiApplyCompanyName').text().replace(/[\t\r\n\v\f]+/, '').trim();
  console.log('\tauthor: ' + author);

  $('.aiJobRequirements h3').remove();
  var description = $('.aiJobRequirements').html();
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
