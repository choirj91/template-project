const db = require('../models');
const { errorGenerator } = require('../utills/errors');
const { isEmpty } = require('../utills/stringUtil');

/* 공지 리스트 */
const getNoticeLists = async (page, limit) => {

    let notices = {};
    let noticesCount = 0;

    // 전체 카운트
    const getCafesCount = async () => {
        const countQuery =
            `SELECT COUNT(1) as count FROM notice
            `;

        const result = await db.sequelize.query(
            countQuery,
            {
                type: db.Sequelize.QueryTypes.SELECT,
                raw: true
            }
        );
        noticesCount = result[0] ? result[0].count : 0;
    }

    // 공지 리스트
    const getCafes = async () => {
        const noticesSelect =
            `SELECT
            id,
            notice_title,
            notice_type,
            created_at
        FROM notice 
        ORDER BY id DESC
        LIMIT ${limit}
        OFFSET ${(page) * limit};
        `;

        const result = await db.sequelize.query(
            noticesSelect,
            {
                type: db.Sequelize.QueryTypes.SELECT,
                raw: true, // 모델 정의가 안되어 있을 경우 true
            }
        );

        notices = result;
    }

    let result = await Promise.all([
        getCafesCount(),
        getCafes()
    ]);

    const reData = {
        count: noticesCount,
        rows: notices
    };

    return reData;
};

/* 공지사항 상세 */
const getNoticeDetail = async (id) => {

    return db.Notice.findOne({ where: { id: id } });
}

/* 공지사항 등록 */
const addNoticeDetail = async (type, title, contents) => {

    return db.Notice.create({
        notice_title: title,
        notice_content: contents,
        notice_type: type,
    });
}

/* 공지사항 삭제 */
const removeNotice = async (id) => {
    return db.Notice.destroy({ where: { id: id } });
}

/* 공지사항 수정 */
const editNotice = async (id, noticeValues) => {

    return db.Notice.update(noticeValues, { where: { id: id } });
}

/* 공지사항 존재 유무 체크 */
const noticeCheck = async (id) => {

    const notice = await db.Notice.findOne({ where: { id: id } });

    return !isEmpty(notice);
}

module.exports = {
    getNoticeLists,
    getNoticeDetail,
    addNoticeDetail,
    removeNotice,
    editNotice,
    noticeCheck,
}


