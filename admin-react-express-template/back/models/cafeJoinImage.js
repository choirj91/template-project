module.exports = (sequelize, DataTypes) => {
    const CafeJoinImage = sequelize.define('CafeJoinImage', {     
        image_ori_name: {
            type: DataTypes.STRING(255),
            allowNull: false,
            comment: "사진 업로드 파일명"
        },
        image_url: {
            type: DataTypes.STRING(255),
            allowNull: false,
            comment: "사진 경로"
        },
        image_ext: {
            type: DataTypes.STRING(20),
            comment: "사진 확장자"
        },
        image_size: {
            type: DataTypes.BIGINT,
            comment: "사진크기"
        },
        remarks: {
            type: DataTypes.STRING(255),
            comment: "비고"
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            comment: "생성 날짜"
        }
    }, {
        charset: 'utf8mb4', // 이모티콘 저장 가능
        collate: 'utf8mb4_unicode_ci',
        // freezeTableName: true, - 테이블명 복수형으로 치환 여부 ex) freezeTableName가 true이면, 테이블명이 user면 users로 생성됨
        tableName: "cafe_join_image",
        comment: " 수정 제안 사진",
        underscored: true, // 컬럼명 underscore 방식
        timestamps: false // createdAt, updatedAt 컬럼을 자동으로 추가 금지
    });

    CafeJoinImage.associate = (db) => {
    }

    return CafeJoinImage;
}