const { AdminService } = require('../services');
const passport = require('passport');
const crypto = require('crypto');

// import utils
const { isEmpty } = require('../utills/stringUtil');
const { errorWrapper, errorGenerator } = require('../utills/errors');
const db = require('../models');

/* 관리자 정보 불러오기 */
const adminsInfo = errorWrapper(async (req, res, next) => {

    const data = await AdminService.getAdminInfo(req.user.admin_number);

    return res.status(200).json({
        message: "success",
        data
    })
});

/* 관리자 리스트 불러오기 */
const adminsList = errorWrapper(async (req, res, next) => {
    if(req.user.auth_grade !== 9 ) errorGenerator({ statusCode: 401 });

    const data = await AdminService.getAdminsList();

    return res.status(200).json({
        message: "success",
        data
    })
});

/* 관리자 프로필 정보 불러오기 */
const adminsProfile = errorWrapper(async (req, res, next) => {

    const data = await AdminService.getAdminProfile(req.user.admin_number);

    return res.status(200).json({
        message: "success",
        data
    })
});

/* 관리자 프로필 수정 */
const adminsEditProfile = errorWrapper(async (req, res, next) => {

    if (isEmpty(req.body.name)) errorGenerator({ statusCode: 599, message: "이름이 없습니다." });
    if (isEmpty(req.body.nickname)) errorGenerator({ statusCode: 599, message: "닉네임이 없습니다." });
    if (req.body.nickname.length > 10) errorGenerator({ statusCode: 599, message: "닉네임은 10자 이하로 해주세요." });

    const admin = {
        admin_number: req.user.admin_number,
        name: req.body.name,
        nickname: req.body.nickname,
        birth: !isEmpty(req.body.birth) ? req.body.birth : null,
        phone: !isEmpty(req.body.phone) ? req.body.phone : null,
    }

    const data = await AdminService.editAdminProfile(admin);

    return res.status(200).json({
        message: "success",
    });
});

/* 관리자 비밀번호 수정 */
const adminsChangePassword = errorWrapper(async (req, res, next) => {

    const { currentPwd, changePwd, checkPwd } = req.body;

    if (isEmpty(currentPwd)) errorGenerator({ statusCode: 599, message: "현재 비밀번호를 입력해 주세요." });
    if (isEmpty(changePwd)) errorGenerator({ statusCode: 599, message: "변경할 비밀번호를 입력해 주세요." });
    if (isEmpty(checkPwd)) errorGenerator({ statusCode: 599, message: "비밀번호 확인을 입력해 주세요." });
    if (checkPwd !== changePwd) errorGenerator({ statusCode: 599, message: "비밀번호 확인과 일치하지 않습니다." });

    const adminPwd = crypto.scryptSync(currentPwd, req.user.password_salt, 64, { N: 1024 }).toString('hex'); // 암호화된 문자로 변경

    // if (result) {
    if (adminPwd !== req.user.password) {
        errorGenerator({ statusCode: 996, message: "현재 비밀번호를 다시 확인해 주세요." });
    }

    // password 암호화
    const salt = crypto.randomBytes(16).toString("hex");
    const hashedPassword = crypto.scryptSync(changePwd, salt, 64, { N: 1024 }).toString('hex');

    const admin = {
        admin_number: req.user.admin_number,
        password: hashedPassword,
        password_salt: salt,
    }

    const data = await AdminService.editAdminProfile(admin);

    return res.status(200).json({
        message: "success",
    });
});

/* 관리자 로그인 */
const adminsLogin = errorWrapper(async (req, res, next) => {
    return passport.authenticate('local', (e, admin, info) => {

        if (e) {
            console.error("[adminsLogin-e Error]", e);
            return res.status(401).send(e);
        }
        if (!isEmpty(info)) {
            console.error("[adminsLogin-info Error]", info);
            return res.status(401).send(info);
        }

        return req.login(admin, async (loginErr) => {
            if (loginErr) {
                console.error("[adminsLogin-loginErr Error]", loginErr);
                return res.status(401).send(loginErr);
            }

            return res.json(admin.dataValues);
        })
    })(req, res, next);
});

/* 관리자 로그아웃 */
const adminsLogout = errorWrapper(async (req, res, next) => {
    req.logout();
    req.session.destroy();
    res.send('logout Success');
});

/* 관리자 등록 */
const adminsRegister = errorWrapper(async (req, res, next) => {
    const { email, password, name, nickname } = req.body;

    if (isEmpty(email)) return errorGenerator({ statusCode: 599 });
    if (isEmpty(password)) return errorGenerator({ statusCode: 599 });
    if (isEmpty(name)) return errorGenerator({ statusCode: 599 });
    if (isEmpty(nickname)) return errorGenerator({ statusCode: 599 });
    if (nickname.length >= 10) return errorGenerator({ statusCode: 599, message: '닉네임은 10자 이하로 해주세요.' });

    // password 암호화
    const salt = crypto.randomBytes(16).toString("hex");
    const hashedPassword = crypto.scryptSync(password, salt, 64, { N: 1024 }).toString('hex');

    const adminInfo = {
        admin_id: email,
        password: hashedPassword,
        password_salt: salt,
        name,
        nickname,
        profile_img_url: "https://cdn.pixabay.com/photo/2016/08/31/11/54/user-1633249_960_720.png"
    }

    // 관리자 등록
    const result = await AdminService.createAdmins(adminInfo);

    return res.status(200).json({
        message: 'success',
        data: result
    });
});


/* 관리자 상태 변경 */
const adminsChangeStatus = errorWrapper(async (req, res, next) => {
    if(req.user.auth_grade !== 9 ) errorGenerator({ statusCode: 401 });
    const { authStatus, adminNumber } = req.body;
    if(isEmpty(authStatus)) errorGenerator({ statusCode: 599});
    if(isEmpty(adminNumber)) errorGenerator({ statusCode: 599});

    await AdminService.changeStatus(authStatus, adminNumber);

    return res.status(200).json({
        message: 'success',
    });
});

/* 관리자 권한 변경 */
const adminsChangeGrade = errorWrapper(async (req, res, next) => {
    if(req.user.auth_grade !== 9 ) errorGenerator({ statusCode: 401 });
    const { authGrade, adminNumber } = req.body;
    if(isEmpty(authGrade)) errorGenerator({ statusCode: 599});
    if(isEmpty(adminNumber)) errorGenerator({ statusCode: 599});

    await AdminService.changeGrade(authGrade, adminNumber);

    return res.status(200).json({
        message: 'success',
    });
});

module.exports = {
    adminsInfo,
    adminsList,
    adminsProfile,
    adminsEditProfile,
    adminsChangePassword,
    adminsLogin,
    adminsLogout,
    adminsRegister,
    adminsChangeStatus,
    adminsChangeGrade,
}