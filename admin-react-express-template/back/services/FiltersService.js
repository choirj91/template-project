const db = require('../models');
const { errorGenerator } = require('../utills/errors');
const { isEmpty } = require('../utills/stringUtil');

/* 필터 리스트 */
const getAllFilters = async () => {

    const selectQuery = `
    SELECT 
        JSON_OBJECT(
            'home_category_lists', (SELECT 
                                    JSON_ARRAYAGG(
                                        JSON_OBJECT(
                                            'code_title', group_title,
                                            'code', group_code,
                                            'order_rank', order_rank
                                        )
                                    )
                              FROM search_filter_group WHERE group_type = 'category'),
            'service_lists', (SELECT 
                                    JSON_ARRAYAGG(
                                        JSON_OBJECT(
                                            'code_title', code_title,
                                            'code', code
                                        )
                                    )
                              FROM search_filter WHERE group_code = 'SG01' ),
            'theme_lists', (SELECT 
                                JSON_ARRAYAGG(
                                    JSON_OBJECT(
                                        'code_title', code_title,
                                        'code', code
                                    )
                                )
                            FROM search_filter WHERE group_code = 'TG01' ),
            'menu_filter_lists', (SELECT 
                                JSON_ARRAYAGG(
                                    JSON_OBJECT(
                                        'code_title', code_title,
                                        'code', code,
                                        'group_code', group_code,
                                        'group_title', (select group_title from search_filter_group sfg where sfg.group_code = sf.group_code)
                                    )
                                )
                            FROM search_filter sf WHERE group_code NOT IN ('TG01', 'SG01'))
        ) json
    FROM DUAL;`;

    const result = await db.sequelize.query(
        selectQuery,
        {
            type: db.Sequelize.QueryTypes.SELECT,
            raw: true, // 모델 정의가 안되어 있을 경우 true
        }
    );

    const data = {};
    if (result[0]) {
        data.home_category_lists = result[0].json?.home_category_lists?.sort(function (a, b) {
            if (a.order_rank > b.order_rank) {
                return 1;
            }
            if (a.order_rank < b.order_rank) {
                return -1;
            }
            return 0;
        });
        data.service_lists = result[0].json?.service_lists;
        data.theme_lists = result[0].json?.theme_lists;
        data.menu_filter_lists = result[0].json?.menu_filter_lists;
    }

    return data;
}

module.exports = {
    getAllFilters,
}


