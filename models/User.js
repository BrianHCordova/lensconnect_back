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
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
              isEmail: true,
            },
        },
        website: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        videography: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
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
        biography: {
            type: DataTypes.STRING,
            allowNull: true
        },
        averageRating:{
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: 0,
            validate: {
                min: 0,
                max: 5
            }
        }
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