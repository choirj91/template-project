module.exports = (sequelize, DataTypes) => {
    const CafeMenu = sequelize.define('CafeMenu', {
        menu_number: {
            type: DataTypes.INTEGER(15),
            unique: true,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            comment: "메뉴 고유 번호",
        },
        rep_yn: {
            type: DataTypes.BOOLEAN(1),
            allowNull: false,
            defaultValue: false,
            comment: "대표 설정 여부"
        },
        rep_rank: {
            type: DataTypes.INTEGER(3),
            comment: "추천 순위"
        },
        menu_title: {
            type: DataTypes.STRING(100),
            allowNull: false,
            comment: "메뉴명"
        },
        menu_content: {
            type: DataTypes.TEXT + " CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_unicode_ci'",
            comment: "메뉴 설명"
        },
        price_default: {
            type: DataTypes.INTEGER(10),
            // allowNull: false,
            comment: "기본 상품 가격 (HOT)"
        },
        price_option: {
            type: DataTypes.INTEGER(10),
            comment: "상품 옵션 가격 (ICE)"
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
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            comment: "수정 날짜"
        }
    }, {
        charset: 'utf8mb4', // 이모티콘 저장 가능
        collate: 'utf8mb4_unicode_ci',
        // freezeTableName: true, - 테이블명 복수형으로 치환 여부 ex) freezeTableName가 true이면, 테이블명이 user면 users로 생성됨
        tableName: "cafe_menu",
        comment: "메뉴 정보",
        underscored: true, // 컬럼명 underscore 방식
        timestamps: false, // createdAt, updatedAt 컬럼을 자동으로 추가 금지
        indexes: [
            {
              type: 'FULLTEXT',
              fields: ['menu_title']
            }
          ]
    });

    CafeMenu.associate = (db) => {
        db.CafeMenu.hasMany(db.CafeMenuImages, { as: "MenuImage", foreignKey: 'menu_number', onDelete: 'cascade'});
        db.CafeMenu.belongsToMany(db.SearchFilter, { as: "MenuSearchFilter", through: db.CafeMenuCategory, foreignKey: 'menu_number', onDelete: 'cascade' });
        db.CafeMenu.hasMany(db.CafeMenuCategory, { as: "MenuFilter", foreignKey: 'menu_number', onDelete: 'cascade'});

        db.CafeMenu.belongsTo(db.Cafe, { as: "Cafe", foreignKey: 'cafe_number', onDelete: 'cascade' });
        db.CafeMenu.belongsTo(db.CafeMenuGroup, { as: "CafeMenuGroup", foreignKey: "cafe_menu_group_id", onDelete: 'cascade' });
    }

    return CafeMenu;
}