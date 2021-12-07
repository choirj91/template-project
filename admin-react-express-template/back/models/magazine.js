module.exports = (sequelize, DataTypes) => {
    const Magazine = sequelize.define('Magazine', {
        magazine_number: {
            type: DataTypes.INTEGER(15),
            unique: true,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            comment: "매거진 고유 번호",
        },
        magazine_title: {
            type: DataTypes.STRING(255),
            allowNull: false,
            comment: "매거진 제목",
        },
        magazine_subtitle: {
            type: DataTypes.STRING(255),
            allowNull: false,
            comment: "매거진 서브 제목",
        },
        magazine_content: {
            type: DataTypes.TEXT + " CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_unicode_ci'" ,
            allowNull: false,
            comment: "매거진 내용",
        },
        image_ori_name: {
            type: DataTypes.STRING(255),
            comment: "사진 업로드 파일명"
        },
        image_url: {
            type: DataTypes.STRING(255),
            comment: "사진 경로"
        },
        dp_yn: {
            type: DataTypes.BOOLEAN(1),
            defaultValue: true,
            allowNull: false,
            comment: "공개 여부"
        },
        view_cnt: {
            type: DataTypes.INTEGER(15),
            defaultValue: 0,
            allowNull: false,
            comment: "매거진 조회수"
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
        tableName: "magazine",
        comment: "매거진",
        underscored: true, // 컬럼명 underscore 방식
        timestamps: false, // createdAt,updatedAt 컬럼을 자동으로 추가 금지
    });

    Magazine.associate = (db) => {
        db.Magazine.belongsTo(db.Admin, {as: "writer", foreignKey: "admin_number"});
        db.Magazine.hasMany(db.MagazineContents, { as: "magazine_contents", foreignKey: 'magazine_number', onDelete: 'cascade' });
        db.Magazine.hasMany(db.MagazineScraped, { as: "clickScrap", foreignKey: 'magazine_number', onUpdate: 'cascade' });
    };
    return Magazine;
}