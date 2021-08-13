const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            writer: {
                type: Sequelize.STRING(10),
                allowNull: false,
            },
            deadline: {
                type: Sequelize.TIME,
                allowNull: false,
            },
            location: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            min_num: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
            },
            cur_num: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
            },
            title: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            content: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            closed: {
                type: Sequelize.TINYINT,
                allowNull: false
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Post',
            tableName: 'posts',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci'
        });
    }
    static associate(db) {
        db.Post.belongsTo(db.User);
        db.Post.hasMany(db.Request);
    }
};