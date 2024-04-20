const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt')

class User extends Model {
    checkPassword(loginPw) {
		return bcrypt.compareSync(loginPw, this.password);
	}
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8]
            }
        },
        isPhotographer: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        lastOnline: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        onlineStatus: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        biography: {
            type: DataTypes.STRING,
            allowNull: true
        },
    },
    {
        hooks: {
			async beforeCreate(newUserData) {
				newUserData.password = await bcrypt.hash(newUserData.password, 10);
				return newUserData;
			},
			// hashSync makes the asynchronous hash method synchronous
			beforeUpdate: (newUserData) => {
				newUserData.password = bcrypt.hashSync(newUserData.password, 10);
				return newUserData;
			},
		},
        sequelize
    }
);

module.exports = User;