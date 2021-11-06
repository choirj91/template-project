const { TempService } = require('../services');
const passport = require('passport');
const crypto = require('crypto');

// import utils
const { isEmpty } = require('../utills/stringUtil');
const { errorWrapper, errorGenerator } = require('../utills/errors');
const db = require('../models');

const getTempValue = errorWrapper(async (req, res, next) => {

    const data = await TempService.getTempDate();

    return res.status(200).json({
        message: "success",
        data
    })
});

module.exports = {
    getTempValue,
}