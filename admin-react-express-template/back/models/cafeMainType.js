module.exports = (sequelize, DataTypes) => {
    const CafeMainType = sequelize.define('CafeMainType', {     
        // id: {
        //     type: DataTypes.INTEGER(15),
        //     unique: true,
        //     allowNull: false,
        //     primaryKey: true,
        //     autoIncrement: true,
        //     comment: "고유 번호",
        // },
        type_rank: {
            type: DataTypes.INTEGER(1),
            allowNull: false,
            defaultValue: 1,
            comment: "주력 순위"
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            comment: "생성 날짜"
        },
        remarks: {
            type: DataTypes.STRING(255),
            comment: "비고",
        },
        dp_yn: {
            type: DataTypes.BOOLEAN(1),
            defaultValue: true,
            allowNull: false,
            comment: "홈 카테고리 표시 여부"
        },
    }, {
        charset: 'utf8mb4', // 이모티콘 저장 가능
        collate: 'utf8mb4_unicode_ci',
        // freezeTableName: true, - 테이블명 복수형으로 치환 여부 ex) freezeTableName가 true이면, 테이블명이 user면 users로 생성됨
        tableName: "cafe_main_type",
        comment: "가맹점 메인 타입",
        underscored: true, // 컬럼명 underscore 방식
        timestamps: false // createdAt, updatedAt 컬럼을 자동으로 추가 금지
    });

    CafeMainType.associate = (db) => {
    }

    return CafeMainType;
}