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
    }
];

const seedUsers = () => User.bulkCreate(userData, { individualHooks: true, });

module.exports = seedUsers;
