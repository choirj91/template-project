const { FiltersService } = require('../services');

// import utils
const { isEmpty } = require('../utills/stringUtil');
const { errorWrapper, errorGenerator } = require('../utills/errors');
const db = require('../models');

/* 전체 필터 */
const allFilters = errorWrapper(async (req, res, next) => {
    
    const data = await FiltersService.getAllFilters();

    return res.status(200).json({
        message: "success",
        data
    })
});

module.exports = {
    allFilters,
}