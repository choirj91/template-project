const db = require('../models');
const { isEmpty, replaceSpecialChar } = require('../utills/stringUtil');
const { awsGetKey, getFileRef, getFileRefPath, getFileExt } = require('../utills/fileUtil');

/*  등록 */
const addNewCafes = async (cafeInfo) => {

    return await db.sequelize.transaction(async t => {

        const newCafeInfo = {
            cafe_title: cafeInfo?.cafeTitle,
            cafe_intro: cafeInfo?.cafeIntro,
            cafe_content: cafeInfo?.cafeContents,
            cafe_tel: cafeInfo?.cafeTel,
            cafe_address: cafeInfo?.cafeOldAddress,
            cafe_road_address: cafeInfo?.cafeRoadAddress,
            address_sido: cafeInfo?.cafeSido,
            address_signgu: cafeInfo?.cafeSiGnGu,
            address_emd: cafeInfo?.cafeEMD,
            cafe_latitude: cafeInfo?.cafeLatitude,
            cafe_longitude: cafeInfo?.cafeLongitude,
            open_mon_hours: cafeInfo?.openMonHours,
            close_mon_hours: cafeInfo?.closeMonHours,
            open_tues_hours: cafeInfo?.openTuesHours,
            close_tues_hours: cafeInfo?.closeTuesHours,
            open_wednes_hours: cafeInfo?.openWednesHours,
            close_wednes_hours: cafeInfo?.closeWednesHours,
            open_thurs_hours: cafeInfo?.openThursHours,
            close_thurs_hours: cafeInfo?.closeThursHours,
            open_fri_hours: cafeInfo?.openFriHours,
            close_fri_hours: cafeInfo?.closeFriHours,
            open_satur_hours: cafeInfo?.openSaturHours,
            close_satur_hours: cafeInfo?.closeSaturHours,
            open_sun_hours: cafeInfo?.openSunHours,
            close_sun_hours: cafeInfo?.closeSunHours,
            cafe_offday: cafeInfo?.cafeOffday,
            profile_img_name: cafeInfo?.profileImg?.originalname,
            profile_img_url: cafeInfo?.profileImg?.profile_img_url,
            img_ref: !isEmpty(cafeInfo?.profileImg) ? cafeInfo?.profileImg?.profileRef : null,
            img_ref_path: !isEmpty(cafeInfo?.profileImg) ? cafeInfo?.profileImg?.profileRefPath : null,
            dp_yn: 0
        }

        //  등록
        const newCafe = await db.Cafe.create({
            ...newCafeInfo,
            area_code: db.sequelize.literal(`(select area_code From T_AREA_FILTER taf WHERE address_gu = '${cafeInfo?.cafeSiGnGu}' AND address_dong = '${cafeInfo?.cafeEMD}')`),
            area_group_code: db.sequelize.literal(`(select group_code From T_AREA_FILTER taf WHERE address_gu = '${cafeInfo?.cafeSiGnGu}' AND address_dong = '${cafeInfo?.cafeEMD}')`)
        }, { transaction: t });

        // 카테고리 등록
        const homeCategoryLists = cafeInfo?.categoryLists || [];
        if (!isEmpty(homeCategoryLists)) {
            await Promise.all(homeCategoryLists.map(async (category, i) => {
                return await newCafe.createHomeCategoryList({
                    type_rank: category.typeRank,
                    group_code: category.categoryCode,
                    dp_yn: category.displayYn,
                }, { transaction: t })
            }));
        }

        // 테마 등록
        const themeLists = cafeInfo?.themeLists || [];
        if (!isEmpty(themeLists)) {
            await Promise.all(themeLists.map(async (theme, i) => {
                return await newCafe.createCafeThemeList({
                    code: db.sequelize.literal(`(SELECT code FROM search_filter sf WHERE sf.group_code = 'TG01' AND code_title = '${theme}')`)
                }, { transaction: t })
            }));
        }

        // 서비스 등록
        const serviceLists = cafeInfo?.serviceLists || [];
        if (!isEmpty(serviceLists)) {
            await Promise.all(serviceLists.map(async (service, i) => {
                return await newCafe.createCafeServiceList({
                    code: service.serviceCode,
                    contents_text: service.serviceContents,
                }, { transaction: t });
            }));
        }

        //  이미지 파일 처리
        if (!isEmpty(cafeInfo.cafeImages)) {
            const cafeImageFiles = cafeInfo.cafeImages;
            await Promise.all(cafeImageFiles.map(async (image, i) => {

                return await newCafe.createCafeImageList({
                    order_rank: (i + 1),
                    rep_yn: i < 5 ? 1 : 0,
                    image_ori_name: image.originalname,
                    image_url: image.location,
                    img_ref: getFileRef(image.originalname),
                    img_ref_path: getFileRefPath(image.originalname),
                    image_ext: getFileExt(image.originalname),
                    image_size: image.size,
                }, { transaction: t });
            }));
        }


        //  메뉴
        if (!isEmpty(cafeInfo.menuGroupList)) {
            const menuGroupList = cafeInfo.menuGroupList;
            await Promise.all(menuGroupList.map(async (category, i) => {
                const newMenuCategory = await newCafe.createCafeMenuGroup({
                    display_title: category.categoryTitle,
                    option_gubun: category.categoryOption,
                }, { transaction: t });

                const menuList = category.menuList;
                return await Promise.all(menuList.map(async (item, i) => {
                    const newMenuItem = await newMenuCategory.createCafeMenuList({
                        rep_yn: item.repYn,
                        rep_rank: item.repRank,
                        menu_title: item.menuTitle,
                        price_default: isEmpty(item.defaultPrice) ? null : item.defaultPrice,
                        price_option: isEmpty(item.optionPrice) ? null : item.optionPrice,
                        option_gubun: item.menuOption,
                        cafe_number: newCafe.dataValues.cafe_number,
                    }, { transaction: t });

                    if (!isEmpty(item.repImgInfo)) {
                        await newMenuItem.createMenuImage({
                            image_ori_name: item.repImgInfo.originalname,
                            image_url: item.repImgInfo.location,
                            img_ref: getFileRef(item.repImgInfo.originalname),
                            img_ref_path: getFileRefPath(item.repImgInfo.originalname),
                            image_ext: getFileExt(item.repImgInfo.originalname),
                            image_size: item.repImgInfo.size,
                        }, { transaction: t });
                    }

                    // 메뉴 카테고리
                    if (!isEmpty(item.menuFilter)) {
                        return await Promise.all(item.menuFilter.map(async (filter, i) => {
                            return await newMenuItem.createMenuFilter({
                                code: filter.code
                            }, { transaction: t });
                        }))
                    }

                    return;
                }));
            }));
        }

        return 'ok';
    });
}

/*  리스트 */
const getCafesList = async (page, limit, dpYnOrder, query) => {

    let cafes = {};
    let cafesCount = 0;
    let serchKeyword = null;

    if (!isEmpty(query)) {
        serchKeyword = replaceSpecialChar(query);
        serchKeyword = serchKeyword.replace(/(\s*)/g, "");
    }

    // 전체  수 카운트
    const getCafesCount = async () => {
        const countQuery =
            `SELECT 
                COUNT(1) as count 
            FROM cafe_temp 
            WHERE 1=1 ${!isEmpty(serchKeyword) 
                ? `AND 
                ( 
                    cafe_number = '${query}'
                    OR REPLACE(cafe_title, ' ', '') LIKE '%${serchKeyword}%' ESCAPE '!'
                    OR REPLACE(address_sido, ' ', '') LIKE '%${serchKeyword}%' ESCAPE '!'
                    OR REPLACE(address_signgu, ' ', '') LIKE '%${serchKeyword}%' ESCAPE '!'
                    OR REPLACE(address_emd, ' ', '') LIKE '%${serchKeyword}%' ESCAPE '!'
                )` 
                : ''}`;

        const result = await db.sequelize.query(
            countQuery,
            {
                type: db.Sequelize.QueryTypes.SELECT,
                raw: true
            }
        );
        cafesCount = result[0] ? result[0].count : 0;
    }

    //  리스트
    const getCafes = async () => {
        const cafesSelect = `SELECT
            cafe_number,
            cafe_title,
            cafe_address,
            cafe_road_address,
            address_sido,
            address_signgu,
            address_emd,
            profile_img_name,
            profile_img_url,
            dp_yn,
            created_at
        FROM cafe_temp 
        WHERE 1=1 ${!isEmpty(serchKeyword) ? 
                `AND 
                ( 
                    cafe_number = '${query}'
                    OR REPLACE(cafe_title, ' ', '') LIKE '%${serchKeyword}%' ESCAPE '!'
                    OR REPLACE(address_sido, ' ', '') LIKE '%${serchKeyword}%' ESCAPE '!'
                    OR REPLACE(address_signgu, ' ', '') LIKE '%${serchKeyword}%' ESCAPE '!'
                    OR REPLACE(address_emd, ' ', '') LIKE '%${serchKeyword}%' ESCAPE '!'
                )`
                : ''}
        ORDER BY dp_yn ${dpYnOrder} , created_at DESC
        LIMIT ${limit}
        OFFSET ${(page) * limit};
        `;
        // 정렬 변경 백업
        // ORDER BY dp_yn ${dpYnOrder} ${dpYnOrder.toLowerCase() === 'asc' ? ', created_at DESC' : ''} , cafe_number ASC 

        const result = await db.sequelize.query(
            cafesSelect,
            {
                type: db.Sequelize.QueryTypes.SELECT,
                raw: true, // 모델 정의가 안되어 있을 경우 true
            }
        );

        cafes = result;
    }

    let result = await Promise.all([
        getCafesCount(),
        getCafes()
    ]);

    const reData = {
        count: cafesCount,
        rows: cafes
    };

    return reData;
}

/*  노출 변경 */
const changeDisplay = async (display, cafeNumber) => {

    return await db.Cafe.update({ dp_yn: display }, { where: { cafe_number: cafeNumber } });
}

/*  삭제 */
const removeCafe = async (cafeNumber) => {

    return await db.Cafe.destroy({ where: { cafe_number: cafeNumber } });
}

/*  간단 정보 불러오기 */
const getCafeName = async (cafeNumber) => {
    return await db.Cafe.findOne({
        where: {cafe_number: cafeNumber},
        attributes: ['cafe_number', 'cafe_title', 'cafe_address', 'profile_img_url'],
    });
}

/* 정보 불러오기 */
const getCafeInfo = async (cafeNumber) => {

    const selectQuery = `
    SELECT
    JSON_OBJECT(
        'cafeNumber', CA.cafe_number,
        'cafeTitle', CA.cafe_title,
        'cafeTel', CA.cafe_tel,
        'cafeIntro', CA.cafe_intro,
        'cafeContents', CA.cafe_content,
        'openMonHours', CA.open_mon_hours,
        'closeMonHours', CA.close_mon_hours,
        'openTuesHours', CA.open_tues_hours,
        'closeTuesHours', CA.close_tues_hours,
        'openWednesHours', CA.open_wednes_hours,
        'closeWednesHours', CA.close_wednes_hours,
        'openThursHours', CA.open_thurs_hours,
        'closeThursHours', CA.close_thurs_hours,
        'openFriHours', CA.open_fri_hours,
        'closeFriHours', CA.close_fri_hours,
        'openSaturHours', CA.open_satur_hours,
        'closeSaturHours', CA.close_satur_hours,
        'openSunHours', CA.open_sun_hours,
        'closeSunHours', CA.close_sun_hours,
        'cafeOffday', CA.cafe_offday,
        'cafeOldAddress', CA.cafe_address,
        'cafeRoadAddress', CA.cafe_road_address,
        'cafeSido', CA.address_sido,
        'cafeSiGnGu', CA.address_signgu,
        'cafeEMD', CA.address_emd,
        'cafeLatitude', CA.cafe_latitude,
        'cafeLongitude', CA.cafe_longitude,
        'profileImgUrl', CA.profile_img_url,
        'imgRefPath', CA.img_ref_path,
        'imgRef', CA.img_ref,
        'serviceLists', (SELECT 
                                    JSON_ARRAYAGG(
                                        JSON_OBJECT(
                                        	'serviceName', (SELECT SF.code_title FROM search_filter SF WHERE SF.code = CS.code),
                                        	'serviceCode', CS.code,
                                        	'serviceContents', CS.contents_text,
                                            'id', @ROWNUM:=@ROWNUM+1
                                        )
                                    )
                                FROM cafe_service CS, (SELECT @ROWNUM:=0) R WHERE CA.cafe_number = CS.cafe_number),
        'categoryLists', (SELECT 
                                    JSON_ARRAYAGG(
                                        JSON_OBJECT(
                                        	'categoryName', (SELECT SFG.group_title FROM search_filter_group SFG WHERE SFG.group_code = CMT.group_code),
                                        	'categoryCode', CMT.group_code,
                                        	'typeRank', CMT.type_rank,
                                        	'displayYn', CMT.dp_yn,
                                            'id', @ROWNUM:=@ROWNUM+1
                                        )
                                    )
                                FROM cafe_main_type CMT, (SELECT @ROWNUM:=0) R WHERE CA.cafe_number = CMT.cafe_number),
        'themeLists', (SELECT 
                            JSON_ARRAYAGG(
                                JSON_OBJECT(
                                'title', (SELECT SF.code_title FROM search_filter SF WHERE SF.code = CT.code))
                            )
                        FROM cafe_thema CT WHERE CA.cafe_number = CT.cafe_number),
        'cafeImages', (SELECT
                            JSON_ARRAYAGG(Q.json)
                        FROM (
                            SELECT
                            JSON_OBJECT(
                                            'dataURL', CI.image_url,
                                            'rank', order_rank,
                                            'fileName', image_ori_name,
                                            'index', @ROWNUM:=@ROWNUM+1
                                            ) json
                            FROM cafe_images_temp CI, (SELECT @ROWNUM:=0) R WHERE CI.cafe_number = CA.cafe_number
                            ORDER BY order_rank ASC
                        ) Q),
        'menuCategoryList', (SELECT
                                    JSON_ARRAYAGG(Q.json)
                                FROM (
                                    SELECT
                                        JSON_OBJECT(
                                            'id', CMG.id,
                                            'categoryTitle', CMG.display_title,
                                            'categoryOption', CMG.option_gubun,
                                            'menuList', JSON_ARRAYAGG(
                                                                JSON_OBJECT(
                                                                    'menuNumber', CM.menu_number,
                                                                    'menuTitle', CM.menu_title,
                                                                    'defaultPrice', CM.price_default,
                                                                    'optionPrice', CM.price_option,
                                                                    'menuOption', CM.option_gubun,
                                                                    'repYn', CM.rep_yn,
                                                                    'repRank', CM.rep_rank,
                                                                    'repImgUrl', (select image_url FROM cafe_menu_images cmi where menu_number = CM.menu_number limit 1),
                                                                    'repImgInfo', null,
                                                                    'menuFilter', (SELECT
                                                                        JSON_ARRAYAGG(Q.json)
                                                                    FROM (
                                                                        SELECT
                                                                        JSON_OBJECT(
                                                                               'code', CMC.code,
                                                                               'code_title', (select code_title from search_filter sf where sf.code = CMC.code),
                                                                               'group_code', (select group_code from search_filter sf where sf.code = CMC.code),
                                                                               'group_title', (select sfg.group_title from search_filter sf inner join search_filter_group sfg on sf.group_code = sfg.group_code where sf.code = CMC.code)
                                                                                        ) json
                                                                        FROM cafe_menu_category CMC WHERE CMC.menu_number = CM.menu_number
                                                                    ) Q)
                                                                )
                                                            )
                                        ) json
                                    FROM cafe_menu_group AS CMG 
                                    LEFT OUTER JOIN cafe_menu AS CM ON CMG.id = CM.cafe_menu_group_id 
                                    WHERE CMG.cafe_number = CA.cafe_number
                                    GROUP BY CMG.id, CMG.display_title, CMG.option_gubun
                                ) Q)
            )  data
        FROM cafe_temp CA
        WHERE CA.cafe_number = ${cafeNumber};
        `;

    const result = await db.sequelize.query(
        selectQuery,
        {
            type: db.Sequelize.QueryTypes.SELECT,
            raw: true, // 모델 정의가 안되어 있을 경우 true
        }
    );

    /* 데이터 가공 */
    const data = {
        ...result[0].data,
    };
    // 테마 리스트 문자열 만 추출
    if (!isEmpty(data.themeLists)) {
        data.themeLists = data.themeLists.map(v => v.title);
    }
    // 홈카테고리리스트 boolean type 변경 및 정렬
    if (!isEmpty(data.categoryLists)) {
        for (let i = 0; i < data.categoryLists.length; i++) {
            data.categoryLists[i].displayYn = data.categoryLists[i].displayYn === 1 ? true : false;
        }
        const newCategoryLists = data.categoryLists.sort(function (a, b) {
            if (a.typeRank > b.typeRank) {
                return 1;
            }
            if (a.typeRank < b.typeRank) {
                return -1;
            }
            return 0;
        });
        data.categoryLists = newCategoryLists;
    }
    // 메뉴 대표 boolean typy 변경
    if (!isEmpty(data.menuCategoryList)) {
        for (let i = 0; i < data.menuCategoryList.length; i++) {
            if (!isEmpty(data.menuCategoryList[i]?.menuList)) {
                for (let j = 0; j < data.menuCategoryList[i].menuList.length; j++) {
                    data.menuCategoryList[i].menuList[j].repYn = data.menuCategoryList[i].menuList[j].repYn === 1 ? true : false;
                }
            }
        }
    }

    return data;
}


/*  수정 */
const editCafeInfo = async (cafeEditInfo, preCafeInfo, awsS3DeleteFiles) => {

    const deleteFiles = [];

    return await db.sequelize.transaction(async t => {

        const editCafeInfo = {
            cafe_title: cafeEditInfo?.cafeTitle,
            cafe_intro: cafeEditInfo?.cafeIntro,
            cafe_content: cafeEditInfo?.cafeContents,
            cafe_tel: cafeEditInfo?.cafeTel,
            cafe_address: cafeEditInfo?.cafeOldAddress,
            cafe_road_address: cafeEditInfo?.cafeRoadAddress,
            address_sido: cafeEditInfo?.cafeSido,
            address_signgu: cafeEditInfo?.cafeSiGnGu,
            address_emd: cafeEditInfo?.cafeEMD,
            cafe_latitude: cafeEditInfo?.cafeLatitude,
            cafe_longitude: cafeEditInfo?.cafeLongitude,
            open_mon_hours: cafeEditInfo?.openMonHours,
            close_mon_hours: cafeEditInfo?.closeMonHours,
            open_tues_hours: cafeEditInfo?.openTuesHours,
            close_tues_hours: cafeEditInfo?.closeTuesHours,
            open_wednes_hours: cafeEditInfo?.openWednesHours,
            close_wednes_hours: cafeEditInfo?.closeWednesHours,
            open_thurs_hours: cafeEditInfo?.openThursHours,
            close_thurs_hours: cafeEditInfo?.closeThursHours,
            open_fri_hours: cafeEditInfo?.openFriHours,
            close_fri_hours: cafeEditInfo?.closeFriHours,
            open_satur_hours: cafeEditInfo?.openSaturHours,
            close_satur_hours: cafeEditInfo?.closeSaturHours,
            open_sun_hours: cafeEditInfo?.openSunHours,
            close_sun_hours: cafeEditInfo?.closeSunHours,
            cafe_offday: cafeEditInfo?.cafeOffday,
            profile_img_name: cafeEditInfo?.profileImg?.originalname,
            profile_img_url: cafeEditInfo?.profileImg?.location,
            img_ref: !isEmpty(cafeEditInfo?.profileImg?.location) ? cafeEditInfo?.profileImg?.profileRef : null,
            img_ref_path: !isEmpty(cafeEditInfo?.profileImg?.location) ? cafeEditInfo?.profileImg?.profileRefPath : null,
        }

        //  수정
        const editCafe = await db.Cafe.update({
            ...editCafeInfo,
            area_code: db.sequelize.literal(`(select area_code From T_AREA_FILTER taf WHERE address_gu = '${cafeEditInfo?.cafeSiGnGu}' AND address_dong = '${cafeEditInfo?.cafeEMD}')`),
            area_group_code: db.sequelize.literal(`(select group_code From T_AREA_FILTER taf WHERE address_gu = '${cafeEditInfo?.cafeSiGnGu}' AND address_dong = '${cafeEditInfo?.cafeEMD}')`),
            updated_at: db.sequelize.literal(`NOW()`)
        }, {
            where: { cafe_number: cafeEditInfo.cafeNumber },
            transaction: t
        });

        // 테마 등록
        const themeLists = cafeEditInfo?.themeLists || [];
        const preThemeLists = await db.CafeThema.findAll({
            attributes: [
                'cafe_number',
                'code',
                [db.sequelize.literal(`(SELECT code_title FROM search_filter sf WHERE sf.code = CafeThema.code)`), 'title'],
            ],
            where: { cafe_number: cafeEditInfo.cafeNumber }
        });
        if (!isEmpty(themeLists)) {
            // 기존 리스트가 있을 경우 비교해서 처리
            if (!isEmpty(preThemeLists)) {
                const preTheme = preThemeLists.map(v => v.dataValues.title);

                // 추가
                let addTheme = themeLists?.slice();
                for (let i = 0; i < preTheme.length; i++) {
                    addTheme = addTheme.filter(v => v !== preTheme[i]);
                }
                if (!isEmpty(addTheme)) {
                    await Promise.all(addTheme.map(async (theme, i) => {
                        return await preCafeInfo.createCafeThemeList({
                            code: db.sequelize.literal(`(SELECT code FROM search_filter sf WHERE sf.group_code = 'TG01' AND code_title = '${theme}')`)
                        }, { transaction: t })
                    }));
                }

                // 삭제
                let removeTheme = preThemeLists.map(v => v.dataValues.title);
                for (let i = 0; i < themeLists.length; i++) {
                    removeTheme = removeTheme.filter(v => v !== themeLists[i]);
                }
                if (!isEmpty(removeTheme)) {
                    await Promise.all(removeTheme.map(async (theme, i) => {
                        return await db.CafeThema.destroy({
                            where: {
                                cafe_number: cafeEditInfo.cafeNumber,
                                [db.Sequelize.Op.and]: [
                                    db.sequelize.literal(`code = (SELECT code FROM search_filter sf WHERE sf.group_code = 'TG01' AND code_title = '${theme}')`)
                                ]
                            },
                            transaction: t
                        });
                    }));
                }
            } else { // 기존 리스트 없을 경우 삽입만
                await Promise.all(themeLists.map(async (theme, i) => {
                    return await preCafeInfo.createCafeThemeList({
                        code: db.sequelize.literal(`(SELECT code FROM search_filter sf WHERE sf.group_code = 'TG01' AND code_title = '${theme}')`)
                    }, { transaction: t })
                }));
            }
        }
        // 전체 삭제
        else {
            if (!isEmpty(preThemeLists)) {
                await Promise.all(preThemeLists.map(async (theme, i) => {
                    return await theme.destroy({ transaction: t });
                }));
            }
        }

        // 카테고리 등록
        const homeCategoryLists = cafeEditInfo?.categoryLists?.slice() || [];
        const preCafeCategoryLists = await db.CafeMainType.findAll({
            attributes: [
                'cafe_number',
                'group_code',
                'type_rank',
                'dp_yn',
            ],
            where: { cafe_number: cafeEditInfo.cafeNumber }
        });
        if (!isEmpty(homeCategoryLists)) {


            // 기존 리스트가 있을 경우 비교해서 처리
            if (!isEmpty(preCafeCategoryLists)) {
                const preCategoryCode = preCafeCategoryLists.map(v => v.dataValues);

                // 수정
                let updateCategory = [];
                for (let i = 0; i < preCategoryCode.length; i++) {
                    const list = homeCategoryLists.filter(v => {
                        return v.categoryCode === preCategoryCode[i].group_code
                    });
                    updateCategory = updateCategory.concat(list)
                }
                if (!isEmpty(updateCategory)) {
                    await Promise.all(updateCategory.map(async (category, i) => {

                        return await db.CafeMainType.update({
                            type_rank: category.typeRank,
                            dp_yn: category.displayYn,
                        }, {
                            where: {
                                cafe_number: cafeEditInfo.cafeNumber,
                                group_code: category.categoryCode
                            }, transaction: t
                        })
                    }));
                }

                // 추가
                let addCategory = homeCategoryLists?.slice();
                for (let i = 0; i < preCategoryCode.length; i++) {
                    addCategory = addCategory.filter(v => v.categoryCode !== preCategoryCode[i].group_code);
                }
                if (!isEmpty(addCategory)) {
                    await Promise.all(addCategory.map(async (category, i) => {
                        return await preCafeInfo.createHomeCategoryList({
                            type_rank: category.typeRank,
                            group_code: category.categoryCode,
                            dp_yn: category.displayYn,
                        }, { transaction: t })
                    }));
                }

                // 삭제
                let removeCategory = preCategoryCode?.slice();
                for (let i = 0; i < homeCategoryLists.length; i++) {
                    removeCategory = removeCategory.filter(v => v.group_code !== homeCategoryLists[i].categoryCode);
                }
                if (!isEmpty(removeCategory)) {
                    await Promise.all(removeCategory.map(async (category, i) => {
                        return await db.CafeMainType.destroy({
                            where: {
                                cafe_number: cafeEditInfo.cafeNumber,
                                group_code: category.group_code
                            },
                            transaction: t
                        });
                    }));
                }

            } else { // 기존 리스트 없을 경우 삽입만
                await Promise.all(homeCategoryLists.map(async (category, i) => {
                    return await preCafeInfo.createHomeCategoryList({
                        type_rank: category.typeRank,
                        group_code: category.categoryCode,
                        dp_yn: category.displayYn,
                    }, { transaction: t })
                }));
            }
        }
        // 모두 삭제
        else {
            if (!isEmpty(preCafeCategoryLists)) {
                await Promise.all(preCafeCategoryLists.map(async (category, i) => {
                    return await category.destroy({ transaction: t });
                }));
            }
        }

        // 서비스 등록
        const serviceLists = cafeEditInfo?.serviceLists?.slice() || [];
        const getPreServiceLists = await db.CafeService.findAll({
            attributes: [
                'cafe_number',
                'code',
                'contents_text',
            ],
            where: { cafe_number: cafeEditInfo.cafeNumber }
        });
        if (!isEmpty(serviceLists)) {
            const preServiceLists = getPreServiceLists.map(v => v.dataValues);

            // 기존 리스트가 있을 경우 비교해서 처리
            if (!isEmpty(preServiceLists)) {

                // 수정
                let updateService = [];
                for (let i = 0; i < preServiceLists.length; i++) {
                    const list = serviceLists.filter(v => {
                        return v.serviceCode === preServiceLists[i].code
                    });
                    updateService = updateService.concat(list)
                }
                if (!isEmpty(updateService)) {
                    await Promise.all(updateService.map(async (service, i) => {
                        return await db.CafeService.update({
                            contents_text: service.serviceContents,
                        }, {
                            where: {
                                cafe_number: cafeEditInfo.cafeNumber,
                                code: service.serviceCode
                            }, transaction: t
                        })
                    }));
                }

                // 추가
                let addService = cafeEditInfo?.serviceLists?.slice() || [];
                for (let i = 0; i < preServiceLists.length; i++) {
                    addService = addService.filter(v => v.serviceCode !== preServiceLists[i].code);
                }
                if (!isEmpty(addService)) {
                    await Promise.all(addService.map(async (service, i) => {
                        return await preCafeInfo.createCafeServiceList({
                            code: service.serviceCode,
                            contents_text: service.serviceContents,
                        }, { transaction: t })
                    }));
                }

                // 삭제
                let removeService = preServiceLists?.slice();
                for (let i = 0; i < serviceLists.length; i++) {
                    removeService = removeService.filter(v => v.code !== serviceLists[i].serviceCode);
                }
                if (!isEmpty(removeService)) {
                    await Promise.all(removeService.map(async (service, i) => {
                        return await db.CafeService.destroy({
                            where: {
                                cafe_number: cafeEditInfo.cafeNumber,
                                code: service.code
                            },
                            transaction: t
                        });
                    }));
                }
            }
            else {
                await Promise.all(serviceLists.map(async (service, i) => {
                    return await preCafeInfo.createCafeServiceList({
                        code: service.serviceCode,
                        contents_text: service.serviceContents,
                    }, { transaction: t });
                }));
            }
        }
        // 모두 삭제
        else {
            if (!isEmpty(getPreServiceLists)) {
                await Promise.all(getPreServiceLists.map(async (service, i) => {
                    return await service.destroy({ transaction: t });
                }));
            }
        }

        /*  이미지 파일 처리 */
        // 기존 이미지 불러오기
        const preCafeImages = await db.CafeImages.findAll({
            attributes: [
                'id',
                'order_rank',
                'image_ori_name',
                'image_url',
                'image_ext',
                'image_size',
            ],
            where: { cafe_number: cafeEditInfo.cafeNumber }
        });
        if (!isEmpty(cafeEditInfo.imageValues)) {
            // 업로드 데이터 합치기
            const allImages = cafeEditInfo.imageValues?.slice();
            if (!isEmpty(cafeEditInfo.cafeImages)) {
                for (let i = 0; i < cafeEditInfo.cafeImages.length; i++) {
                    const size = cafeEditInfo.cafeImages[i].size;
                    const fileName = cafeEditInfo.cafeImages[i].originalname;
                    for (let j = 0; j < allImages.length; j++) {
                        if (allImages[j].fileName === fileName && allImages[j].file.size === size) {
                            allImages[j].file = {
                                ...allImages[j].file,
                                key: cafeEditInfo.cafeImages[i].key,
                                location: cafeEditInfo.cafeImages[i].location
                            }
                        }
                    }
                }
            }

            // 기존 리스트가 있을 경우 비교해서 처리
            if (!isEmpty(preCafeImages)) {
                // 추가  dataURL 업고 file 이 있으면
                let addImages = allImages?.slice();
                for (let i = 0; i < preCafeImages.length; i++) {
                    addImages = addImages.filter(v => !isEmpty(v.file) && v.dataURL !== preCafeImages[i].dataValues.image_url);
                }
                if (!isEmpty(addImages)) {
                    await Promise.all(addImages.map(async (image, i) => {
                        return await preCafeInfo.createCafeImageList({
                            order_rank: image?.rank,
                            rep_yn: image?.rank < 5 ? 1 : 0,
                            image_ori_name: image?.file?.name,
                            image_url: image?.file?.location,
                            img_ref: getFileRef(image?.file?.name),
                            img_ref_path: getFileRefPath(image?.file?.name),
                            image_ext: getFileExt(image?.file?.name),
                            image_size: image?.file?.size,
                        }, { transaction: t });
                    }));
                }
                // 수정  dataURL 있고 file 이 없으면
                let updateImages = [];
                for (let i = 0; i < preCafeImages.length; i++) {
                    const list = allImages.filter(v => {
                        return !isEmpty(v.dataURL) && v.dataURL === preCafeImages[i].dataValues.image_url && v.rank !== preCafeImages[i].dataValues.order_rank;
                    });
                    updateImages = updateImages.concat(list);
                }
                if (!isEmpty(updateImages)) {
                    await Promise.all(updateImages.map(async (image, i) => {
                        return await db.CafeImages.update({
                            order_rank: image.rank,
                            rep_yn: image.rank < 5 ? 1 : 0,
                        }, {
                            where: { cafe_number: cafeEditInfo.cafeNumber, image_url: image.dataURL },
                            transaction: t
                        });
                    }));
                }

                // 삭제  비교
                let removeImages = preCafeImages?.slice();
                for (let i = 0; i < allImages.length; i++) {
                    removeImages = removeImages.filter(v => v.dataValues.image_url !== allImages[i].dataURL);
                }
                if (!isEmpty(removeImages)) {
                    await Promise.all(removeImages.map(async (image, i) => {
                        deleteFiles.push({ key: awsGetKey(image.dataValues.image_url) });
                        return await image.destroy({ transaction: t });
                    }));
                }
            }
            // 등록만
            else {
                if (!isEmpty(allImages)) {
                    await Promise.all(allImages.map(async (image, i) => {
                        if (!isEmpty(image?.file)) {
                            const imageFileExt = image?.file?.name?.split('.')[image?.file?.name?.split('.').length - 1].toLowerCase();
                            return await preCafeInfo.createCafeImageList({
                                order_rank: image?.rank,
                                rep_yn: image?.rank <= 5 ? 1 : 0,
                                image_ori_name: image?.file?.name,
                                image_url: image?.file?.location,
                                img_ref: getFileRef(image?.file?.name),
                                img_ref_path: getFileRefPath(image?.file?.name),
                                image_ext: getFileExt(image?.file?.name),
                                image_size: image?.file?.size,
                            }, { transaction: t });
                        } else return;
                    }));
                }
            }
        }
        // 모두 삭제
        else {
            if (!isEmpty(preCafeImages)) {
                await Promise.all(preCafeImages.map(async (image, i) => {
                    deleteFiles.push({ key: awsGetKey(image.dataValues.image_url) });
                    return await image.destroy({ transaction: t });
                }));
            }
        }


        /*  메뉴 그룹*/
        const menuGroupList = cafeEditInfo?.menuGroupList?.slice() || [];
        const getPreMenuGroupLists = await db.CafeMenuGroup.findAll({
            attributes: [
                'id',
                'display_title',
                'option_gubun',
            ],
            where: { cafe_number: cafeEditInfo.cafeNumber }
        });
        if (!isEmpty(menuGroupList)) {
            const preMenuGroupLists = getPreMenuGroupLists.map(v => v.dataValues);

            // 기존 리스트가 있을 경우 비교해서 처리 
            if (!isEmpty(preMenuGroupLists)) {

                // 수정
                let updateGroup = [];
                for (let i = 0; i < getPreMenuGroupLists.length; i++) {
                    const list = menuGroupList.filter(v => {
                        return v.id === getPreMenuGroupLists[i].id
                    });
                    updateGroup = updateGroup.concat(list)
                }
                if (!isEmpty(updateGroup)) {
                    await Promise.all(updateGroup.map(async (group, i) => {

                        const groupUpdate = await db.CafeMenuGroup.update({
                            display_title: group.categoryTitle,
                            option_gubun: group.categoryOption
                        }, {
                            where: {
                                id: group.id
                            }, transaction: t
                        });

                        /* 메뉴 처리 */
                        const menuList = group.menuList;
                        const getPreMenuLists = await db.CafeMenu.findAll({
                            attributes: [
                                'menu_number',
                                'rep_yn',
                                'rep_rank',
                                'menu_title',
                                'menu_content',
                                'price_default',
                                'price_option',
                                'option_gubun',
                                'cafe_number',
                                'cafe_menu_group_id',
                                [db.sequelize.literal(`
                                (
                                    SELECT image_url 
                                    FROM cafe_menu_images CMI 
                                    WHERE CMI.menu_number = CafeMenu.menu_number
                                ) 
                                `), 'image_url'],
                            ],
                            where: { cafe_number: cafeEditInfo.cafeNumber, cafe_menu_group_id: group.id }
                        });

                        if (!isEmpty(menuList)) {
                            const preMenuLists = getPreMenuLists.map(v => v.dataValues);

                            // 기존 리스트가 있을 경우 비교해서 처리
                            if (!isEmpty(preMenuLists)) {

                                // 수정
                                let updateMenu = [];
                                for (let i = 0; i < preMenuLists.length; i++) {
                                    const list = menuList.filter(v => {
                                        return v.menuNumber === preMenuLists[i].menu_number
                                    });
                                    updateMenu = updateMenu.concat(list)
                                }
                                if (!isEmpty(updateMenu)) {
                                    await Promise.all(updateMenu.map(async (menu, i) => {

                                        const preMenuImage = await db.CafeMenuImages.findOne({ where: { menu_number: menu.menuNumber } });

                                        if (menu.repYn === true && !isEmpty(menu.repImgUrl)) {
                                            if (!isEmpty(preMenuImage)) {
                                                if (preMenuImage.dataValues.image_url !== menu.repImgUrl) {
                                                    await db.CafeMenuImages.update({
                                                        image_ori_name: menu.repImgInfo.originalname,
                                                        image_url: menu.image_url,
                                                        img_ref: getFileRef(menu.repImgInfo.originalname),
                                                        img_ref_path: getFileRefPath(menu.repImgInfo.originalname),
                                                        image_ext: getFileExt(menu.repImgInfo.originalname),
                                                        image_size: menu.repImgInfo.size
                                                    }, { where: { menu_number: menu.menuNumber }, transaction: t });
                                                }
                                            }
                                            else {
                                                await db.CafeMenuImages.create({
                                                    image_ori_name: menu.repImgInfo.originalname,
                                                    image_url: menu.image_url,
                                                    img_ref: getFileRef(menu.repImgInfo.originalname),
                                                    img_ref_path: getFileRefPath(menu.repImgInfo.originalname),
                                                    image_ext: getFileExt(menu.repImgInfo.originalname),
                                                    image_size: menu.repImgInfo.size,
                                                    menu_number: menu.menuNumber
                                                }, { transaction: t });
                                            }
                                        }
                                        else {
                                            if (!isEmpty(preMenuImage)) {
                                                await preMenuImage.destroy();
                                                deleteFiles.push({ key: awsGetKey(preMenuImage.dataValues.image_url) });
                                            }
                                        }

                                        // 메뉴 카테고리
                                        if (!isEmpty(menu.menuFilter)) {
                                            await db.CafeMenuCategory.destroy({ where: { menu_number: menu.menuNumber }, transaction: t });
                                            await Promise.all(menu.menuFilter.map(async (filter, i) => {
                                                return await db.CafeMenuCategory.create({
                                                    code: filter.code,
                                                    menu_number: menu.menuNumber
                                                }, { transaction: t });
                                            }))
                                        }
                                        // 메뉴 필터 없을 경우 모두 삭제
                                        else {
                                            await db.CafeMenuCategory.destroy({ where: { menu_number: menu.menuNumber }, transaction: t });
                                        }

                                        return await db.CafeMenu.update({
                                            rep_yn: menu.repYn,
                                            rep_rank: menu.repRank,
                                            menu_title: menu.menuTitle,
                                            price_default: isEmpty(menu.defaultPrice) ? null : menu.defaultPrice,
                                            price_option: isEmpty(menu.optionPrice) ? null : menu.optionPrice,
                                            option_gubun: menu.menuOption,
                                        }, {
                                            where: { menu_number: menu.menuNumber },
                                            transaction: t
                                        })
                                    }));
                                } // 수정 끝

                                // 메뉴 추가
                                let addMenu = menuList?.slice();
                                for (let i = 0; i < preMenuLists.length; i++) {
                                    addMenu = addMenu.filter(v => v.menuNumber !== preMenuLists[i].menu_number);
                                }

                                if (!isEmpty(addMenu)) {
                                    await Promise.all(addMenu.map(async (item, i) => {
                                        const newMenuItem = await db.CafeMenu.create({
                                            rep_yn: item.repYn,
                                            rep_rank: item.repRank,
                                            menu_title: item.menuTitle,
                                            price_default: isEmpty(item.defaultPrice) ? null : item.defaultPrice,
                                            price_option: isEmpty(item.optionPrice) ? null : item.optionPrice,
                                            option_gubun: item.menuOption,
                                            cafe_number: cafeEditInfo.cafeNumber,
                                            cafe_menu_group_id: group.id
                                        }, { transaction: t });

                                        if (!isEmpty(item.repImgInfo)) {
                                            await newMenuItem.createMenuImage({
                                                image_ori_name: item.repImgInfo.originalname,
                                                image_url: item.image_url,
                                                img_ref: getFileRef(item.repImgInfo.originalname),
                                                img_ref_path: getFileRefPath(item.repImgInfo.originalname),
                                                image_ext: getFileExt(item.repImgInfo.originalname),
                                                image_size: item.repImgInfo.size,
                                            }, { transaction: t });
                                        }

                                        // 메뉴 카테고리
                                        if (!isEmpty(item.menuFilter)) {
                                            return await Promise.all(item.menuFilter.map(async (filter, i) => {
                                                return await newMenuItem.createMenuFilter({
                                                    code: filter.code
                                                }, { transaction: t });
                                            }))
                                        }

                                        return;
                                    }));
                                } // 메뉴 추가 End

                                // 메뉴 삭제
                                let removeMenu = getPreMenuLists.slice();
                                for (let i = 0; i < menuList.length; i++) {
                                    removeMenu = removeMenu.filter(v => v.dataValues.menu_number !== menuList[i].menuNumber);
                                }
                                if (!isEmpty(removeMenu)) {
                                    await Promise.all(removeMenu.map(async (menu, i) => {
                                        return await menu.destroy({ transaction: t });
                                    }));
                                }

                            }
                            else { // 전체 추가
                                /* 메뉴 추가 */
                                return await Promise.all(menuList.map(async (item, i) => {
                                    const newMenuItem = await db.CafeMenu.create({
                                        rep_yn: item.repYn,
                                        rep_rank: item.repRank,
                                        menu_title: item.menuTitle,
                                        price_default: item.defaultPrice,
                                        price_option: item.optionPrice,
                                        option_gubun: item.menuOption,
                                        cafe_number: cafeEditInfo.cafeNumber,
                                        cafe_menu_group_id: group.id
                                    }, { transaction: t });

                                    if (!isEmpty(item.repImgInfo)) {
                                        await newMenuItem.createMenuImage({
                                            image_ori_name: item.repImgInfo.originalname,
                                            image_url: item.image_url,
                                            img_ref: getFileRef(item.repImgInfo.originalname),
                                            img_ref_path: getFileRefPath(item.repImgInfo.originalname),
                                            image_ext: getFileExt(item.repImgInfo.originalname),
                                            image_size: item.repImgInfo.size,
                                        }, { transaction: t });
                                    }

                                    // 메뉴 카테고리
                                    if (!isEmpty(item.menuFilter)) {
                                        return await Promise.all(item.menuFilter.map(async (filter, i) => {
                                            return await newMenuItem.createMenuFilter({
                                                code: filter.code
                                            }, { transaction: t });
                                        }))
                                    }

                                    return;
                                }));
                                /* 메뉴 추가 End */
                            }

                        }
                        // 전체 삭제
                        else {
                            if (!isEmpty(getPreMenuLists)) {
                                await Promise.all(getPreMenuLists.map(async (menu, i) => {
                                    deleteFiles.push({ key: awsGetKey(menu.dataValues.image_url) });
                                    return await menu.destroy({ transaction: t });
                                }));
                            }
                        }
                        return;
                    }));
                } // 수정 End

                // 추가
                let addGroup = cafeEditInfo?.menuGroupList?.slice() || [];
                for (let i = 0; i < getPreMenuGroupLists.length; i++) {
                    addGroup = addGroup.filter(v => v.id !== getPreMenuGroupLists[i].id);
                }
                if (!isEmpty(addGroup)) {
                    return await Promise.all(addGroup.map(async (group, i) => {
                        // 그룹 추가
                        const addGroupResult = await preCafeInfo.createCafeMenuGroup({
                            display_title: group.categoryTitle,
                            option_gubun: group.categoryOption,
                        }, { transaction: t });

                        /* 메뉴 추가 */
                        const menuList = group.menuList;
                        return await Promise.all(menuList.map(async (item, i) => {
                            const newMenuItem = await addGroupResult.createCafeMenuList({
                                rep_yn: item.repYn,
                                rep_rank: item.repRank,
                                menu_title: item.menuTitle,
                                price_default: item.defaultPrice,
                                price_option: item.optionPrice,
                                option_gubun: item.menuOption,
                                cafe_number: cafeEditInfo.cafeNumber,
                            }, { transaction: t });

                            if (!isEmpty(item.repImgInfo)) {
                                await newMenuItem.createMenuImage({
                                    image_ori_name: item.repImgInfo.originalname,
                                    image_url: item.image_url,
                                    img_ref: getFileRef(item.repImgInfo.originalname),
                                    img_ref_path: getFileRefPath(item.repImgInfo.originalname),
                                    image_ext: getFileExt(item.repImgInfo.originalname),
                                    image_size: item.repImgInfo.size,
                                }, { transaction: t });
                            }

                            // 메뉴 카테고리
                            if (!isEmpty(item.menuFilter)) {
                                return await Promise.all(item.menuFilter.map(async (filter, i) => {
                                    return await newMenuItem.createMenuFilter({
                                        code: filter.code
                                    }, { transaction: t });
                                }))
                            }

                            return;
                        }));
                        /* 메뉴 추가 End */
                    }));
                } // 추가 End

                // 삭제
                let removeGroup = getPreMenuGroupLists?.slice();
                for (let i = 0; i < menuGroupList.length; i++) {
                    removeGroup = removeGroup.filter(v => v.id !== menuGroupList[i].id);
                }
                if (!isEmpty(removeGroup)) {
                    await Promise.all(removeGroup.map(async (group, i) => {
                        return await group.destroy({ transaction: t });
                    }));
                } // 삭제 End

                // <수정>
                // 
                //   기본정보
                //     - 기본정보수정여부 v
                //   카테고리 리스트 v
                //     [ 리스트 내 반복문 v
                //         - 추가 v
                //         - 수정 v
                //         - 삭제 v
                //     ]
                //   서비스 리스트 v
                //     [ 리스트 내 반복문 v
                //         - 추가 v
                //         - 수정 v
                //         - 삭제 v
                //     ]
                //   테마 리스트 v
                //     [ 리스트 내 반복문 v
                //         - 추가 v
                //         - 수정 v
                //         - 삭제 v
                //     ]
                //   이미지 리스트 v
                //     [ 리스트 내 반복문 v
                //         - 추가 v
                //         - 수정 v
                //         - 삭제 v
                //     ]
                //   프로필사진 v
                //     - 추가 v
                //     - 수정 v
                //   메뉴그룹 리스트
                //     [ 메뉴그룹 내 반복문 v
                //         - 추가 v
                //           [메뉴리스트 내 반복문
                //             메뉴정보
                //             - 추가
                //             [메뉴 필터 리스트 내 반복분
                //               메뉴필터
                //               - 추가
                //             ]
                //             메뉴 이미지
                //             - 추가
                //           ]                        
                //         - 수정 v
                //           [메뉴리스트 내 반복문
                //             메뉴
                //                - 추가
                //                [메뉴 필터 리스트 내 반복분
                //                  메뉴필터
                //                  - 추가
                //                ]
                //                메뉴이미지
                //                - 추가
                //             메뉴
                //                - 수정
                //                [메뉴 필터 리스트 내 반복분
                //                  메뉴필터
                //                  - 추가
                //                  - 수정
                //                  - 삭제
                //                ]
                //                메뉴이미지
                //                - 추가                 
                //                - 수정                 
                //                - 삭제          
                //             메뉴       
                //                - 삭제
                //                [메뉴 필터 리스트 내 반복분
                //                  메뉴필터
                //                  - 삭제
                //                ]
                //                메뉴이미지
                //                - 삭제
                //           ]
                //         - 삭제 v
                //           [메뉴리스트 내 반복문
                //             메뉴
                //               - 삭제
                //               [메뉴 필터 리스트 내 반복분
                //                    메뉴필터
                //                    - 삭제
                //                  ]
                //               메뉴 이미지
                //               - 삭제
                //           ]                          
                //     ]
            }
            else { // 전체 추가
                await Promise.all(menuGroupList.map(async (group, i) => {
                    const addGroupResult = await preCafeInfo.createCafeMenuGroup({
                        display_title: group.categoryTitle,
                        option_gubun: group.categoryOption,
                    }, { transaction: t });

                    /* 메뉴 추가 */
                    const menuList = group.menuList;
                    return await Promise.all(menuList.map(async (item, i) => {
                        const newMenuItem = await addGroupResult.createCafeMenuList({
                            rep_yn: item.repYn,
                            rep_rank: item.repRank,
                            menu_title: item.menuTitle,
                            price_default: item.defaultPrice,
                            price_option: item.optionPrice,
                            option_gubun: item.menuOption,
                            cafe_number: cafeEditInfo.cafeNumber,
                        }, { transaction: t });

                        if (!isEmpty(item.repImgInfo)) {
                            await newMenuItem.createMenuImage({
                                image_ori_name: item.repImgInfo.originalname,
                                image_url: item.image_url,
                                img_ref: getFileRef(item.repImgInfo.originalname),
                                img_ref_path: getFileRefPath(item.repImgInfo.originalname),
                                image_ext: getFileExt(item.repImgInfo.originalname),
                                image_size: item.repImgInfo.size,
                            }, { transaction: t });
                        }

                        // 메뉴 카테고리
                        if (!isEmpty(item.menuFilter)) {
                            return await Promise.all(item.menuFilter.map(async (filter, i) => {
                                return await newMenuItem.createMenuFilter({
                                    code: filter.code
                                }, { transaction: t });
                            }))
                        }

                        return;
                    }));
                    /* 메뉴 추가 End */
                }));
            }
        }
        // 전체 삭제
        else {
            if (!isEmpty(getPreMenuGroupLists)) {
                await Promise.all(getPreMenuGroupLists.map(async (group, i) => {
                    return await group.destroy({ transaction: t });
                }));
            }
        }

        // db 정상 처리 완료 후 삭제 이미지 추가
        for (let i = 0; i < deleteFiles.length; i++) {
            awsS3DeleteFiles.push(deleteFiles[i]);
        }

        return 'ok';
    });
}

 /*  존재 유무 체크 */
const cafeCheck = async ( cafeNumber ) => {

    const cafe = await db.Cafe.findOne({where: {cafe_number: cafeNumber}});

    return !isEmpty(cafe);
}

module.exports = {
    addNewCafes,
    getCafesList,
    changeDisplay,
    removeCafe,
    getCafeInfo,
    editCafeInfo,
    cafeCheck,
    getCafeName,
}