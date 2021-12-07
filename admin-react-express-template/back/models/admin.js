module.exports = (sequelize, DataTypes) => {
    const Admin = sequelize.define('Admin', { 
        admin_number: {                          
            type: DataTypes.INTEGER(15),
            unique: true,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            comment: "관리자 번호",
        },
        admin_id: {
            type: DataTypes.STRING(255),
            unique: true,
            allowNull: false,
            comment: "관리자 이메일 아이디",
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
            comment: "관리자 비밀번호",
        },
        password_salt: {
            type: DataTypes.STRING(255),
            allowNull: false,
            comment: "관리자 비밀번호 암호화",
        },
        nickname: {
            type: DataTypes.STRING(10),
            allowNull: false,
            comment: "관리자 닉네임",
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            comment: "관리자 이름",
        },
        phone: {
            type: DataTypes.STRING(15),
            comment: "관리자 연락처",
        },
        birth: {
            type: DataTypes.INTEGER(15),
            comment: "관리자 생년월일",
        },
        profile_img_url: {
            type: DataTypes.STRING(255),
            comment: "관리자 프로필 사진 경로",
        },
        auth_status: {
            type: DataTypes.BOOLEAN(1),
            allowNull: false,
            defaultValue: 0,
            comment: "관리자 승인여부",
        },
        auth_grade: {
            type: DataTypes.INTEGER(1),
            allowNull: false,
            defaultValue: 1,
            comment: "관리자 권한 등급",
        },
        last_login: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            comment: "관리자 마지막 로그인 날짜",
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
        // freezeTableName: true, 테이블명 복수형으로 치환 여부 ex) freezeTableName가 true이면,테이블명이 user면 users로 생성됨
        tableName: "admin",
        comment: "관리자정보",
        underscored: true, // 컬럼명 underscore 방식
        timestamps: false // createdAt, updatedAt 컬럼을 자동으로 추가 금지
    });

    Admin.associate = (db) => {

    }

    return Admin;
}