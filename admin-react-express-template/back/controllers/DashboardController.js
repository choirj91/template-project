const verifyAppleToken = require('verify-apple-id-token').default;
const { DashboardService } = require('../services');
const axios = require('axios');
const passport = require('passport');
const moment = require('moment');
const crypto = require('crypto');

// import utils
const { isEmpty } = require('../utills/stringUtil');
const { errorWrapper, errorGenerator } = require('../utills/errors');
const db = require('../models');

/* 통계자료 전달 */
const dashboardData = errorWrapper(async (req, res, next) => {
    
    const data = await DashboardService.getDashboardData();

    return res.status(200).json({
        message: "success",
        data
    });
});

module.exports = {
    dashboardData,
}