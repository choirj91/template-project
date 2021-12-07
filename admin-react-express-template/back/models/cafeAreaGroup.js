module.exports = (sequelize, DataTypes) => {
    const CafeAreaGroup = sequelize.define('CafeAreaGroup', {
        group_code: {
            type: DataTypes.STRING(6),
            unique: true,
            allowNull: false,
            primaryKey: true,
            comment: "그룹 코드",
        },
        group_title: {
            type: DataTypes.STRING(100),
            unique: true,
            allowNull: false,
            comment: "그룹명",
        },
        dp_yn: {
            type: DataTypes.BOOLEAN(1),
            allowNull: false,
            defaultValue: true,
            comment: "표시 여부",
        },
        remarks: {
            type: DataTypes.STRING(255),
            comment: "비고",
        },
    }, {
        charset: 'utf8mb4', // 이모티콘 저장 가능
        collate: 'utf8mb4_unicode_ci',
        // freezeTableName: true, - 테이블명 복수형으로 치환 여부 ex) freezeTableName가 true이면, 테이블명이 user면 users로 생성됨
        tableName: "cafe_area_group",
        comment: "지역 그룹",
        underscored: true, // 컬럼명 underscore 방식
        timestamps: false // createdAt, updatedAt 컬럼을 자동으로 추가 금지
    });

    CafeAreaGroup.associate = (db) => {
        db.CafeAreaGroup.hasMany(db.CafeArea, { as: "area_list", foreignKey: "group_code" });
        db.CafeAreaGroup.hasMany(db.Cafe, { as: "cafe", foreignKey: 'area_group_code' });
    }

    return CafeAreaGroup;
}