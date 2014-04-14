#!/usr/bin/env node
"use strict";

var _ = require('underscore'),
    http = require('http'),
    express = require('express'),
    cheerio = require('cheerio'),
    twitter = require('simple-twitter'),
    RSS = require('rss'),
    unshort = require('unshort'),
    feedcrawler = require('./lib/feedcrawler.js');

var sep = "##########";

var twit = new twitter(
  'AQyMTtSZPpgaxP9rIMlA',
  'EjRrtBi3MSnNlLrfv8Sh6qUw9b0RmDTzH8whhjlEM',
  '702585769-GfdgGdBUmQkYv1Ga4r86DBlEcMyDUVHtFA9sO34K',
  'XGgYulUnB8j4BUedmpfJ0kOmbzYp9cAJptFkjjGWBhI4E',
  false
);

var feed = new RSS({
  title: 'CITBA RSS',
  description: 'CITBA RSS Feed',
  generator: 'CITBA Feed Generator',
  feed_url: 'http://citba.lazzyweb.com/ba.xml',
  site_url: 'http://www.informationintelligence.org/'
});

var get_rss_content = function() {
  feed.items = [];
  twit.get('statuses/user_timeline', function (error, data) {
    var jsonData = JSON.parse(data);
    //console.dir(jsonData);

    var numOfFeeds = jsonData.length;
    var feedNum = 0;
    _.each(jsonData, function (tweet) {
      //var tweet = jsonData[13];

      var urls = tweet.text.match(/http:\/\/t.co\/[0-9A-Za-z]+/g);
      if (urls && urls.length > 0) {
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
                  feed.item(item);
                }
                //console.dir(item);

                feedNum++;
                if (feedNum === numOfFeeds) {
                  console.log("got them all? " + feed.items.length + " vs " + numOfFeeds);
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

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};
