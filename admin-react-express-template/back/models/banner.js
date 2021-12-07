module.exports = (sequelize, DataTypes) => {
    const Banner = sequelize.define('Banner', {
        image_ori_name: {
            type: DataTypes.STRING(255),
            comment: "사진 업로드 파일명"
        },
        image_url: {
            type: DataTypes.STRING(255),
            comment: "사진 경로"
        },
        link_type: {
            type: DataTypes.STRING(20),
            comment: "링크 타입"
        },
        link_target: {
            type: DataTypes.STRING(255),
            comment: "목적지 정보"
        },
        dp_yn: {
            type: DataTypes.BOOLEAN(1),
            allowNull: false,
            defaultValue: true,
            comment: "필터 표시 여부",
        },
        title: {
            type: DataTypes.STRING(255),
            comment: "제목",
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
        },
        order_rank: {
            type: DataTypes.INTEGER(3),
            allowNull: false,
            defaultValue: 1,
            comment: "순서",
        },
    }, {
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
        // freezeTableName: true,
        tableName: "banner",
        comment: "홈 배너",
        underscored: true, // 컬럼명 underscore 방식
        timestamps: false, // createdAt,updatedAt 컬럼을 자동으로 추가 금지
    });
    
    Banner.associate = (db) => {

    }

    return Banner;
}