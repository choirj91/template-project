const { NoticesService } = require('../services');
const moment = require('moment');

// import utils
const { isEmpty } = require('../utills/stringUtil');
const { errorWrapper, errorGenerator } = require('../utills/errors');

/* 공지 리스트 */
const getNotices = errorWrapper(async (req, res, next) => {
    const { page, limit } = req.query;

    const data = await NoticesService.getNoticeLists(page, limit);

    return res.status(200).json({
        message: "success",
        data
    });
});

/* 공지 상세 보기 */
const getNoticeDetail = errorWrapper(async (req, res, next) => {
    const { id } = req.params;
    if (isEmpty(id)) errorGenerator({ statusCode: 599, message: "공지 정보가 없습니다." });
    const data = await NoticesService.getNoticeDetail(id);

    return res.status(200).json({
        message: "success",
        data
    });
});

/* 공지 등록 */
const addNotices = errorWrapper(async (req, res, next) => {
    const { type, title, contents } = req.body;
    if (isEmpty(type)) errorGenerator({ statusCode: 599, message: "공지 타입 정보가 없습니다." });
    if (isEmpty(title)) errorGenerator({ statusCode: 599, message: "공지 제목이 없습니다." });
    if (isEmpty(contents)) errorGenerator({ statusCode: 599, message: "공지 내용이 없습니다." });

    await NoticesService.addNoticeDetail(type, title, contents);

    return res.status(200).json({
        message: "success",
    });
});

/* 공지 삭제 */
const removeNotice = errorWrapper(async (req, res, next) => {
    if(req.user.auth_grade !== 9 ) errorGenerator({ statusCode: 401 });
    const { id } = req.params;
    if (isEmpty(id)) errorGenerator({ statusCode: 599, message: "공지 정보가 없습니다." });

    await NoticesService.removeNotice(id);
    
    return res.status(200).json({
        message: "success",
    });
});

/* 공지 수정 */
const editNotice = errorWrapper( async (req, res, next) => {
    const { id } = req.params;
    if (isEmpty(id)) errorGenerator({ statusCode: 599, message: "공지 정보가 없습니다." });
    const { type, title, contents } = req.body;
    if (isEmpty(type)) errorGenerator({ statusCode: 599, message: "공지 타입 정보가 없습니다." });
    if (isEmpty(title)) errorGenerator({ statusCode: 599, message: "공지 제목이 없습니다." });
    if (isEmpty(contents)) errorGenerator({ statusCode: 599, message: "공지 내용이 없습니다." });

    const noticeValues = {
        notice_title: title,
        notice_content: contents,
        notice_type: type,
    }

    await NoticesService.editNotice(id, noticeValues);

    return res.status(200).json({
        message: "success",
    });
});

module.exports = {
    getNotices,
    getNoticeDetail,
    addNotices,
    removeNotice,
    editNotice,
}