module.exports = (sequelize, DataTypes) => {
    const CafeLiked = sequelize.define('CafeLiked', {
        user_number: {                          // 유저 고유 ID
            type: DataTypes.INTEGER(15),
            allowNull: true,                   
            comment: "유저 번호",
        },
        cafe_number: {                          // 유저 고유 ID
            type: DataTypes.INTEGER(15),
            allowNull: false,                   // 필수
            comment: " 번호",
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            comment: "생성 날짜"
        },
    }, {
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
        // freezeTableName: true,
        tableName: "cafe_liked",
        comment: "가맹점 좋아요",
        underscored: true, // 컬럼명 underscore 방식
        timestamps: false // createdAt,updatedAt 컬럼을 자동으로 추가 금지
    });

    CafeLiked.associate = (db) => {

    };
    return CafeLiked;
}