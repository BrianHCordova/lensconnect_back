const User = require('./user');
const Portfolio = require('./portfolio');
const ServeLocation = require('./serveLocation');
const Chat = require('./chat');
const Specialties = require('./specialties');
const Reviews = require('./reviews');
const Tags = require('./tags');

User.hasMany(Portfolio, {
    foreignKey: 'user_id'
});

Portfolio.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(ServeLocation, {
    foreignKey: 'user_id'
});

ServeLocation.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Chat, {
    foreignKey: 'user_id'
});

Chat.hasMany(User, {
    foreignKey: 'user_id'
});

User.hasMany(Specialties, {
    foreignKey: 'user_id'
});

Specialties.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Reviews, {
    foreignKey: 'user_id'
});

Reviews.belongsTo(User, {
    foreignKey: 'user_id'
});

Portfolio.hasMany(Tags, {
    foreignKey: 'portfolio_id'
});

Tags.belongsTo(Portfolio, {
    foreignKey: 'portfolio_id'
});


module.exports = { User, Portfolio };
