module.exports = (sequelize, DataTypes) => {
    const SearchFilter = sequelize.define('SearchFilter', {
        code: {
            type: DataTypes.STRING(5),
            unique: true,
            allowNull: false,
            primaryKey: true,
            comment: "코드",
        },
        code_title: {
            type: DataTypes.STRING(100),
            unique: true,
            allowNull: false,
            comment: "코드 설명",
        },
        recomm_filter_yn: {
            type: DataTypes.BOOLEAN(1),
            allowNull: false,
            defaultValue: true,
            comment: "필터 추천 여부(필터 추천리스트)",
        },
        recomm_menu_yn: {
            type: DataTypes.BOOLEAN(1),
            allowNull: false,
            defaultValue: true,
            comment: "메뉴 추천 여부(검색 추천리스트)",
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
        tableName: "search_filter",
        comment: "검색 필터",
        underscored: true, // 컬럼명 underscore 방식
        timestamps: false // createdAt, updatedAt 컬럼을 자동으로 추가 금지
    });

    SearchFilter.associate = (db) => {
        db.SearchFilter.belongsTo(db.SearchFilterGroup, { as: "search_filter_group", foreignKey: "group_code" })
        // db.SearchFilter.hasMany(db.CafeService, { as: "cafe_service", foreignKey: "code" });
        // db.SearchFilter.hasMany(db.CafeThema, { as: "cafe_thema", foreignKey: "code" });
        
        db.SearchFilter.belongsToMany(db.Cafe, { as: "filter_thema_cafe", through: db.CafeThema, foreignKey: 'code' });
        db.SearchFilter.belongsToMany(db.Cafe, { as: "filter_service_cafe", through: db.CafeService, foreignKey: 'code' });

        db.SearchFilter.belongsToMany(db.CafeMenu, { as: "menu_category", through: db.CafeMenuCategory, foreignKey: 'code' });
        // db.SearchFilter.hasMany(db.CafeMenu, { as: "cafe_menu", foreignKey: 'filter_code' });
    }

    return SearchFilter;
}