module.exports = (sequelize, DataTypes) => {
    const UserDelete = sequelize.define('UserDelete', {
        user_number: {                          // 유저 고유 ID
            type: DataTypes.INTEGER(15),
            allowNull: false,                   // 필수
            comment: "사용자 번호",
        },
        user_sns_naver_id: {
            type: DataTypes.STRING(255),
            comment: "네이버 소셜로그인 아이디",
        },
        user_sns_email_id: {
            type: DataTypes.STRING(255),
            comment: "이메일 아이디",
        },
        user_sns_google_id: {
            type: DataTypes.STRING(255),
            comment: "구글 소셜로그인 아이디",
        },
        user_sns_kakao_id: {
            type: DataTypes.STRING(255),
            comment: "카카오 소셜로그인 아이디",
        },
        user_sns_apple_id: {
            type: DataTypes.STRING(255),
            comment: "Apple 소셜로그인 아이디",
        },
        user_sns_create: {
            type: DataTypes.STRING(255),
            allowNull: false,
            comment: "최초 가입 정보",
        },
        user_pwd: {
            type: DataTypes.STRING(255),
            comment: "사용자 비밀번호",
        },
        user_pwd_salt: {
            type: DataTypes.STRING(255),
            comment: "사용자 비밀번호 암호화",
        },
        user_email: {
            type: DataTypes.STRING(50),
            // allowNull: false,
            comment: "사용자 이메일",
        },
        user_name: {
            type: DataTypes.STRING(10),
            comment: "사용자 이름",
        },
        user_phone: {
            type: DataTypes.INTEGER(15),
            comment: "사용자 연락처",
        },
        user_age: {
            type: DataTypes.INTEGER(3),
            comment: "사용자 나이",
        },
        user_sex: {
            type: DataTypes.STRING(1),
            comment: "사용자 성별",
        },
        user_birth: {
            type: DataTypes.INTEGER(8),
            comment: "사용자 생년월일",
        },
        user_nickname: {
            type: DataTypes.STRING(10),
            allowNull: false,
            comment: "사용자 닉네임",
        },
        user_push_token: {
            type: DataTypes.STRING(255),
            comment: "사용자 알림 토큰",
        },
        user_status: {
            type: DataTypes.INTEGER(1),
            allowNull: false,
            defaultValue: 0,
            comment: "사용자 분류",
        },
        user_profile_img_url: {
            type: DataTypes.STRING(255),
            comment: "사용자 프로필 사진 경로",
        },
        user_profile_img_name: {
            type: DataTypes.STRING(255),
            comment: "사용자 프로필 사진 원본 파일명",
        },
        email_confirm_yn: {
            type: DataTypes.BOOLEAN(1),
            allowNull: false,
            defaultValue: false,
            comment: "이메일 인증 여부"
        },
        sms_agree: {
            type: DataTypes.BOOLEAN(1),
            allowNull: false,
            defaultValue: false,
            comment: "사용자 문자 수신 여부",
        },
        email_agree: {
            type: DataTypes.BOOLEAN(1),
            allowNull: false,
            defaultValue: false,
            comment: "사용자 메일 수신 여부",
        },
        last_login: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            comment: "사용자 마지막 로그인 날짜",
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
        deleted_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            comment: "탈퇴 날짜"
        },
        delete_reason: {
            type: DataTypes.TEXT + " CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_unicode_ci'",
            comment: "탈퇴 사유"
        }
    }, {
        charset: 'utf8mb4', // 이모티콘 저장 가능
        collate: 'utf8mb4_unicode_ci',
        // freezeTableName: true,
        tableName: "user_delete",
        comment: "사용자 탈퇴 기록",
        underscored: true, // 컬럼명 underscore 방식
        timestamps: false // createdAt, updatedAt 컬럼을 자동으로 추가 금지
    });

    UserDelete.associate = (db) => {

    }

    return UserDelete;
}