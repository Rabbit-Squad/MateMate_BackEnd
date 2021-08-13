const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            nickname : {
                type : Sequelize.STRING(10),
                allowNull : false,
                unique : true,
            }, 
            email : {
                type : Sequelize.STRING(30),
                allowNull : false,
                unique : true,
            },
            pw : {
                type : Sequelize.STRING(20),
                allowNull : false,
            },
        }, {
            sequelize,
            timestamps : true,
            underscored : false, 
            modelName : 'User', 
            tableName : 'users', 
            paranoid : false,
            charset : 'utf8',
            collate : 'utf8_general_ci',
        });
    }
    static associate(db) {
        db.User.hasMany(db.Request, {foreignKey : 'requester', targetKey : 'id'});
        db.User.hasMany(db.Post, {foreignKey : 'writer', targetKey : 'id'});
    }
};