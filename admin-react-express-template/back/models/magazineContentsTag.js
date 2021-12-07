module.exports = (sequelize, DataTypes) => {
    const MagazineContentsTag = sequelize.define('MagazineContentsTag', {
        tag_name: {
            type: DataTypes.STRING(255),
            allowNull: false,
            comment: "헤더 태그 내용",
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            comment: "생성 날짜"
        },
    }, {
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
        // freezeTableName: true,
        tableName: "magazine_contents_tag",
        comment: "매거진 컨텐츠 헤더 태그",
        underscored: true, // 컬럼명 underscore 방식
        timestamps: false, // createdAt,updatedAt 컬럼을 자동으로 추가 금지
    });

    MagazineContentsTag.associate = (db) => {
    };
    
    return MagazineContentsTag;
}