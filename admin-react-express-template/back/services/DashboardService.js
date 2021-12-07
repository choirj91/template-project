const db = require('../models');
const { errorGenerator } = require('../utills/errors');
const { ranNickname } = require('../utills/getDataUtil');
const { isEmpty } = require('../utills/stringUtil');

/* 대시보스 통계자료 */
const getDashboardData = async () => {

    let budgetStatistics = {}; // 카드형 통계 자료
    let daysStatistics = {}; // 이번달 최근 7일 접속 통계
    let cafeLists = []; // 노출 등록 최신  리스트

    /* 카드형 통계 자료 */
    const getBudjetData = async () => {
        const budgetStatisticsQuery = `
        SELECT 
            (SELECT COUNT(1) FROM user) AS "total_user_count",
            (SELECT COUNT(1) FROM user WHERE user_sns_naver_id IS NOT NULL) AS "naver_user_count",
            (SELECT COUNT(1) FROM user WHERE user_sns_google_id IS NOT NULL) AS "google_user_count",
            (SELECT COUNT(1) FROM user WHERE user_sns_kakao_id IS NOT NULL) AS "kakao_user_count",
            (SELECT COUNT(1) FROM user WHERE user_sns_apple_id IS NOT NULL) AS "apple_user_count",
            (SELECT COUNT(1) FROM user WHERE date_format(now(), '%Y%m') = date_format(created_at, '%Y%m')) AS "this_month_new_count",
            (SELECT COUNT(1) FROM cafe_temp C) AS "total_cafe_count",
            (SELECT COUNT(1) FROM cafe_menu CM) AS "total_menu_count",
            (SELECT COUNT(DISTINCT user_number) From log_user_activity lua WHERE DATE_FORMAT(NOW(), '%Y%m%d') = DATE_FORMAT(created_at, '%Y%m%d') AND user_number IS NOT NULL ) AS "today_user_count",
            (SELECT COUNT(DISTINCT user_number) From log_user_activity lua WHERE DATE_FORMAT(NOW(), '%Y%m%d') = DATE_FORMAT(created_at, '%Y%m%d') AND user_number IS NULL ) AS "today_visit_count"
        FROM DUAL;`;
    
        const budjectResult = await db.sequelize.query(
            budgetStatisticsQuery,
            {
                type: db.Sequelize.QueryTypes.SELECT,
                raw: true, // 모델 정의가 안되어 있을 경우 true
            }
        );

        budgetStatistics = budjectResult[0];
    }

    /* 일일 7일 동안 접속 통계 */
    const getDaysData = async () => {
        const daysStatisticsQuery = `
        SELECT 
            days, 
            COUNT(1) AS user_cnt, 
            DATE_FORMAT(days, '%d') AS d_date,
            'this' AS type
        FROM (
                SELECT 
                    user_number,
                    DATE_FORMAT(created_at, '%Y%m%d') AS days
                FROM log_user_activity 
                WHERE DATE_FORMAT(created_at, '%Y%m%d') BETWEEN 
                    DATE_FORMAT(date_add(NOW(), interval -6 DAY) , '%Y%m%d')
                    AND DATE_FORMAT(NOW(), '%Y%m%d') AND user_number IS NOT NULL
                GROUP BY user_number, days
            ) A GROUP BY days
            UNION ALL
            SELECT 
                days, 
                COUNT(1) AS user_cnt, 
                DATE_FORMAT(days, '%d') AS d_date,
                'last' AS type
            FROM (
                SELECT 
                    user_number,
                    DATE_FORMAT(created_at, '%Y%m%d') AS days
                FROM log_mobile_activity 
                WHERE DATE_FORMAT(created_at, '%Y%m%d') BETWEEN 
                    DATE_FORMAT(date_add(DATE_ADD(NOW(),INTERVAL -1 MONTH ), interval -6 DAY) , '%Y%m%d')
                    AND DATE_FORMAT(DATE_ADD(NOW(),INTERVAL -1 MONTH), '%Y%m%d')
            GROUP BY user_number, days
        ) A GROUP BY days
        ORDER BY d_date ASC;`;
    
        const daysResult = await db.sequelize.query(
            daysStatisticsQuery,
            {
                type: db.Sequelize.QueryTypes.SELECT,
                raw: true, // 모델 정의가 안되어 있을 경우 true
            }
        );

        daysStatistics = daysResult;
    }

    const getCafeListsData = async () => {

        const cafeListsQuery = `SELECT
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
        WHERE 1=1 
        ORDER BY dp_yn asc, created_at DESC
        LIMIT 10;`;
    
        const cafeListsResult = await db.sequelize.query(
            cafeListsQuery,
            {
                type: db.Sequelize.QueryTypes.SELECT,
                raw: true, // 모델 정의가 안되어 있을 경우 true
            }
        );

        cafeLists = cafeListsResult;
    }


    let result = await Promise.all([
        getBudjetData(), 
        getDaysData(), 
        getCafeListsData(),
    ]);

    const data = {
        budgetStatistics,
        daysStatistics,
        cafeLists
    }

    return data;
}

module.exports = {
    getDashboardData,
}


