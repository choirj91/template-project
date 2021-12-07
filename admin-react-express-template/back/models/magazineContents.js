module.exports = (sequelize, DataTypes) => {
    const MagazineContents = sequelize.define('MagazineContents', {
        contents_number: {
            type: DataTypes.INTEGER(15),
            unique: true,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            comment: "매거진 컨텐츠 고유 번호",
            
        },
        contents_title: {
            type: DataTypes.STRING(255),
            allowNull: false,
            comment: "매거진 컨텐츠 제목",
        },
        contents_subtitle: {
            type: DataTypes.STRING(255),
            allowNull: false,
            comment: "매거진 컨텐츠 서브 제목",
        },
        contents_text: {
            type: DataTypes.TEXT + " CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_unicode_ci'" ,
            allowNull: false,
            comment: "매거진 컨텐츠 내용",
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
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
        // freezeTableName: true,
        tableName: "magazine_contents",
        comment: "매거진 컨텐츠",
        underscored: true, // 컬럼명 underscore 방식
        timestamps: false, // createdAt,updatedAt 컬럼을 자동으로 추가 금지
    });

    MagazineContents.associate = (db) => {
        db.MagazineContents.belongsTo(db.Cafe, {as: "cafe", foreignKey: "cafe_number"});
        db.MagazineContents.belongsTo(db.Magazine, { as: "Magazine", foreignKey: 'magazine_number', onDelete: 'cascade' });
        db.MagazineContents.hasMany(db.MagazineContentsImages, { as: "contents_images", foreignKey: 'contents_number', onDelete: 'cascade' });
        db.MagazineContents.hasMany(db.MagazineContentsTag, { as: "contents_tags", foreignKey: 'contents_number', onDelete: 'cascade' });
    };
    return MagazineContents;
}