module.exports = (sequelize, DataTypes) => {
    const CafeMenuGroup = sequelize.define('CafeMenuGroup', {
        id: {
            type: DataTypes.INTEGER(15),
            unique: true,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            comment: "그룹 id",
        },
        display_title: {
            type: DataTypes.STRING(100),
            comment: "노출 그룹 명",
        },
        remarks: {
            type: DataTypes.STRING(255),
            comment: "비고",
        },
        option_gubun: {
            type: DataTypes.STRING(10),
            // allowNull: false,
            // defaultValue: false,
            comment: "옵션 구분 여부"
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
        tableName: "cafe_menu_group",
        comment: "메뉴 그룹(메뉴판 카테고리)",
        underscored: true, // 컬럼명 underscore 방식
        timestamps: false // createdAt, updatedAt 컬럼을 자동으로 추가 금지
    });

    CafeMenuGroup.associate = (db) => {
        db.CafeMenuGroup.hasMany(db.CafeMenu, { as: "CafeMenuList", foreignKey: "cafe_menu_group_id", onDelete: 'cascade' });
        db.CafeMenuGroup.belongsTo(db.Cafe, { as: "Cafe", foreignKey: 'cafe_number', onDelete: 'cascade' });
    }

    return CafeMenuGroup;
}