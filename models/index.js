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

Tags.belongsTo(Portfolio);

Portfolio.belongsToMany(Tags)

Tags.belongsToMany(Portfolio)


module.exports = { User, Portfolio };
