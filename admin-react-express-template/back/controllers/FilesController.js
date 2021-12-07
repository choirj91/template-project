const moment = require('moment');

// import utils
const { isEmpty } = require('../utills/stringUtil');
const { awsS3Upload, awsS3Delete } = require('../utills/fileUtil');
const { errorWrapper, errorGenerator } = require('../utills/errors');
const { AdminService } = require('../services');

// setting
const imageSize = 50 * 1024 * 1024; // 50Mb

/* 1장 업로드 */
const uploadImageFile = errorWrapper(async (req, res, next) => {

    let uploadFiles = [];
    try {
        const result = await new Promise(function (resolve, reject) {
            const today = moment().format("YYYY-MM-DD");
            const savePath = 'file-temp/' + today + '/';
            var imageUpload = awsS3Upload(imageSize, savePath).array('image');

            return imageUpload(req, res, (err) => {
                uploadFiles = req.files;

                if (err) {
                    console.error("[uploadImageFile Error!]", err);
                    let sendMsg = err.message;
                    if (err && err.message) {
                        if (JSON.stringify(err.message).includes('File too large')) sendMsg = 'size';
                    }
                    return reject(sendMsg);
                }
                return resolve(req.files);
            });
        });

        return res.status(200).json({
            message: "success",
            data: result
        });

    } catch (error) {
        // 에러 발생했을 경우, 업로드 된 파일 데이터는 삭제 
        if (!isEmpty(uploadFiles)) {
            uploadFiles.map(async (file, i) => {
                awsS3Delete(file.key);
                return;
            });
        }

        let errorMsg = '';
        if (error === '599') return errorGenerator({ statusCode: 599, message: errorMsg });
        else if (error === 'size') errorMsg = imageSize / 1024 / 1024 + 'M 용량을 초과하는 사진이 있습니다.';
        if (!isEmpty(errorMsg)) return errorGenerator({ statusCode: 500, message: errorMsg });
        else {
            console.error('[uploadImageFile Error!]', error);
            return errorGenerator({ statusCode: 500 });
        }
    }
});

/* 관리자 프로필 사진 업로드 */
const uploadAdminProfile = errorWrapper(async (req, res, next) => {

    let uploadFiles = [];
    try {
        const result = await new Promise(function (resolve, reject) {
            const today = moment().format("YYYY-MM-DD");
            const savePath = 'admin-profile/' + today + '/';
            var imageUpload = awsS3Upload(imageSize, savePath).array('image');

            return imageUpload(req, res, (err) => {
                uploadFiles = req.files;

                if (err) {
                    console.error("[uploadImageFile Error!]", err);
                    let sendMsg = err.message;
                    if (err && err.message) {
                        if (JSON.stringify(err.message).includes('File too large')) sendMsg = 'size';
                    }
                    return reject(sendMsg);
                }
                return resolve(req.files);
            });
        });

        if (isEmpty(result[0]?.location)) return errorGenerator({ statusCode: 500 });

        const admin = {
            admin_number: req.user.admin_number,
            profile_img_url: result[0]?.location
        }

        const data = await AdminService.editAdminProfile(admin);

        return res.status(200).json({
            message: "success"
        });

    } catch (error) {
        // 에러 발생했을 경우, 업로드 된 파일 데이터는 삭제 
        if (!isEmpty(uploadFiles)) {
            uploadFiles.map(async (file, i) => {
                awsS3Delete(file.key);
                return;
            });
        }

        let errorMsg = '';
        if (error === '599') return errorGenerator({ statusCode: 599, message: errorMsg });
        else if (error === 'size') errorMsg = imageSize / 1024 / 1024 + 'M 용량을 초과하는 사진이 있습니다.';
        if (!isEmpty(errorMsg)) return errorGenerator({ statusCode: 500, message: errorMsg });
        else {
            console.error('[uploadImageFile Error!]', error);
            return errorGenerator({ statusCode: 500, message: "파일 업로드 중 에러가 발생되었습니다." });
        }
    }
});

/* 1장 삭제 */
const deleteImageFile = errorWrapper(async (req, res, next) => {

    const { key } = req.body;

    try {
        if (!isEmpty(key)) awsS3Delete(key);
        
    } catch (error) {
        console.error('deleteImageFile Error', error);
    }

    return res.status(200).json({
        message: "success"
    });
});

module.exports = {
    uploadImageFile,
    uploadAdminProfile,
    deleteImageFile,
}