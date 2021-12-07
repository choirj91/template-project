module.exports = (sequelize, DataTypes) => {
    const SearchFilterGroup = sequelize.define('SearchFilterGroup', {
        group_code: {
            type: DataTypes.STRING(20),
            unique: true,
            allowNull: false,
            primaryKey: true,
            comment: "그룹 코드",
        },
        group_title: {
            type: DataTypes.STRING(100),
            allowNull: false,
            comment: "그룹명",
        },
        group_type: {
            type: DataTypes.STRING(100),
            allowNull: false,
            comment: "그룹타입",
        },
        order_rank: {
            type: DataTypes.INTEGER(2),
            allowNull: false,
            comment: "표시 순서",
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
        tableName: "search_filter_group",
        comment: "검색 필터 그룹",
        underscored: true, // 컬럼명 underscore 방식
        timestamps: false // createdAt, updatedAt 컬럼을 자동으로 추가 금지
    });

    SearchFilterGroup.associate = (db) => {
        db.SearchFilterGroup.hasMany(db.SearchFilter, { as: "search_filter", foreignKey: "group_code" });
        db.SearchFilterGroup.belongsToMany(db.Cafe, { as: "cafe_main_type", through: db.CafeMainType, foreignKey: 'group_code' });
    }

    return SearchFilterGroup;
}