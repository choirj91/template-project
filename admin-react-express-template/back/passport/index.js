const passport = require('passport');
const db = require('../models');
const local = require('./local');

module.exports = () => {
    passport.serializeUser((admin, done) => {
        return done(null, admin.admin_number);
    });
    passport.deserializeUser(async (id, done) => {
        try {
            const admin = await db.Admin.findOne({
                where: { admin_number: id }
            });
            return done(null, admin);
        } catch (e) {
            console.error('deserializeUserError = ', e);
            return done(e);
        }
    });
    
    local();
};