const { MagazineService } = require('../services');
const moment = require('moment');

// import utils
const { isEmpty } = require('../utills/stringUtil');
const { awsS3Get, awsS3Upload, awsS3Delete, awsGetKey, awsS3Put } = require('../utills/fileUtil');
const { errorWrapper, errorGenerator } = require('../utills/errors');

/* 매거진 */
const getMagazineData = errorWrapper(async (req, res, next) => {
    const { magazineNumber } = req.params;
    if (isEmpty(magazineNumber)) errorGenerator({ statusCode: 599 });

    const data = await MagazineService.getMagazineData(magazineNumber);
    if (isEmpty(data)) errorGenerator({ statusCode: 599, message: "매거진 정보가 없습니다." });

    return res.status(200).json({
        message: "success",
        data
    });
});

/* 매거진 리스트 */
const getMagazines = errorWrapper(async (req, res, next) => {
    const { page, limit } = req.query;
    if (isEmpty(page)) errorGenerator({ statusCode: 599 });
    if (isEmpty(limit)) errorGenerator({ statusCode: 599 });

    const data = await MagazineService.getMagazinesLists(page, limit);

    return res.status(200).json({
        message: "success",
        data
    });
});

/* 매거진 노출 변경 */
const displayMagazine = errorWrapper(async (req, res, next) => {
    const { magazineNumber } = req.params;
    const { display } = req.body;
    if (req.user.auth_grade !== 9) errorGenerator({ statusCode: 401 });
    if (isEmpty(display)) errorGenerator({ statusCode: 599 });
    if (isEmpty(magazineNumber)) errorGenerator({ statusCode: 599, message: "매거진 정보가 없습니다." });

    const data = await MagazineService.changeDisplay(display, magazineNumber);

    return res.status(200).json({
        message: "success"
    });
});

/* 매거진 삭제 */
const deleteMagazine = errorWrapper(async (req, res, next) => {
    const { magazineNumber } = req.params;
    if (req.user.auth_grade !== 9) errorGenerator({ statusCode: 401 });
    if (isEmpty(magazineNumber)) errorGenerator({ statusCode: 599, message: "매거진 정보가 없습니다." });

    const data = await MagazineService.removeMagazine(magazineNumber);

    return res.status(200).json({
        message: "success"
    });
});

/* 매거진 등록 */
const addMagazines = errorWrapper(async (req, res, next) => {
    let uploadFiles = [];
    let awsS3DeleteFiles = []; // 삭제 대상 파일 'key'

    try {
        const result = await new Promise(function (resolve, reject) {
            const today = moment().format("YYYY-MM-DD");
            const savePath = 'magazine/' + today + '/';
            const imageSize = 5000 * 1024 * 1024;
            var imageUpload = awsS3Upload(imageSize, savePath).array('image');

            return imageUpload(req, res, (err) => {
                const { magazine } = req.body;
                const magazineInfo = !isEmpty(magazine) ? JSON.parse(magazine) : null;

                uploadFiles = req.files;

                /* 서버 필수 값 체크 */
                if (isEmpty(magazineInfo)) return reject('예기치 못한 에러가 발생되었습니다.');
                if (isEmpty(magazineInfo.image_url) && isEmpty(magazineInfo.image_file)) return reject('매거진 사진을 등록해주세요.');
                if (isEmpty(magazineInfo.magazine_contents)) return reject('콘텐츠를 추가해 주세요.');

                for (let i = 0; i < magazineInfo.magazine_contents.length; i++) {
                    const content = magazineInfo.magazine_contents[i];
                    if (isEmpty(content.contents_tags)) return reject(`[${i + 1}]-태그를 하나 이상 입력해 주세요.`);
                    if (isEmpty(content.contents_images)) return reject(`[${i + 1}]- 사진을 등록해 주세요.`);

                    // 2021. 11. 01 필수 X 제거
                    //   for (let j = 0; j < content.contents_images.length; j++) {
                    //       const contentImg = content.contents_images[j];
                    //       if(isEmpty(contentImg.image_ref)) return reject(`[${i+1}-${j+1}]-사진출처를 입력해 주세요.`);
                    //   }

                    // 2021. 11. 01 필수 X 제거
                    // if (isEmpty(content.cafe)) return reject(`[${i + 1}]-정보를 등록해 주세요.`);
                }

                if (err) {
                    console.error("[newCafes Error!]", err);
                    let sendMsg = err.message;
                    if (err && err.message) {
                        if (JSON.stringify(err.message).includes('File too large')) sendMsg = 'size';
                    }
                    return reject(sendMsg);
                }

                return resolve({ magazineInfo: magazineInfo, allImages: req.files });
            });
        });

        const magazineInfo = result.magazineInfo;
        const allImages = result.allImages;

        // 업로드 이미지 파일 매칭
        for (let i = 0; i < allImages.length; i++) {
            const image = allImages[i];
            // 매거진 이미지 매칭
            if (magazineInfo.image_size === image.size && magazineInfo.image_name === image.originalname) {
                magazineInfo.image_url = image.location;
                magazineInfo.image_file = image;
            }
            //  이미지 매칭
            const contents = magazineInfo.magazine_contents;
            for (let j = 0; j < contents.length; j++) {
                const content = contents[j];
                for (let k = 0; k < content.contents_images.length; k++) {
                    const contentImage = content.contents_images[k];
                    if (contentImage.image_size === image.size && contentImage.image_name === image.originalname) {
                        contentImage.image_url = image.location;
                        contentImage.image_file = image;
                    }
                }
            }
        }

        /* 매거진 등록 */
        await MagazineService.addMagazines(magazineInfo, req.user.admin_number);

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

        let errorMsg = error;
        if (error === '599') return errorGenerator({ statusCode: 599 });
        else if (error === 'size') errorMsg = imageSize / 1024 / 1024 + 'M 용량을 초과하는 사진이 있습니다.';

        console.error('[addMagazines Error!]', error);
        if (!isEmpty(errorMsg)) return errorGenerator({ statusCode: 500, message: errorMsg });
        else {
            return errorGenerator({ statusCode: 500, message: "파일 업로드 중 에러가 발생되었습니다." });
        }
    } finally {
        /* temp 이미지 처리 */
        try {
            if (!isEmpty(awsS3DeleteFiles)) {
                await Promise.all(awsS3DeleteFiles.map(async item => {
                    await awsS3Delete(item.key);
                }));
            }
        } catch (error) {
            console.error('[addMagazines-awsS3Delete Error!]');
        }
    }
});

/* 매거진 수정 */
const editMagazines = errorWrapper(async (req, res, next) => {
    const { magazineNumber } = req.params;
    let uploadFiles = [];
    let awsS3DeleteFiles = []; // 삭제 대상 파일 'key'

    try {
        const result = await new Promise(function (resolve, reject) {
            const today = moment().format("YYYY-MM-DD");
            const savePath = 'magazine/' + today + '/';
            const imageSize = 5000 * 1024 * 1024;
            var imageUpload = awsS3Upload(imageSize, savePath).array('image');

            return imageUpload(req, res, (err) => {
                const { magazine } = req.body;
                const magazineInfo = !isEmpty(magazine) ? JSON.parse(magazine) : null;

                uploadFiles = req.files;

                /* 서버 필수 값 체크 */
                if (isEmpty(magazineInfo)) return reject('예기치 못한 에러가 발생되었습니다.');
                if (isEmpty(magazineInfo.image_url)) return reject('매거진 사진을 등록해주세요.');
                if (isEmpty(magazineInfo.magazine_contents)) return reject('콘텐츠를 추가해 주세요.');

                for (let i = 0; i < magazineInfo.magazine_contents.length; i++) {
                    const content = magazineInfo.magazine_contents[i];
                    if (isEmpty(content.contents_tags)) return reject(`[${i + 1}]-태그를 하나 이상 입력해 주세요.`);
                    if (isEmpty(content.contents_images)) return reject(`[${i + 1}]- 사진을 등록해 주세요.`);

                    // 2021. 11. 01 필수 X 제거
                    //   for (let j = 0; j < content.contents_images.length; j++) {
                    //       const contentImg = content.contents_images[j];
                    //       if(isEmpty(contentImg.image_ref)) return reject(`[${i+1}-${j+1}]-사진출처를 입력해 주세요.`);
                    //   }

                    // 2021. 11. 01 필수 X 제거
                    // if (isEmpty(content.cafe)) return reject(`[${i + 1}]-정보를 등록해 주세요.`);
                }

                if (err) {
                    console.error("[newCafes Error!]", err);
                    let sendMsg = err.message;
                    if (err && err.message) {
                        if (JSON.stringify(err.message).includes('File too large')) sendMsg = 'size';
                    }
                    return reject(sendMsg);
                }

                return resolve({ magazineInfo: magazineInfo, allImages: req.files });
            });
        });

        const magazineInfo = result.magazineInfo;
        const allImages = result.allImages;

        // 업로드 이미지 파일 매칭
        for (let i = 0; i < allImages.length; i++) {
            const image = allImages[i];
            // 매거진 이미지 매칭
            if (magazineInfo.image_size === image.size && magazineInfo.image_name === image.originalname) {
                magazineInfo.image_url = image.location;
                magazineInfo.image_file = image;
            }
            //  이미지 매칭
            const contents = magazineInfo.magazine_contents;
            for (let j = 0; j < contents.length; j++) {
                const content = contents[j];
                for (let k = 0; k < content.contents_images.length; k++) {
                    const contentImage = content.contents_images[k];
                    if (contentImage.image_size === image.size && contentImage.image_name === image.originalname) {
                        contentImage.image_url = image.location;
                        contentImage.image_file = image;
                    }
                }
            }
        }

        /* 매거진 수정 */
        await MagazineService.editMagazines(magazineInfo, magazineNumber, awsS3DeleteFiles);

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

        let errorMsg = error;
        if (error === '599') return errorGenerator({ statusCode: 599 });
        else if (error === 'size') errorMsg = imageSize / 1024 / 1024 + 'M 용량을 초과하는 사진이 있습니다.';

        console.error('[editMagazines Error!]', error);
        if (!isEmpty(errorMsg)) return errorGenerator({ statusCode: 500, message: errorMsg });
        else {
            return errorGenerator({ statusCode: 500, message: "파일 업로드 중 에러가 발생되었습니다." });
        }
    } finally {
        /* temp 이미지 처리 */
        try {
            if (!isEmpty(awsS3DeleteFiles)) {
                await Promise.all(awsS3DeleteFiles.map(async item => {
                    await awsS3Delete(item.key);
                }));
            }
        } catch (error) {
            console.error('[editMagazines-awsS3Delete Error!]');
        }
    }
});


module.exports = {
    getMagazines,
    displayMagazine,
    deleteMagazine,
    getMagazineData,
    addMagazines,
    editMagazines
}