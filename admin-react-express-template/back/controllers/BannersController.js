const { BannersService, CafesService, NoticesService, MagazineService } = require('../services');

// import utils
const { isEmpty } = require('../utills/stringUtil');
const { errorWrapper, errorGenerator } = require('../utills/errors');
const { awsS3Get, awsS3Upload, awsS3Delete, awsGetKey, awsS3Put } = require('../utills/fileUtil');
const db = require('../models');

/* 배너 리스트 */
const getBanners = errorWrapper(async (req, res, next) => {

    const data = await BannersService.getBannersLists();

    return res.status(200).json({
        message: "success",
        data
    })
});

/* 배너 수정 */
const editBanners = errorWrapper(async (req, res, next) => {
    let uploadFiles = [];
    let awsS3DeleteFiles = []; // 삭제 대상 파일 'key'

    try {
        const result = await new Promise(function (resolve, reject) {
            //   const today = moment().format("YYYY-MM-DD");
            //   const savePath = 'banner/' + today + '/';
            const savePath = 'banner/';
            const imageSize = 5000 * 1024 * 1024;
            var imageUpload = awsS3Upload(imageSize, savePath).array('image');

            return imageUpload(req, res, async (err) => {
                const { bannersLists } = req.body;
                const banners = JSON.parse(bannersLists);
                uploadFiles = req.files;

                /* 서버 필수 값 체크 */
                // if (isEmpty(banners)) return reject("배너 정보가 없습니다.");

                // 배너 타입 값 체크
                for (let i = 0; i < banners.length; i++) {
                    const banner = banners[i];
                    if (banner.link_type === 'notice') {
                        const noticeCheck = await NoticesService.noticeCheck(banner.link_target);
                        if(!noticeCheck) return reject("존재하지 않는 공지입니다.");
                    }
                    else if (banner.link_type === 'cafe') {
                        const cafeCheck = await CafesService.cafeCheck(banner.link_target);
                        if(!cafeCheck) return reject("존재하지 않는 입니다.");
                    }
                    else if (banner.link_type === 'magazine') {
                        const magazineCheck = await MagazineService.magazineCheck(banner.link_target);
                        if(!magazineCheck) return reject("존재하지 않는 매거진입니다.");
                    }
                }

                if (err) {
                    console.error("[banners Error!]", err);
                    let sendMsg = err.message;
                    if (err && err.message) {
                        if (JSON.stringify(err.message).includes('File too large')) sendMsg = 'size';
                    }
                    return reject(sendMsg);
                }

                return resolve({ bannersLists: banners });
            });
        });

        const bannersData = result.bannersLists;

        // image_size 값이 존재하면, image_ori_name + image_size 로 uploadFiles 매칭 필요.
        for (let i = 0; i < bannersData.length; i++) {
            if (!isEmpty(bannersData[i].image_size)) {
                for (let j = 0; j < uploadFiles.length; j++) {
                    const file = uploadFiles[j];
                    if (bannersData[i].image_ori_name === file.originalname && bannersData[i].image_size === file.size) {
                        bannersData[i].image_url = file.location;
                    }
                }
            }
        }

        await BannersService.saveBannersLists(bannersData, awsS3DeleteFiles);

        return res.status(200).json({
            message: "success",
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

        if (!isEmpty(errorMsg)) return errorGenerator({ statusCode: 500, message: errorMsg });
        else {
            console.error('[uploadCafeLogo Error!]', error);
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
            console.error('[newCafes-awsS3Delete Error!]');
        }
    }
});

module.exports = {
    getBanners,
    editBanners,
}