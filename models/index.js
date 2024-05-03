const User = require('./User');
const Portfolio = require('./Portfolio');
const ServeLocation = require('./ServeLocation');
const Chat = require('./Chat');
const ChatRoom = require('./ChatRoom');
const Specialty = require('./Specialty');
const Review = require('./Review');
const Tag = require('./Tag');
const TransactionReport = require('./TransactionReport')

User.hasMany(Portfolio);

Portfolio.belongsTo(User);

// Portfolio and Tag join statements
Portfolio.belongsToMany(Tag, {
    through: 'PortfolioTag'
}) 

Tag.belongsToMany(Portfolio, {
    through: 'PortfolioTag'
})

ChatRoom.hasMany(Chat);

Chat.belongsTo(ChatRoom, {
    onDelete: 'CASCADE'
});

// User.hasMany(ChatRoom);

// ChatRoom.hasMany(User);

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

// TransactionReport and User join statments
User.hasMany(TransactionReport) 

TransactionReport.belongsTo(User, {
    as: 'hirer'
});

TransactionReport.belongsTo(User, {
    as: 'hiree'
})



module.exports = { User, Portfolio, Specialty, Tag, Review, Chat, ChatRoom, ServeLocation, TransactionReport };
