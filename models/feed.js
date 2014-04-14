#!/usr/bin/env node
"use strict";

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var FeedSchema = new Schema({
  title: { type: String, trim: true },
  description: { type: String, trim: true },
  url: { type: String, trim: true },
  author: { type: String, trim: true },
  date: { type: Date }
});

// Feed validation
FeedSchema.path('title').required(true, 'Title cannot be blank');
FeedSchema.path('description').required(true, 'Description cannot be blank');
FeedSchema.path('url').required(true, 'Url cannot be blank');
FeedSchema.path('author').required(true, 'Author cannot be blank');
FeedSchema.path('date').required(true, 'Date cannot be blank');

FeedSchema.methods = {

};

FeedSchema.statics = {

};

mongoose.model("Feed", FeedSchema);
