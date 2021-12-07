const db = require('../models');
const { errorGenerator } = require('../utills/errors');
const { isEmpty } = require('../utills/stringUtil');
const { awsGetKey } = require('../utills/fileUtil');

/*  배너 리스트 */
const getBannersLists = async () => {

    const data = await db.Banner.findAll({ order: [['order_rank', 'ASC']] });

    return data;
}

/* 배너 저장 */
const saveBannersLists = async (bannersLists, awsS3DeleteFiles) => {

    const deleteFiles = [];

    return db.sequelize.transaction(async t => {


        const preBannersLists = await db.Banner.findAll();
        if (!isEmpty(preBannersLists)) {
            const preBanners = preBannersLists.map(v => v.dataValues);

            // 수정
            let updateBanners = [];
            for (let i = 0; i < preBanners.length; i++) {
                const list = bannersLists.filter(v => {
                    if(v.id === preBanners[i].id) {
                        if(preBanners[i].image_url !== v.image_url ) {
                            deleteFiles.push({ key: awsGetKey(preBanners[i].image_url) });
                        }
                        return true;
                    } else return false;
                });
                updateBanners = updateBanners.concat(list)
            }
            if (!isEmpty(updateBanners)) {
                await Promise.all(updateBanners.map(async (banner, i) => {
                    return await db.Banner.update({
                        image_ori_name: banner.image_ori_name,
                        image_url: banner.image_url,
                        link_type: banner.link_type,
                        link_target: banner.link_target,
                        dp_yn: banner.dp_yn,
                        title: banner.title,
                        order_rank: banner.order_rank,
                    }, { where: { id: banner.id, }, transaction: t })
                }));
            }
            // 수정 END

            // 추가
            let addBanners = bannersLists?.slice();
            for (let i = 0; i < preBanners.length; i++) {
                addBanners = addBanners.filter(v => v.id !== preBanners[i].id);
            }
            if (!isEmpty(addBanners)) {
                await Promise.all(addBanners.map(async (banner, i) => {
                    return await db.Banner.create({
                        id: banner.id,
                        image_ori_name: banner.image_ori_name,
                        image_url: banner.image_url,
                        link_type: banner.link_type,
                        link_target: banner.link_target,
                        dp_yn: banner.dp_yn,
                        title: banner.title,
                        order_rank: banner.order_rank,
                    }, { transaction: t })
                }));
            }
            // 추가  END

            // 삭제
            let removeBanner = preBanners?.slice();
            for (let i = 0; i < bannersLists.length; i++) {
                removeBanner = removeBanner.filter(v => v.id !== bannersLists[i].id);
            }
            if (!isEmpty(removeBanner)) {
                await Promise.all(removeBanner.map(async (banner, i) => {
                    deleteFiles.push({ key: awsGetKey(banner.image_url) });
                    return await db.Banner.destroy({
                        where: { id: banner.id, }, transaction: t
                    });
                }));
            }
            // 삭제 END

        }
        // 기존 리스트 없을 경우 무조건 등록
        else {
            await Promise.all(bannersLists.map(async (banner, i) => {
                return await db.Banner.create({
                    id: banner.id,
                    image_ori_name: banner.image_ori_name,
                    image_url: banner.image_url,
                    link_type: banner.link_type,
                    link_target: banner.link_target,
                    dp_yn: banner.dp_yn,
                    title: banner.title,
                    order_rank: banner.order_rank,
                }, { transaction: t })
            }));
        }

        // db 정상 처리 완료 후 삭제 이미지 추가
        for (let i = 0; i < deleteFiles.length; i++) {
            awsS3DeleteFiles.push(deleteFiles[i]);
        }

        return 'ok';
    });
}

module.exports = {
    getBannersLists,
    saveBannersLists,
}


