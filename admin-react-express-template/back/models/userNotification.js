module.exports = (sequelize, DataTypes) => {
    const UserNotification = sequelize.define('UserNotification', {
        type: {
            type: DataTypes.STRING(10),
            allowNull: false,
            comment: "알림 타입",
        },
        content: {
            type: DataTypes.TEXT + " CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_unicode_ci'" ,
            allowNull: false,
            comment: "알림 내용",
        },
        path: {
            type: DataTypes.INTEGER(15),
            allowNull: false,
            comment: "알림 위치",
        },
        target_user_number: {
            type: DataTypes.INTEGER(15),
            allowNull: false,
            comment: "알림 타겟 유저", 
        },
        url: {
            type: DataTypes.STRING(255),
            comment: "알림 Url",
        },
        opened_at: {
            type: DataTypes.DATE,    
            comment: "알림 확인 시간",
        },
    }, {
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
        // freezeTableName: true,
        tableName: "user_notification",
        comment: "유저 알림",
        underscored: true // 컬럼명 underscore 방식
    });

    UserNotification.associate = (db) => {
        db.UserNotification.belongsTo(db.User, {as: "User", foreignKey: "user_number"});
        db.UserNotification.belongsTo(db.User, {as: "TargetUser", foreignKey: "target_user_number"});
    };
    return UserNotification;
}