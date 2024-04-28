const User = require('./User');
const Portfolio = require('./Portfolio');
const ServeLocation = require('./ServeLocation');
const Chat = require('./Chat');
const Specialty = require('./Specialty');
const Review = require('./Review');
const Tag = require('./Tag');

User.hasMany(Portfolio);

Portfolio.belongsTo(User);

// Portfolio and Tag join statements
Portfolio.belongsToMany(Tag, {
    through: 'PortfolioTag'
}) 

Tag.belongsToMany(Portfolio, {
    through: 'PortfolioTag'
})

User.hasMany(Chat) 

Chat.belongsTo(User, {
    as: 'sender'
});

Review.belongsTo(User, {
    as: 'receiver'
})

// Specialties and User join statments
Specialty.belongsToMany(User, {
    through: 'UserSpecialties',
})

User.belongsToMany(Specialty, {
    through: 'UserSpecialties',
})

// ServeLocation and User join statments
ServeLocation.belongsToMany(User, {
    through: 'UserServeLocation',
})

User.belongsToMany(ServeLocation, {
    through: 'UserServeLocation',
})

// Review and User join statments
User.hasMany(Review) 

Review.belongsTo(User, {
    as: 'reviewer'
});

Review.belongsTo(User, {
    as: 'reviewee'
})



module.exports = { User, Portfolio, Specialty, Tag, Review, Chat, ServeLocation };
