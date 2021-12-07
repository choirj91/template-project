module.exports = (sequelize, DataTypes) => {
    const CafeThema = sequelize.define('CafeThema', {     
        // id: {
        //     type: DataTypes.INTEGER(15),
        //     unique: true,
        //     allowNull: false,
        //     primaryKey: true,
        //     autoIncrement: true,
        //     comment: "고유 번호",
        // },
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
        tableName: "cafe_thema",
        comment: "가맹점 테마",
        underscored: true, // 컬럼명 underscore 방식
        timestamps: false // createdAt, updatedAt 컬럼을 자동으로 추가 금지
    });

    CafeThema.associate = (db) => {
        // db.CafeThema.belongsTo(db.SearchFilter, {as: "search_filter", foreignKey: "code"});
    }

    return CafeThema;
}