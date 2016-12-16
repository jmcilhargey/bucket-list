"use strict";

const Pins = require("./models/pins");

const seedPins = [
  {
    "user": "Joe",
    "title": "Walk the Golden Gate",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/GoldenGateBridge-001.jpg/1024px-GoldenGateBridge-001.jpg",
    "address": "US 101 Golden Gate Bridge, San Francisco, CA",
    "event": "",
    "views": 22,
    "likes": 4
  },
  {
    "user": "Joe",
    "title": "Visit the Exploratorium",
    "image": "https://upload.wikimedia.org/wikipedia/commons/2/28/Inside_exploratorium.jpg",
    "address": "Pier 15, The Embarcadero & Green St., San Francisco, CA 94111",
    "event": "",
    "views": 18,
    "likes": 5
  },
  {
    "user": "Joe",
    "title": "Catch the Sunset at Land's End",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Lands_End_-_San_Francisco_zum_Meer.JPG/240px-Lands_End_-_San_Francisco_zum_Meer.JPG",
    "address": "Lands End Trail, San Francisco, CA 94121",
    "event": "",
    "views": 24,
    "likes": 5
  },
  {
    "user": "Joe",
    "title": "Grab Lunch in the Ferry Building",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/San_Francisco_Ferry_Building_%28cropped%29.jpg/1280px-San_Francisco_Ferry_Building_%28cropped%29.jpg",
    "address": "1 Sausalito - San Francisco Ferry Bldg, San Francisco, CA 94111",
    "event": "",
    "views": 14,
    "likes": 3
  },
  {
    "user": "Joe",
    "title": "Visit the Sutro Baths",
    "image": "https://upload.wikimedia.org/wikipedia/commons/8/8c/Sutrobaths.jpg",
    "address": "Point Lobos Ave, San Francisco, CA 94121",
    "event": "",
    "views": 20,
    "likes": 2
  },
  {
    "user": "Joe",
    "title": "Eat Italian Food in North Beach",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/SF_Filbert_St_North_Beach_CA.jpg/800px-SF_Filbert_St_North_Beach_CA.jpg",
    "address": "North Beach, San Francisco, CA",
    "event": "",
    "views": 18,
    "likes": 1
  },
  {
    "user": "Joe",
    "title": "Have an Irish Coffee at The Buena Vista",
    "image": "https://upload.wikimedia.org/wikipedia/commons/d/d0/Irishcoffee.jpg",
    "address": "2765 Hyde St, San Francisco, CA 94109",
    "event": "",
    "views": 17,
    "likes": 4
  },
  {
    "user": "Joe",
    "title": "Take the Ferry to Sausalito",
    "image": "https://upload.wikimedia.org/wikipedia/commons/5/51/Golden_Gate_Ferry.jpg",
    "address": "1 Sausalito - San Francisco Ferry Bldg, San Francisco, CA 94111",
    "event": "",
    "views": 17,
    "likes": 4
  },
  {
    "user": "Joe",
    "title": "Catch a Show at The Fillmore",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/The_Fillmore.jpg/1024px-The_Fillmore.jpg",
    "address": "1805 Geary Blvd, San Francisco, CA 94115",
    "event": "",
    "views": 25,
    "likes": 3
  },
  {
    "user": "Joe",
    "title": "Tour the Botanical Gardens",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/San_Francisco_Botanical_Garden_Great_Lawn_2.jpg/1280px-San_Francisco_Botanical_Garden_Great_Lawn_2.jpg",
    "address": "1199 9th Ave, San Francisco, CA 94122",
    "event": "",
    "views": 21,
    "likes": 5
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
