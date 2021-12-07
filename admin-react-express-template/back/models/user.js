module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', { // 테이블명은 auth_user
        user_number: {                          // 유저 고유 ID
            type: DataTypes.INTEGER(15),
            unique: true,                       // 고유한 값
            allowNull: false,                   // 필수
            primaryKey: true,
            autoIncrement: true,
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
        }
    }, {
        charset: 'utf8mb4', // 이모티콘 저장 가능
        collate: 'utf8mb4_unicode_ci',
        // freezeTableName: true,
        tableName: "user",
        comment: "사용자정보",
        underscored: true, // 컬럼명 underscore 방식
        timestamps: false // createdAt, updatedAt 컬럼을 자동으로 추가 금지
    });

    User.associate = (db) => {
        db.User.hasMany(db.Cafe, { as: 'Cafe', foreignKey: 'user_number' });
        db.User.hasMany(db.UserNotification, { as: 'SendNotification', foreignKey: 'user_number' });
        db.User.hasMany(db.UserNotification, { as: 'GetNotification', foreignKey: 'target_user_number' });
        // db.User.belongsToMany(db.Cafe, { through: db.CafeLiked, foreignKey: 'user_number' });
        db.User.hasMany(db.CafeLiked, { foreignKey: 'user_number' });
        // db.User.belongsToMany(db.Magazine, { through: db.MagazineScraped, foreignKey: 'user_number' });
        db.User.hasMany(db.MagazineScraped, { foreignKey: 'user_number' });
        // db.User.hasMany(db.CafeReview, {as: "CafeReview", foreignKey: 'user_number'});

        db.User.hasMany(db.CafeModification, { as: "modification", foreignKey: 'user_number' }); // 수정 제안 
        db.User.hasMany(db.CafeJoin, { as: "cafe_join", foreignKey: 'user_number' }); //  등록 요청
    }

    return User;
}