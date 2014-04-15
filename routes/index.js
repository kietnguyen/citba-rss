#!/usr/bin/env node
"use strict";

require("../models/feed.js");
var twitterAPI = require("../config/api-keys/twitter.js");
console.dir(twitterAPI);
var _ = require('lodash'),
    async = require('async'),
    http = require('http'),
    express = require('express'),
    cheerio = require('cheerio'),
    twitter = require('simple-twitter'),
    RSS = require('rss'),
    unshort = require('unshort'),
    feedcrawler = require('./feedcrawler.js'),
    mongoose = require('mongoose'),
    Feed = mongoose.model("Feed");

var sep = "##########";

var twit = new twitter(
  twitterAPI.consumer_key,
  twitterAPI.consumer_secret_key,
  twitterAPI.access_token,
  twitterAPI.access_token_secret,
  false
);

var feedOptions = {
  title: 'CITBA RSS',
  description: 'CITBA RSS Feed',
  generator: 'CITBA Feed Generator',
  site_url: 'http://www.informationintelligence.org/'
};

var done = function(err, res, options) {
  if (err) { console.error(err); }

  console.dir(options.httpStatusCode);

  return res.render('error', {
    title: "CITBA RSS | Something went wrong",
    httpStatusCode: options.httpStatusCode
  } );
};

exports.get_rss_content = function() {
  var feed = new RSS(feedOptions);
  twit.get('statuses/user_timeline', function (error, data) {
    var jsonData = JSON.parse(data);
    //console.dir(jsonData);

    var numOfFeeds = jsonData.length,
        feedNum = 0,
        feedAdded = 0;
    // TODO: using async (faster?)
    _.each(jsonData, function (tweet) {
      //var tweet = jsonData[13];

      var urls = tweet.text.match(/http:\/\/t.co\/[0-9A-Za-z]+/g);
      if (urls && urls.length > 0) {
        // TODO: compare urls and use longer one
        var url = urls[urls.length - 1];

        unshort(url, function (err, lUrl) {
          if (err) {
            console.warn(sep + err.message + sep);
            console.log("Short url: " + url);
          }

          // convert to https to http, if needed
          if (lUrl.substr(0, 5) === "https") {
            lUrl = "http" + lUrl.substr(5);
          }
          //console.log("Long url: " + lUrl);

          var oldFeed = _.chain(feed.items)
          .map(function(item) {
            return item.url;
          })
          .contains(lUrl)
          .value();

          if (oldFeed) {
            //expressRes.send(feed.xml());
            feedNum++;
            if (feedNum === numOfFeeds) {
              console.log("got them all? " + feed.items.length + " vs " + numOfFeeds);
              //expressRes.send(feed.xml());
            }
          } else {
            var tweetInfo = {
              id: tweet.id,
              date: tweet.created_at,
              url: lUrl
            };

            var html = "";
            var req = http.request(lUrl, function (res) {
              res.on("data", function (chunk) {
                html += chunk;
              });

              res.on("end", function () {
                //console.log(html);
                var item = feedcrawler.get_feed_item(html, tweetInfo);

                if (item !== null) {
                  //feed.item(item);
                  feedAdded++;
                  Feed.findOneAndUpdate(
                    { url: item.url },
                    item,
                    { upsert: true },
                    function(err, saveRes) {
                      if (err) { done(err, res, { httpStatusCode: 500 }); }

                      //console.dir(saveRes);
                    });
                }
                //console.dir(item);

                feedNum++;
                if (feedNum === numOfFeeds) {
                  console.log("got them all? " + feedAdded + " vs " + numOfFeeds);
                  //expressRes.send(feed.xml());
                }

                //expressRes.send(feed.xml());
              });
            });

            req.on("err", function (err) {
              console.warn(err.message);
            });

            req.end();
          }

        });

      } else {
        console.dir(tweet.text);
        feedNum++;
      }

    });
  });
};

exports.index = function(req, res) {
  res.render('index');
};

exports.ba = function(req, res) {
  Feed.aggregate(
    { $project: { _id: 0, author: 1, date: 1, description: 1, title: 1, url: 1 } },
    { $match: { url: { $not: /http:\/\/careers.analytictalent.com\/.*/i } } },
    { $sort: { date: -1 } },
    { $limit: 20 },
    function(err, findRes) {
      if (err) { done(err, res, { httpStatusCode: 500 }); }

      //console.dir(findRes);
      feedOptions.feed_url = 'http://citba-rss.herokuapp.com/ba.xml';
      var feed = new RSS(feedOptions);
      _.each(findRes, function(item) {
        feed.item(item);
      });
      res.set('Content-Type', 'application/rss+xml');
      res.send(feed.xml());
    });
};

exports.job = function(req, res) {
  Feed.aggregate(
    { $project: { _id: 0, author: 1, date: 1, description: 1, title: 1, url: 1 } },
    { $match: { url: /http:\/\/careers.analytictalent.com\/.*/i } },
    { $sort: { date: -1 } },
    { $limit: 20 },
    function(err, findRes) {
      if (err) { done(err, res, { httpStatusCode: 500 }); }

      //console.dir(findRes);
      feedOptions.feed_url = 'http://citba-rss.herokuapp.com/job.xml';
      var feed = new RSS(feedOptions);
      _.each(findRes, function(item) {
        feed.item(item);
      });
      res.set('Content-Type', 'application/rss+xml');
      res.send(feed.xml());
    });
};
