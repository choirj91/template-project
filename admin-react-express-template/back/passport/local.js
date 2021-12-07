const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const crypto = require('crypto');
const db = require('../models');
const moment = require('moment');

moment.locale('ko');

module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: 'adminId',
        passwordField: 'password'
    }, async (adminId, password, done) => {
        try {
            const admin = await db.Admin.findOne({ where: { admin_id: adminId } });
            if (!admin) {
                return done(null, false, { reason: '아이디 또는 비밀번호를 다시 확인해주세요.' });
            }
            const adminPwd = crypto.scryptSync(password, admin.password_salt, 64, { N: 1024 }).toString('hex'); // 암호화된 문자로 변경

            // if (result) {
            if (adminPwd === admin.password) {
                if(!admin.auth_status) return done(null, false, { reason: '승인이 필요합니다.' });
                else return done(null, admin);
            }
            return done(null, false, { reason: '아이디 또는 비밀번호를 다시 확인해주세요.' });
        } catch (e) {
            console.error('passport local', e);
            return done(e);
        }
    }));
}