const db = require('../models');
const { isEmpty, replaceSpecialChar } = require('../utills/stringUtil');
const { awsGetKey, getFileRef, getFileRefPath, getFileExt } = require('../utills/fileUtil');

const getTempDate = async () => {


    // return await db.Temp.findAll();
    const query = `SELECT DATE_FORMAT(NOW(), '%Y%m%d') AS SAMPLE_DATE FROM DUAL;`;

    const result = db.sequelize.query(query,
        {
            type: db.Sequelize.QueryTypes.SELECT
        }
    );

    return result;
}


module.exports = {
    getTempDate,
}