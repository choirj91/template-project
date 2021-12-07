module.exports = (sequelize, DataTypes) => {
    const CafeModification = sequelize.define('CafeModification', {     
        modification_number: {
            type: DataTypes.INTEGER(15),
            unique: true,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            comment: "고유 번호",
        },
        modification_lists: {
            type: DataTypes.STRING(255),
            comment: "수정 항목"
        },
        contents: {
            type: DataTypes.TEXT + " CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_unicode_ci'",
            comment: "수정 제안 내용"
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
        tableName: "cafe_modification",
        comment: " 수정 제안",
        underscored: true, // 컬럼명 underscore 방식
        timestamps: false // createdAt, updatedAt 컬럼을 자동으로 추가 금지
    });

    CafeModification.associate = (db) => {
        db.CafeModification.hasMany(db.CafeModificationImage, { as: "images", foreignKey: 'modification_number', onDelete: 'cascade' });
    }

    return CafeModification;
}