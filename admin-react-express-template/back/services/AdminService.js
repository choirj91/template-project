const db = require('../models');
const { errorGenerator } = require('../utills/errors');

/* 중요 정보 제거  */
const sendAdminInfo = (data) => {
    const {
        // auth_status,
        // auth_grade,
        last_login,
        created_at,
        updated_at,
        // admin_number,
        // admin_id,
        password,
        password_salt,
        // name,
        // nickname,
        ...admin
    } = data;
    return admin;
}

/* 관리자 로그인 정보 불러오기 */
const getAdminInfo = async (adminNumber) => {
    const admin = await db.Admin.findOne({
        where: { admin_number: adminNumber },
    });

    return sendAdminInfo(admin.dataValues);
}

/* 관리자 프로필 정보 불러오기 */
const getAdminProfile = async (adminNumber) => {
    const admin = await db.Admin.findOne({
        where: { admin_number: adminNumber },
        attributes: [
            'admin_id',
            'nickname',
            'name',
            'phone',
            'birth',
            'profile_img_url',
            'created_at',
        ]
    });

    return admin.dataValues;
}

/* 관리자 정보 수정 (프로필, 비밀번호, 사진)*/
const editAdminProfile = async (admin) => {
    const {admin_number, ...adminInfo} = admin;
    return await db.Admin.update(adminInfo, {where: {admin_number: admin_number}});
}

/* 관리자 등록 */
const createAdmins = async (adminInfo) => {

    const findAdmin = await db.Admin.findOne({where: {admin_id: adminInfo.admin_id}});
    if(findAdmin) errorGenerator({statusCode: 500, message: "이미 등록된 메일입니다."});

    const admin = await db.Admin.create(adminInfo);
    return sendAdminInfo(admin.dataValues);
}

/* 관리자 리스트 불러오기 */
const getAdminsList = async () => {
    const admin = await db.Admin.findAll({
        attributes: [
            'admin_id',
            'admin_number',
            'auth_grade',
            'auth_status',
            'birth',
            'created_at',
            'last_login',
            'name',
            'nickname',
            'phone',
            'profile_img_url',
        ]
    });

    return admin;
}

/* 관리자 상태 변경 */
const changeStatus = async (authStatus, adminNumber) => {

    return await db.Admin.update({auth_status: authStatus}, {where: {admin_number: adminNumber}});
}

/* 관리자 권한 변경 */
const changeGrade = async (authGrade, adminNumber) => {

    return await db.Admin.update({auth_grade: authGrade}, {where: {admin_number: adminNumber}});
}

module.exports = {
    getAdminInfo,
    createAdmins,
    getAdminProfile,
    editAdminProfile,
    getAdminsList,
    changeStatus,
    changeGrade,
}