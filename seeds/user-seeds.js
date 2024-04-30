const {User} = require('../models');

const userData = [
    {
        "username": "andrew",
        "password": "password",
        "email": "andrew@joe.joe",
        "website": "ReelRadar.com",
        "videography": false,
        "isPhotographer": false,
        "lastOnline": "2021-08-01",//these dates are just placeholders
        "onlineStatus": false,
        "biography": "I am a photographer"
    },
    {
        "username": "joe",
        "password": "password",
        "email": "joe@joe.joe",
        "website": "ReelRadar.com",
        "videography": false,
        "isPhotographer": true,
        "lastOnline": "2021-08-01",//these dates are just placeholders
        "onlineStatus": false,
        "biography": "I am a better photographer than Andrew"
    },
    {
        "username": "eric",
        "password": "password",
        "email": "eric@joe.joe",
        "website": "ReelRadar.com",
        "videography": false,
        "isPhotographer": true,
        "lastOnline": "2021-08-01",//these dates are just placeholders
        "onlineStatus": false,
        "biography": "I am a better photographer than Andrew"
    },
    {
        "username": "brian",
        "password": "password",
        "email": "brian@joe.joe",
        "website": "ReelRadar.com",
        "videography": false,
        "isPhotographer": false,
        "lastOnline": "2021-08-01",//these dates are just placeholders
        "onlineStatus": false,
        "biography": "I am a better photographer than Andrew"
    },
    {
        "username": "kyle",
        "password": "password",
        "email": "kyle@joe.joe",
        "website": "ReelRadar.com",
        "videography": false,
        "isPhotographer": false,
        "lastOnline": "2021-08-01",//these dates are just placeholders
        "onlineStatus": false,
        "biography": "I am a better photographer than Andrew"
    },
    {
        "username": "willie",
        "password": "password",
        "email": "willie@joe.joe",
        "website": "ReelRadar.com",
        "videography": false,
        "isPhotographer": true,
        "lastOnline": "2021-08-01",//these dates are just placeholders
        "onlineStatus": false,
        "biography": "I am a better photographer than Andrew"
    },
    {
        "username": "david",
        "password": "password",
        "email": "david@joe.joe",
        "website": "ReelRadar.com",
        "videography": false,
        "isPhotographer": false,
        "lastOnline": "2021-08-01",//these dates are just placeholders
        "onlineStatus": false,
        "biography": "I am a better photographer than Andrew"
    }

];

const seedUsers = () => User.bulkCreate(userData, { individualHooks: true, });

module.exports = seedUsers;
