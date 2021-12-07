module.exports = (sequelize, DataTypes) => {
    const CafeJoin = sequelize.define('CafeJoin', {     
        join_number: {
            type: DataTypes.INTEGER(15),
            unique: true,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            comment: "고유 번호",
        },
        cafe_title: {
            type: DataTypes.STRING(255),
            allowNull: false,
            comment: "가맹점 이름",
        },
        cafe_address: {
            type: DataTypes.STRING(255),
            comment: "가맹점 주소"
        },
        contents: {
            type: DataTypes.TEXT + " CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_unicode_ci'",
            comment: "정보"
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            comment: "생성 날짜"
        },
    }, {
        charset: 'utf8mb4', // 이모티콘 저장 가능
        collate: 'utf8mb4_unicode_ci',
        // freezeTableName: true, - 테이블명 복수형으로 치환 여부 ex) freezeTableName가 true이면, 테이블명이 user면 users로 생성됨
        tableName: "cafe_join",
        comment: " 등록 요청",
        underscored: true, // 컬럼명 underscore 방식
        timestamps: false // createdAt, updatedAt 컬럼을 자동으로 추가 금지
    });

    CafeJoin.associate = (db) => {
        db.CafeJoin.hasMany(db.CafeJoinImage, { as: "images", foreignKey: 'join_number', onDelete: 'cascade' });
    }

    return CafeJoin;
}