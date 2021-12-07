module.exports = (sequelize, DataTypes) => {
    const Cafe = sequelize.define('Cafe', {
        cafe_number: {
            type: DataTypes.INTEGER(15),
            unique: true,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            comment: "가맹점 고유 번호",
        },
        cafe_title: {
            type: DataTypes.STRING(255),
            allowNull: false,
            comment: "가맹점 이름",
        },
        cafe_intro: {
            type: DataTypes.STRING(50),
            comment: "가맹점 한 줄 소개"
        },
        cafe_content: {
            type: DataTypes.TEXT + " CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_unicode_ci'",
            comment: "가맹점 소개(설명)"
        },
        cafe_tel: {
            type: DataTypes.STRING(50),
            comment: "가맹점 연락처"
        },
        cafe_address: {
            type: DataTypes.STRING(255),
            comment: "가맹점 주소"
        },
        cafe_road_address: {
            type: DataTypes.STRING(255),
            comment: "가맹점 신주소"
        },
        address_sido: {
            type: DataTypes.STRING(50),
            comment: "가맹점 주소 - 시/도"
        },
        address_signgu: {
            type: DataTypes.STRING(50),
            comment: "가맹점 주소 - 시/군/구"
        },
        address_emd: {
            type: DataTypes.STRING(50),
            comment: "가맹점 주소 - 읍/면/동"
        },
        cafe_latitude: {
            type: DataTypes.DECIMAL(18, 10),
            comment: "가맹점 위도"
        },
        cafe_longitude: {
            type: DataTypes.DECIMAL(18, 10),
            comment: "가맹점 경도"
        },
        open_mon_hours: {
            type: DataTypes.STRING(50),
            comment: "가맹점 월요일 시작시간"
        },
        close_mon_hours: {
            type: DataTypes.STRING(50),
            comment: "가맹점 월요일 종료시간"
        },
        open_tues_hours: {
            type: DataTypes.STRING(50),
            comment: "가맹점 화요일 시작시간"
        },
        close_tues_hours: {
            type: DataTypes.STRING(50),
            comment: "가맹점 화요일 종료시간"
        },
        open_wednes_hours: {
            type: DataTypes.STRING(50),
            comment: "가맹점 수요일 시작시간"
        },
        close_wednes_hours: {
            type: DataTypes.STRING(50),
            comment: "가맹점 수요일 종료시간"
        },
        open_thurs_hours: {
            type: DataTypes.STRING(50),
            comment: "가맹점 목요일 시작시간"
        },
        close_thurs_hours: {
            type: DataTypes.STRING(50),
            comment: "가맹점 목요일 종료시간"
        },
        open_fri_hours: {
            type: DataTypes.STRING(50),
            comment: "가맹점 금요일 시작시간"
        },
        close_fri_hours: {
            type: DataTypes.STRING(50),
            comment: "가맹점 금요일 종료시간"
        },
        open_satur_hours: {
            type: DataTypes.STRING(50),
            comment: "가맹점 토요일 시작시간"
        },
        close_satur_hours: {
            type: DataTypes.STRING(50),
            comment: "가맹점 토요일 종료시간"
        },
        open_sun_hours: {
            type: DataTypes.STRING(50),
            comment: "가맹점 일요일 시작시간"
        },
        close_sun_hours: {
            type: DataTypes.STRING(50),
            comment: "가맹점 일요일 종료시간"
        },
        cafe_offday: {
            type: DataTypes.STRING(200),
            comment: "휴무일"
        },
        business_license_number: {
            type: DataTypes.INTEGER(10),
            comment: "가맹점 사업자 번호"
        },
        table_count: {
            type: DataTypes.INTEGER(3),
            comment: "매장 테이블수"
        },
        plug_count: {
            type: DataTypes.INTEGER(3),
            comment: "매장 콘센트수"
        },
        parking_info: {
            type: DataTypes.STRING(200),
            comment: "가능 주차대수"
        },
        toilet_info: {
            type: DataTypes.STRING(200),
            comment: "화장실 정보"
        },
        reservation_info: {
            type: DataTypes.STRING(200),
            comment: "화장실 정보"
        },
        coffee_beans_info: {
            type: DataTypes.STRING(200),
            comment: "원두 정보"
        },
        profile_img_name: {
            type: DataTypes.STRING(255),
            comment: "프로필 업로드 파일명"
        },
        profile_img_url: {
            type: DataTypes.STRING(255),
            comment: "프로필 업로드 url"
        },
        img_ref: {
            type: DataTypes.STRING(255),
            comment: "출처 정보"
        },
        img_ref_path: {
            type: DataTypes.STRING(255),
            comment: "출처 플랫폼 정보"
        },
        view_cnt: {
            type: DataTypes.INTEGER(15),
            defaultValue: 0,
            allowNull: false,
            comment: " 조회수"
        },
        dp_yn: {
            type: DataTypes.BOOLEAN(1),
            defaultValue: true,
            allowNull: false,
            comment: " 공개 여부"
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
        charset: 'utf8mb4',// 이모티콘 저장 가능
        collate: 'utf8mb4_unicode_ci',
        // freezeTableName: true,- 테이블명 복수형으로 치환 여부 ex) freezeTableName가 true이면,테이블명이 user면 users로 생성됨
        tableName: "cafe",
        comment: "가맹점 정보",
        underscored: true,// 컬럼명 underscore 방식
        timestamps: false, // createdAt,updatedAt 컬럼을 자동으로 추가 금지
        indexes: [
            {
                type: 'FULLTEXT',
                fields: ['cafe_title']
            }
        ]
    });
    
    Cafe.associate = (db) => {
        db.Cafe.hasMany(db.CafeMenuGroup, { as: "CafeMenuGroup", foreignKey: 'cafe_number', onDelete: 'cascade' });
        db.Cafe.hasMany(db.CafeMenu, { as: "cafe_menu", foreignKey: 'cafe_number', onDelete: 'cascade' });
        db.Cafe.belongsTo(db.CafeArea, { as: "cafe_area", foreignKey: "area_code" });
        db.Cafe.belongsTo(db.CafeAreaGroup, { as: "cafe_area_group", foreignKey: "area_group_code" });
        db.Cafe.hasMany(db.CafeImages, { as: "CafeImageList", foreignKey: 'cafe_number', onDelete: 'cascade' });

        // db.Cafe.belongsToMany(db.User, { as: "clickLikes", through: db.CafeLiked, foreignKey: 'cafe_number' });
        db.Cafe.hasMany(db.CafeLiked, { as: "clickLikes", foreignKey: 'cafe_number' });
        db.Cafe.belongsToMany(db.SearchFilter, { as: "filter_thema", through: db.CafeThema, foreignKey: 'cafe_number', onDelete: 'cascade' });
        db.Cafe.belongsToMany(db.SearchFilter, { as: "filter_service", through: db.CafeService, foreignKey: 'cafe_number', onDelete: 'cascade' });
        db.Cafe.belongsToMany(db.SearchFilterGroup, { as: "main_type", through: db.CafeMainType, foreignKey: 'cafe_number', onDelete: 'cascade' });

        db.Cafe.hasMany(db.CafeThema, { as: "CafeThemeList", foreignKey: 'cafe_number'});
        db.Cafe.hasMany(db.CafeService, { as: "CafeServiceList", foreignKey: 'cafe_number'});
        db.Cafe.hasMany(db.CafeMainType, { as: "HomeCategoryList", foreignKey: 'cafe_number'});

        //  수정 제안
        db.Cafe.hasMany(db.CafeModification, { as: "modification", foreignKey: 'cafe_number' });
    }

    return Cafe;
}