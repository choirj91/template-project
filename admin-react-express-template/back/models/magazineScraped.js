module.exports = (sequelize, DataTypes) => {
    const MagazineScraped = sequelize.define('MagazineScraped', {
        user_number: {                          // 유저 고유 ID
            type: DataTypes.INTEGER(15),
            allowNull: true,                   // 필수
            comment: "사용자 번호",
        },
        magazine_number: {                          // 유저 고유 ID
            type: DataTypes.INTEGER(15),
            allowNull: false,                   // 필수
            comment: "매거진 번호",
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            comment: "생성 날짜"
        }
    }, {
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
        // freezeTableName: true,
        tableName: "magazine_scraped",
        comment: "매거진 스크랩",
        underscored: true, // 컬럼명 underscore 방식
        timestamps: false // createdAt,updatedAt 컬럼을 자동으로 추가 금지
    });

    MagazineScraped.associate = (db) => {

    };
    return MagazineScraped;
}