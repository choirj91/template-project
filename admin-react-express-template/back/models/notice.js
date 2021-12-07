module.exports = (sequelize, DataTypes) => {
    const Notice = sequelize.define('Notice', {
        notice_title: {
            type: DataTypes.STRING(255),
            allowNull: false,
            comment: "공지 제목",
        },
        notice_content: {
            type: DataTypes.TEXT + " CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_unicode_ci'" ,
            allowNull: false,
            comment: "공지 내용",
        },
        notice_type: {
            type: DataTypes.STRING(1),
            allowNull: false,
            defaultValue: 'N',
            comment: "공지 타입(메인M, 일반N, 이벤트E)"
        },
        image_ori_name: {
            type: DataTypes.STRING(255),
            comment: "사진 업로드 파일명"
        },
        image_url: {
            type: DataTypes.STRING(255),
            comment: "사진 경로"
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
        tableName: "notice",
        comment: "공지사항",
        underscored: true, // 컬럼명 underscore 방식
        timestamps: false, // createdAt,updatedAt 컬럼을 자동으로 추가 금지
    });

    Notice.associate = (db) => {
        db.Notice.belongsTo(db.User, {as: "User", foreignKey: "user_number"});
    };
    return Notice;
}