#!/usr/bin/env node
"use strict";

var cheerio = require('cheerio'),
    //_ = require('lodash'),
    //Readability = require('readabilitySAX').Readability,
    minify = require('html-minify').minify,
    URL = require('url'),
    cfilter = require('./cfilter');

var minifyOpts = {
  removeComments:  true,
  removeCommentsFromCDATA: true,
  removeCDATASectionsFromCDATA:  true,
  collapseWhitespace: true,
  collapseBooleanAttributes: true,
  removeAttributeQuotes: true,
  removeRedundantAttributes: true,
  useShortDoctype: true,
  removeEmptyAttributes: true,
  removeOptionalTags: true,
  removeEmptyElements: true
};

var getBaseURI = function(url) {
  var aLink = URL.parse(url);
  return aLink.protocol + "//" + aLink.host + aLink.pathname;
};

var post_processing = function (options) {
  var $ = cheerio.load(options.html);

  // Remove all css classes
  $().removeClass();

  // Link to original article
  var origContentHtml = "<p><em>Visit the <a href=\"" +
      getBaseURI(options.url) +
      "\">orginal article</a> to read more.</em></p>";

  return minify(options.html + origContentHtml, minifyOpts);
};

// Get host of a URL
var get_host = function (url) {
  // get host using regular expression
  var host = url.toLowerCase().match(
    /^http:\/\/(www\.)?[0-9a-zA-Z-_.]+\.(com|org|net|edu)/ig);
  if (host === null || host.length !== 1) {
    console.warn(" Error: regexp is not working @ get_host :: url = " + url);
    return null;
  }

  // check if URL has subdomain
  //  if yes, also include subdomain
  var splitUrl = host[0].split(/\.|\//);
  var len = splitUrl.length;
  if (splitUrl[len-3] !== '' && splitUrl[len-3] !== 'www') {
    // case 1: has subdomain
    return [splitUrl[len - 3], splitUrl[len - 2], splitUrl[len - 1]].join('.');

  } else {
    // case 2: has no subdomain
    return [splitUrl[len - 2], splitUrl[len - 1]].join('.');
  }
};

exports.get_feed_item = function (html, tweetInfo) {
  var $ = cheerio.load(html);
  $('script').remove();
  //console.log(html);

  var host = get_host(tweetInfo.url),
      item = null;
  if (cfilter[host]) {
    item = cfilter[host]($, tweetInfo);
  } else {
    // TODO: record missing URL's processing functions
    console.log('\n\nNO CONTENT FILTER:\n' + tweetInfo.url);
  }

  if (item !== null && item.title &&
      item.author && item.description) {
    // post processing
    item.description = post_processing({
      url: tweetInfo.url,
      html: item.description
    });

  } else {
    // content must have at least these info: title, author, description;
    //  otherwise, return nothing
    item = null;
  }

  return item;
};
