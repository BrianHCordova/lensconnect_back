const {User} = require('../models');

const userData = [
    {
        "username": "andrew",
        "password": "password",
        "isPhotographer": false,
        "lastOnline": "2021-08-01",//these dates are just placeholders
        "onlineStatus": false,
        "biography": "I am a photographer"
    },

    {
        "username": "joe",
        "password": "password",
        "isPhotographer": true,
        "lastOnline": "2021-08-01",//these dates are just placeholders
        "onlineStatus": false,
        "biography": "I am a better photographer than Andrew"
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
