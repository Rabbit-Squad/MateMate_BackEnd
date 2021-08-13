const Sequelize = require('sequelize');

module.exports = class Request extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            requester : {
                type : Sequelize.INTEGER,
                allowNull : false,
            }, 
            content : {
                type : Sequelize.TEXT,
                allowNull : false,
            },
            arrive_time : {
                type : Sequelize.TIME,
                allowNull : false,
            },
            post : {
                type : Sequelize.INTEGER,
                allowNull : false,
            }, 
        }, {
            sequelize,
            timestamps : true,
            underscored : false, 
            modelName : 'Request', 
            tableName : 'requests', 
            paranoid : false,
            charset : 'utf8',
            collate : 'utf8_general_ci',
        });
    }
    static associate(db) {
        db.Request.Request.belongsTo(db.User, { foreignKey : 'requester', targetKey : 'id'});
    }
}