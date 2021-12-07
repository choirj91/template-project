const { isEmpty } = require('../../utills/stringUtil');
const { errorGenerator } = require('../../utills/errors');
const dotenv = require('dotenv');
dotenv.config();


/* Login Check */
exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).send('로그인이 필요합니다.');
    }
};