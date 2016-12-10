"use strict";

const Pins = require("./models/pins");

const seedPins = [
  {
    "user": "Joe",
    "title": "Walk the Golden Gate",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/GoldenGateBridge-001.jpg/1024px-GoldenGateBridge-001.jpg",
    "address": "",
    "event": "",
    "views": 22,
    "likes": 4
  },
  {
    "user": "Joe",
    "title": "Visit the Exploratorium",
    "image": "https://upload.wikimedia.org/wikipedia/commons/2/28/Inside_exploratorium.jpg",
    "address": "",
    "event": "",
    "views": 18,
    "likes": 5
  },
  {
    "user": "Joe",
    "title": "Catch the Sunset at Land's End",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Lands_End_-_San_Francisco_zum_Meer.JPG/240px-Lands_End_-_San_Francisco_zum_Meer.JPG",
    "address": "",
    "event": "",
    "views": 24,
    "likes": 5
  },
  {
    "user": "Joe",
    "title": "Grab Lunch in the Ferry Building",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/San_Francisco_Ferry_Building_%28cropped%29.jpg/1280px-San_Francisco_Ferry_Building_%28cropped%29.jpg",
    "address": "",
    "event": "",
    "views": 14,
    "likes": 3
  },
  {
    "user": "Joe",
    "title": "Visit the Sutro Baths",
    "image": "https://upload.wikimedia.org/wikipedia/commons/8/8c/Sutrobaths.jpg",
    "address": "",
    "event": "",
    "views": 20,
    "likes": 2
  },
  {
    "user": "Joe",
    "title": "Eat Italian Food in North Beach",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/SF_Filbert_St_North_Beach_CA.jpg/800px-SF_Filbert_St_North_Beach_CA.jpg",
    "address": "",
    "event": "",
    "views": 18,
    "likes": 1
  }
];

module.exports = () => {
  Pins.find({}, (error, pins) => {
    if (error) {
      return next(error);
    }
    if (!pins.length) {
      Pins.create(seedPins, (error, pins) => {
        if (error) {
          return next(error);
        }
      });
    }
  });
}
