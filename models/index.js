const User = require('./User');
const Portfolio = require('./Portfolio');
const ServeLocation = require('./ServeLocation');
const Chat = require('./Chat');
const Specialties = require('./Specialties');
const Reviews = require('./Reviews');
const Tags = require('./Tags');

User.hasMany(Portfolio);

Portfolio.belongsTo(User);

User.hasMany(ServeLocation);

ServeLocation.belongsTo(User);

User.hasMany(Chat);

Chat.hasMany(User);

User.hasMany(Specialties);

Specialties.belongsTo(User);

User.hasMany(Reviews);

Reviews.belongsTo(User);

Portfolio.hasMany(Tags);

Tags.hasMany(Portfolio);

// Portfolio and Tag join statements
Portfolio.belongsToMany(Tags, {
    through: 'PortfolioTags'
}) 

Tags.belongsToMany(Portfolio, {
    through: 'PortfolioTags'
})

// Chat and User join statments
Chat.belongsToMany(User, {
    through: 'UserChat'
})

User.belongsToMany(Chat, {
    through: 'UserChat'
})

// Specialties and User join statments
Specialties.belongsToMany(User, {
    through: 'UserSpecialties'
})

User.belongsToMany(Specialties, {
    through: 'UserSpecialties'
})

// ServeLocation and User join statments
ServeLocation.belongsToMany(User, {
    through: 'UserServeLocation'
})

User.belongsToMany(ServeLocation, {
    through: 'UserServeLocation'
})


module.exports = { User, Portfolio, Specialties, Tags, Reviews, Chat, ServeLocation };
