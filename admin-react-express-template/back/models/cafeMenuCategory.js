module.exports = (sequelize, DataTypes) => {
    const CafeMenuCategory = sequelize.define('CafeMenuCategory', {     
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            comment: "생성 날짜"
        }
    }, {
        charset: 'utf8mb4', // 이모티콘 저장 가능
        collate: 'utf8mb4_unicode_ci',
        tableName: "cafe_menu_category",
        comment: " 메뉴 카테고리",
        underscored: true, // 컬럼명 underscore 방식
        timestamps: false // createdAt, updatedAt 컬럼을 자동으로 추가 금지
    });

    CafeMenuCategory.associate = (db) => {
        db.CafeMenuCategory.belongsTo(db.CafeMenu, { as: "CafeMenu", foreignKey: 'menu_number', onDelete: 'cascade' });
    }

    return CafeMenuCategory;
}