module.exports = (sequelize, DataTypes) => {
    const Temp = sequelize.define('Temp', { 
        temp: {
            type: DataTypes.STRING(50),
            allowNull: false,
            comment: "샘플",
        },
        value: {
            type: DataTypes.STRING(15),
            comment: "샘플 Value",
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            comment: "생성 날짜"
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            comment: "수정 날짜"
        },
        deleted_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            comment: "삭제 날짜"
        },
    }, {
        charset: 'utf8mb4', // 이모티콘 저장 가능
        collate: 'utf8mb4_unicode_ci',
        // freezeTableName: true, 테이블명 복수형으로 치환 여부 ex) freezeTableName가 true이면,테이블명이 user면 users로 생성됨
        tableName: "temp",
        comment: "샘플",
        underscored: true, // 컬럼명 underscore 방식
        timestamps: false // createdAt, updatedAt 컬럼을 자동으로 추가 금지
    });

    Temp.associate = (db) => {

    }

    return Temp;
}