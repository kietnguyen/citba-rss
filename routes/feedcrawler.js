#!/usr/bin/env node
"use strict";

var _ = require('lodash'),
    cheerio = require('cheerio'),
    querystring = require('querystring');

var sep = "########################################";

var preprocessing = function (html) {

};

var post_processing = function (html) {
  var $ = cheerio.load(html);

  // Remove all css classes
  $().removeClass();

  // Remove empty paragraph <p></p>
  var len = $("p").length;
  var range = _.range(len);
  var indexRemoved = _.chain(range)
  .map(function(val) {
    var valHtml = $("p").eq(val).html().trim();
    if (valHtml === "" || valHtml.match(/^&nbsp;+/g)) {
      return val;
    } else {
      return -1;
    }
  })
  .without(-1)
  .value()
  .reverse();

  _.each(indexRemoved, function(val) {
    $("p").eq(val).remove();
  });


  // Todo: Continue reading @ <host> at bottom of each feed
  var continueReadingHtml = "<a style=\"float:right;\" href=\" <%= url %>\">Continue reading at <%= get_host(url) %></a>";

  return $.html();
};

var analyticbridge = function ($, tweetInfo) {
  console.log(sep);
  console.log("@analyticbridge: " + tweetInfo.url);

  var title = $(".tb h1").text();
  console.log("\ttitle: " + title);

  var author = $(".navigation.byline li a").eq(1).text();
  console.log("\tauthour: " + author);

  var description = $('.postbody .xg_user_generated').html();
  //console.log("\tdescription: " + description);

  if (typeof title === "string" && typeof author === "string" && typeof description === "string") {
    return {
      title: title,
      description: description,
      url: tweetInfo.url,
      author: author,
      date: tweetInfo.date
    };

  } else return null;
};

var analytictalent = function ($, tweetInfo) {
  console.log(sep);
  console.log("@analytictalent: " + tweetInfo.url);

  var title = $('h1').text();
  console.log("\ttitle: " + title);

  var author = $('.aiApplyCompanyName').text().replace(/[\t\r\n\v\f]+/, '').trim();
  console.log("\tauthour: " + author);

  $('.aiJobRequirements h3').remove();
  var description = $('.aiJobRequirements').html();
  //console.log("\tdescription: " + description);

  if (typeof title === "string" && typeof author === "string" && typeof description === "string") {
    return {
      title: title,
      description: description,
      url: tweetInfo.url,
      author: author,
      date: tweetInfo.date
    };

  } else return null;
};

var beautifuldata = function ($, tweetInfo) {
  console.log(sep);
  console.log("@beautifuldata: " + tweetInfo.url);

  var title = $(".post-title h1").text();
  console.log("\ttitle: " + title);

  var author = $(".author a").text();
  console.log("\tauthour: " + author);

  $('.entry_content sharedaddy').remove();
  var description = $('.entry_content').html();
  //console.log("\tdescription: " + description);


  if (typeof title === "string" && typeof author === "string" && typeof description === "string") {
    return {
      title: title,
      description: description,
      url: tweetInfo.url,
      author: author,
      date: tweetInfo.date
    };

  } else return null;
};

var cio = function ($, tweetInfo) {
  console.log(sep);
  console.log("@cio: " + tweetInfo.url);

  var title = $('.headline').text();
  console.log("\ttitle: " + title);

  var author = _.find($('#byline').html().split(/[\t\r\n\v\f]+/), function (str) {
    return (str.search('By') === 0);
  }).replace('By ', '');
  console.log("\tauthor: " + author);

  $('.body_content #continue_reading').remove();
  var description = $('.body_content').html();
  //console.log("\tdescription: " + description);

  if (typeof title === "string" && typeof author === "string" && typeof description === "string") {
    return {
      title: title,
      description: description,
      url: tweetInfo.url,
      author: author,
      date: tweetInfo.date
    };

  } else return null;
};

var datascience101 = function ($, tweetInfo) {
  console.log(sep);
  console.log("@datascience101: " + tweetInfo.url);

  var title = $(".entry-title").text();
  console.log("\ttitle: " + title);

  var author = $(".author-link").text();
  console.log("\tauthour: " + author);

  $('.entry-content #jp-post-flair').remove();
  var description = $('.entry-content').html();
  //console.log("\tdescription: " + description);

  if (typeof title === "string" && typeof author === "string" && typeof description === "string") {
    return {
      title: title,
      description: description,
      url: tweetInfo.url,
      author: author,
      date: tweetInfo.date
    };

  } else return null;
};

var datasciencecentral = function ($, tweetInfo) {
  console.log(sep);
  console.log("@datasciencecentral: " + tweetInfo.url);

  var title = $('.xg_headline .tb h1').text();
  console.log("\ttitle: " + title);

  var author = $('.xg_headline .byline a').eq(1).text();
  console.log("\tauthour: " + author);

  $('.entry-content #jp-post-flair').remove();
  var description = $('.postbody .xg_user_generated').html();
  //console.log("\tdescription: " + description);

  if (typeof title === "string" && typeof author === "string" && typeof description === "string") {
    return {
      title: title,
      description: description,
      url: tweetInfo.url,
      author: author,
      date: tweetInfo.date
    };

  } else return null;
};

var directionsmag = function ($, tweetInfo) {
  console.log(sep);
  console.log("@directionsmag: " + tweetInfo.url);

  var title = $('.title').text();
  console.log("\ttitle: " + title);

  var author = $('.info .source a, .info .authors a').text();
  console.log("\tauthour: " + author);

  var description = $('.content').html();
  //console.log("\tdescription: " + description);

  if (typeof title === "string" && typeof author === "string" && typeof description === "string") {
    return {
      title: title,
      description: description,
      url: tweetInfo.url,
      author: author,
      date: tweetInfo.date
    };

  } else return null;
};

var entrepreneur = function ($, tweetInfo) {
  console.log(sep);
  console.log("@entrepreneur: " + tweetInfo.url);

  var title = $('.article-title').text();
  console.log("\ttitle: " + title);

  var author = $('.title.author').text();
  console.log("\tauthour: " + author);

  $('#article .Dbio').remove();
  $('#article .moretopics').remove();
  $('#article .prov').remove();
  var description = $('#article').html();
  //console.log("\tdescription: " + description);

  if (typeof title === "string" && typeof author === "string" && typeof description === "string") {
    return {
      title: title,
      description: description,
      url: tweetInfo.url,
      author: author,
      date: tweetInfo.date
    };

  } else return null;
};

var fastcoexist = function ($, tweetInfo) {
  console.log(sep);
  console.log("@fastcoexist: " + tweetInfo.url);

  var title = $('h1.title').text();
  console.log("\ttitle: " + title);

  var author = $('h4.author-name').text();
  console.log("\tauthour: " + author);

  var description = $('.body').html();
  //console.log("\tdescription: " + description);

  if (typeof title === "string" && typeof author === "string" && typeof description === "string") {
    return {
      title: title,
      description: description,
      url: tweetInfo.url,
      author: author,
      date: tweetInfo.date
    };

  } else return null;
};

var hbr = function ($, tweetInfo) {
  console.log(sep);
  console.log("@hbr: " + tweetInfo.url);

  var title = $('h1#articleTitle').text();
  console.log("\ttitle: " + title);

  var byline = $('p.byline').text();
  var author = byline.substring(byline.search('by')+3, byline.search('&nbsp;'));
  console.log("\tauthor: " + author);

  var description = $('#articleBody').html();
  //console.log("\tdescription: " + description);

  if (typeof title === "string" && typeof author === "string" && typeof description === "string") {
    return {
      title: title,
      description: description,
      url: tweetInfo.url,
      author: author,
      date: tweetInfo.date
    };

  } else return null;
};

// only work with http://www.ibmbigdatahub.com/blog
var ibmbigdatahub = function ($, tweetInfo) {
  console.log(sep);
  console.log("@ibmbigdatahub: " + tweetInfo.url);

  // return if not a blog post
  if (tweetInfo.url.split('/')[3] !== 'blog') return null;

  var title = $('.field-blog-title').text();
  console.log("\ttitle: " + title);

  var author = $('.field-user-fullname a').text();
  console.log("\tauthor: " + author);

  $('.field-item iframe').remove();
  var description = $('.field-item').html();
  //console.log("\tdescription: " + description);

  if (typeof title === "string" && typeof author === "string" && typeof description === "string") {
    return {
      title: title,
      description: description,
      url: tweetInfo.url,
      author: author,
      date: tweetInfo.date
    };

  } else return null;
};

var inc = function ($, tweetInfo) {
  console.log(sep);
  console.log("@inc: " + tweetInfo.url);

  var author = $('#headline .byline a').text();
  console.log("\tauthour: " + author);

  $('#headline .byline').remove();
  var title = $('#headline').text().trim();
  console.log("\ttitle: " + title);

  var description = $('.bodycopy').html();
  //console.log("\tdescription: " + description);

  if (typeof title === "string" && typeof author === "string" && typeof description === "string") {
    return {
      title: title,
      description: description,
      url: tweetInfo.url,
      author: author,
      date: tweetInfo.date
    };

  } else return null;
};

var informationweek = function ($, tweetInfo) {
  console.log(sep);
  console.log("@informationweek: " + tweetInfo.url);

  var title = $('#article-main header').text();
  console.log("\ttitle: " + title);

  var author = $('.author-info-block .color-link').text();
  console.log("\tauthour: " + author);

  $('#article-main header').remove();
  $('#article-main .divsplitter').remove();
  $('#article-main .italic').nextAll().remove();
  $('#article-main .italic').remove();
  var description = $('#article-main').html();
  //console.log("\tdescription: " + description);

  if (typeof title === "string" && typeof author === "string" && typeof description === "string") {
    return {
      title: title,
      description: description,
      url: tweetInfo.url,
      author: author,
      date: tweetInfo.date
    };

  } else return null;
};

var jeffheaton = function ($, tweetInfo) {
  console.log(sep);
  console.log("@jeffheaton: " + tweetInfo.url);

  var title = $(".entry-title").text();
  console.log("\ttitle: " + title);

  var author = "Jeff Heaton";
  console.log("\tauthour: " + author);

  var description = $('.entry-content').html();
  //console.log("\tdescription: " + description);

  if (typeof title === "string" && typeof author === "string" && typeof description === "string") {
    return {
      title: title,
      description: description,
      url: tweetInfo.url,
      author: author,
      date: tweetInfo.date
    };

  } else return null;
};

var kdnuggets = function ($, tweetInfo) {
  console.log(sep);
  console.log("@kdnuggets: " + tweetInfo.url);

  var title = $("#content h1").text();
  console.log("\ttitle: " + title);

  var author = "KDnuggets";
  console.log("\tauthour: " + author);

  var description = $('#post-').html();
  //console.log("\tdescription: " + description);

  if (typeof title === "string" && typeof author === "string" && typeof description === "string") {
    return {
      title: title,
      description: description,
      url: tweetInfo.url,
      author: author,
      date: tweetInfo.date
    };

  } else return null;
};

var r_bloggers = function ($, tweetInfo) {
  console.log(sep);
  console.log("@r_bloggers: " + tweetInfo.url);

  var title = $("#leftcontent h1").text();
  console.log("\ttitle: " + title);

  var author = $(".meta a").text();
  console.log("\tauthour: " + author);

  $('.entry social4i').remove();
  var description = $('.entry').html();
  //console.log("\tdescription: " + description);

  if (typeof title === "string" && typeof author === "string" && typeof description === "string") {
    return {
      title: title,
      description: description,
      url: tweetInfo.url,
      author: author,
      date: tweetInfo.date
    };
  } else return null;
};

var spectrum_ieee = function ($, tweetInfo) {
  console.log(sep);
  console.log("@spectrum_ieee: " + tweetInfo.url);

  var title = $('.article-detail h1').text();
  console.log("\ttitle: " + title);

  var byline = $('.metadata .byline').text();
  var author = byline.substring(byline.search('By')+3, byline.search('Posted')).trim();
  console.log("\tauthour: " + author);

  $('.article-detail #artImg').prevAll().remove();
  $('.article-detail .entry-content').nextAll().remove();
  var description = $('.article-detail').html();
  //console.log("\tdescription: " + description);

  if (typeof title === "string" && typeof author === "string" && typeof description === "string") {
    return {
      title: title,
      description: description,
      url: tweetInfo.url,
      author: author,
      date: tweetInfo.date
    };
  } else return null;
};

var youtube = function ($, tweetInfo) {
  console.log(sep);
  console.log("@youtube: " + tweetInfo.url);

  var title = $(".watch-title").text().trim();
  console.log("\ttitle: " + title);

  var author = $(".yt-user-name").first().text();
  console.log("\tauthour: " + author);

  var v = querystring.parse(tweetInfo.url.match(/v=.+/)[0]).v;
  $("#watch-description-text").prepend('<iframe width="560" height="315" src="//www.youtube.com/embed/' + v + '" frameborder="0" allowfullscreen></iframe>');
  var description = $("#watch-description-text").html();
  //console.log("\tdescription: " + description);
  if (typeof title === "string" && typeof author === "string" && typeof description === "string") {
    return {
      title: title,
      description: description,
      url: tweetInfo.url,
      author: author,
      date: tweetInfo.date
    };
  } else return null;

};

var get_host = function (url) {
  var host = url.toLowerCase().match(/^http:\/\/(www\.)?[0-9a-zA-Z-_.]+\.(com|org|net)/ig);
  if (host === null || host.length !== 1) {
    console.warn(" Error: regexp is not working @ get_host :: url = " + url);
    return null;
  }
  var splitUrl = host[0].split(/\.|\//);
  var len = splitUrl.length;
  if (splitUrl[len-3] !== '' && splitUrl[len-3] !== 'www') {
    return [splitUrl[len - 3], splitUrl[len - 2], splitUrl[len - 1]].join('.');
  } else {
    return [splitUrl[len - 2], splitUrl[len - 1]].join('.');
  }
};

exports.get_feed_item = function (html, tweetInfo) {
  var $ = cheerio.load(html);
  $('script').remove();
  //console.log(html);

  var host = get_host(tweetInfo.url);

  console.log(host);
  var item = null;
  switch (host) {
    case 'analyticbridge.com':
      item = analyticbridge($, tweetInfo);
      break;

    case 'beautifuldata.net':
      item = beautifuldata($, tweetInfo);
      break;

    case 'careers.analytictalent.com':
      item = analytictalent($, tweetInfo);
      break;

    case 'cio.com':
      item = cio($, tweetInfo);
      break;

    case 'datascience101.wordpress.com':
      item = datascience101($, tweetInfo);
      break;

    case 'datasciencecentral.com':
      item = datasciencecentral($, tweetInfo);
      break;

    case 'directionsmag.com':
      item = directionsmag($, tweetInfo);
      break;

    case 'entrepreneur.com':
      item = entrepreneur($, tweetInfo);
      break;

    case 'fastcoexist.com':
      item = fastcoexist($, tweetInfo);
      break;

    case 'blogs.hbr.org':
      item = hbr($, tweetInfo);
      break;

    case 'ibmbigdatahub.com':
      item = ibmbigdatahub($, tweetInfo);
      break;

    case 'inc.com':
      item = inc($, tweetInfo);
      break;

    case 'informationweek.com':
      item = informationweek($, tweetInfo);
      break;

    case 'jeffheaton.com':
      item = jeffheaton($, tweetInfo);
      break;

    case 'kdnuggets.com':
      item = kdnuggets($, tweetInfo);
      break;

    case 'r-bloggers.com':
      item = r_bloggers($, tweetInfo);
      break;

    case 'spectrum.ieee.org':
      item = spectrum_ieee($, tweetInfo);
      break;

    case 'youtube.com':
      item = youtube($, tweetInfo);
      break;

    default:
      console.log(tweetInfo.url);
      break;
  }

  if (item !== null)
    item.description = post_processing(item.description);

  return item;
};
