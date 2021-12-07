module.exports = (sequelize, DataTypes) => {
    const CafeArea = sequelize.define('CafeArea', {
        area_code: {
            type: DataTypes.STRING(5),
            unique: true,
            allowNull: false,
            primaryKey: true,
            comment: "코드",
        },
        area_title: {
            type: DataTypes.STRING(100),
            unique: true,
            allowNull: false,
            comment: "코드 설명",
        },
        area_latitude: {
            type: DataTypes.DECIMAL(18, 10),
            comment: "지역 위도"
        },
        area_longitude: {
            type: DataTypes.DECIMAL(18, 10),
            comment: "지역 경도"
        },
        dp_yn: {
            type: DataTypes.BOOLEAN(1),
            allowNull: false,
            defaultValue: true,
            comment: "필터 표시 여부",
        },
        remarks: {
            type: DataTypes.STRING(255),
            comment: "비고",
        },
    }, {
        charset: 'utf8mb4', // 이모티콘 저장 가능
        collate: 'utf8mb4_unicode_ci',
        // freezeTableName: true, - 테이블명 복수형으로 치환 여부 ex) freezeTableName가 true이면, 테이블명이 user면 users로 생성됨
        tableName: "cafe_area",
        comment: "지역 정보",
        underscored: true, // 컬럼명 underscore 방식
        timestamps: false // createdAt, updatedAt 컬럼을 자동으로 추가 금지
    });

    CafeArea.associate = (db) => {
        db.CafeArea.belongsTo(db.CafeAreaGroup, { as: "cafe_area_group", foreignKey: "group_code" })
        db.CafeArea.hasMany(db.Cafe, { as: "cafe", foreignKey: 'area_code' });
    }

    return CafeArea;
}