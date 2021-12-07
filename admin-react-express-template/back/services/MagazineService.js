const db = require('../models');
const { errorGenerator } = require('../utills/errors');
const { isEmpty } = require('../utills/stringUtil');
const { awsGetKey, getFileRef, getFileRefPath, getFileExt } = require('../utills/fileUtil');

/* 매거진 존재 유무 체크 */
const magazineCheck = async (magazineNumber) => {

    const magazine = await db.Magazine.findOne({ where: { magazine_number: magazineNumber } });

    return !isEmpty(magazine);
}

/* 매거진 데이터 불러오기 */
const getMagazineData = async (magazineNumber) => {

    // 매거진 상세
    const data = await db.Magazine.findOne({
        where: { magazine_number: magazineNumber },
        attributes: [
            'magazine_number',
            'magazine_title',
            'magazine_subtitle',
            'magazine_content',
            'image_url',
            'created_at',
        ],
        include: [{
            model: db.Admin,
            as: "writer",
            attributes: [
                ['nickname', 'user_nickname'],
                ['profile_img_url', 'user_profile_img_url'],
            ],
        }, {
            model: db.MagazineContents,
            as: "magazine_contents",
            attributes: ['contents_number', 'contents_title', 'contents_subtitle', 'contents_text'],
            include: [{
                model: db.MagazineContentsTag,
                as: "contents_tags",
                attributes: ['tag_name', 'id'],
            }, {
                model: db.MagazineContentsImages,
                as: "contents_images",
                attributes: ['image_url', 'image_ref'],
            }, {
                model: db.Cafe,
                as: "cafe",
                attributes: ['cafe_number', 'cafe_title', 'cafe_address', 'profile_img_url'],
            }],
        }],
        order: [['magazine_contents', 'contents_number', 'ASC'], ['magazine_contents', 'contents_images', 'order_rank', 'ASC']]
    });


    return data;
}

/* 매거진 리스트 불러오기 */
const getMagazinesLists = async (page, limit) => {

    let magazines = {};
    let magazinesCount = 0;

    // 전체 카운트
    const getMagazinesCount = async () => {
        const countQuery = `SELECT COUNT(1) as count FROM magazine;`;
        const result = await db.sequelize.query(
            countQuery,
            {
                type: db.Sequelize.QueryTypes.SELECT,
                raw: true
            }
        );
        magazinesCount = result[0] ? result[0].count : 0;
    }

    // 매거진 리스트
    const getMagazines = async () => {
        const magazinesSelect =
            `SELECT
            magazine_number,
            magazine_title,
            magazine_subtitle,
            dp_yn,
            created_at,
            admin_number,
            (SELECT nickname FROM admin A where A.admin_number = M.admin_number) AS admin_nickname
        FROM magazine M
        ORDER BY magazine_number DESC
        LIMIT ${limit}
        OFFSET ${(page) * limit};`;

        const result = await db.sequelize.query(
            magazinesSelect,
            {
                type: db.Sequelize.QueryTypes.SELECT,
                raw: true, // 모델 정의가 안되어 있을 경우 true
            }
        );

        magazines = result;
    }

    let result = await Promise.all([
        getMagazinesCount(),
        getMagazines()
    ]);

    const reData = {
        count: magazinesCount,
        rows: magazines
    };

    return reData;
};

/* 매거진 노출 변경 */
const changeDisplay = async (display, magazineNumber) => {

    return await db.Magazine.update({ dp_yn: display }, { where: { magazine_number: magazineNumber } });
}

/* 매거진 삭제 */
const removeMagazine = async (magazineNumber) => {

    return await db.Magazine.destroy({ where: { magazine_number: magazineNumber } });
}

/* 매거진 등록 */
const addMagazines = async (magazineInfo, adminNumber) => {


    return await db.sequelize.transaction(async t => {
        const {
            magazine_title,
            magazine_subtitle,
            magazine_content,
            image_name,
            image_url,
            magazine_contents,
        } = magazineInfo;

        const magazine = {
            magazine_title,
            magazine_subtitle,
            magazine_content,
            image_ori_name: image_name,
            image_url,
            dp_yn: 0,
            admin_number: adminNumber,
        };

        // 매거진 등록
        const resultMagazine = await db.Magazine.create(magazine, { transaction: t });

        // 매거진  콘텐츠
        return await Promise.all(magazine_contents.map(async (item, i) => {
            const { contents_title, contents_subtitle, contents_text, cafe,
                contents_tags, contents_images
            } = item;

            const content = {
                contents_title,
                contents_subtitle,
                contents_text,
            }

            if(!isEmpty(cafe.cafe_number)) content.cafe_number =cafe.cafe_number;

            const newContent = await resultMagazine.createMagazine_content(content, { transaction: t });

            // 태그 추가
            await Promise.all(contents_tags.map(async (tag) => {
                return await newContent.createContents_tag({ tag_name: tag.tag_name }, { transaction: t });
            }));

            // 이미지 추가
            await Promise.all(contents_images.map(async (image, index) => {
                let imageExt = getFileExt(image.image_name);
                return await newContent.createContents_image({
                    order_rank: index,
                    image_ori_name: image.image_file.originalname,
                    image_url: image.image_file.location,
                    image_ref: image.image_ref,
                    image_ext: imageExt,
                    image_size: image.image_file.size
                }, { transaction: t });
            }));


            return;
        }));
    });
}
/* 매거진 수정 */
const editMagazines = async (magazineInfo, magazineNumber, awsS3DeleteFiles) => {
    const deleteFiles = [];

    return await db.sequelize.transaction(async t => {
        const {
            magazine_title,
            magazine_subtitle,
            magazine_content,
            image_url,
            magazine_contents,
        } = magazineInfo;

        const magazine = {
            magazine_title,
            magazine_subtitle,
            magazine_content,
        };

        if (!isEmpty(magazineInfo.image_file)) {
            magazine.image_ori_name = magazineInfo.image_file.originalname;
            magazine.image_url = magazineInfo.image_file.location;
            const prevImage = await db.Magazine.findOne({ where: { magazine_number: magazineNumber }, attributes: ['image_url'] });
            deleteFiles.push({ key: awsGetKey(prevImage.dataValues.image_url) });
        }
        else magazine.image_url = image_url;


        // 매거진 등록
        const resultMagazine = await db.Magazine.update(magazine, { where: { magazine_number: magazineNumber }, transaction: t });

        /* 매거진 콘텐츠 수정 */
        const getMagazineContents = await db.MagazineContents.findAll({ where: { magazine_number: magazineNumber }, transaction: t });
        const preContents = getMagazineContents.map(v => v.dataValues);

        // 기존 리스트 있을 경우
        if (!isEmpty(preContents)) {


            // 수정
            let updateContents = [];
            for (let i = 0; i < preContents.length; i++) {
                const list = magazine_contents.filter(v => {
                    return v.contents_number === preContents[i].contents_number
                });
                updateContents = updateContents.concat(list)
            }
            if (!isEmpty(updateContents)) {
                await Promise.all(updateContents.map(async (item, i) => {
                    const { contents_title, contents_subtitle, contents_text, cafe, contents_number,
                        contents_tags, contents_images
                    } = item;

                    const content = {
                        contents_title,
                        contents_subtitle,
                        contents_text,
                        cafe_number: isEmpty(cafe?.cafe_number) ? null : cafe?.cafe_number
                    }

                    const updateContent = await db.MagazineContents.update(content, 
                        { where: { contents_number }, transaction: t });

                    /* 태그 */
                    const getTagList = await db.MagazineContentsTag.findAll({where: {contents_number}});

                    // 태그 추가
                    let addTag = contents_tags?.slice();
                    for (let i = 0; i < getTagList.length; i++) {
                        addTag = addTag.filter(v => v.tag_name !== getTagList[i].dataValues.tag_name);
                    }
                    if (!isEmpty(addTag)) {
                        await Promise.all(addTag.map(async (tag, i) => {
                            return await db.MagazineContentsTag.create({ tag_name: tag.tag_name, contents_number }, { transaction: t });
                        }));
                    }
                    // 태그 추가 END

                    // 태그 삭제
                    let removeTags = getTagList?.slice();
                    for (let i = 0; i < contents_tags.length; i++) {
                        removeTags = removeTags.filter(v => v.dataValues.tag_name !== contents_tags[i].tag_name);
                    }
                    if (!isEmpty(removeTags)) {
                        await Promise.all(removeTags.map(async (tag, i) => {
                            return await tag.destroy({ transaction: t });
                        }));
                    }
                    // 태그 삭제 END

                    /* 이미지 */
                    const getImageLists = await db.MagazineContentsImages.findAll({where: {contents_number}});
                    // 작업전 이미지 전체 순위 index 추가
                    for (let i = 0; i < contents_images.length; i++) {
                        const contentsImage = contents_images[i];
                        contentsImage.index = i + 1;
                        
                    }
                    // 이미지 추가 Start
                    let addImages = contents_images?.slice();

                    for (let i = 0; i < getImageLists.length; i++) {
                        addImages = addImages.filter(v => v.image_url !== getImageLists[i].dataValues.image_url);
                    }
                    if (!isEmpty(addImages)) {
                        await Promise.all(addImages.map(async (image, i) => {
                            let imageExt = getFileExt(image.image_name);
                            return await db.MagazineContentsImages.create({
                                contents_number,
                                order_rank: image.index,
                                image_ori_name: image.image_file.originalname,
                                image_url: image.image_file.location,
                                image_ref: image.image_ref,
                                image_ext: imageExt,
                                image_size: image.image_file.size
                            }, { transaction: t });
                        }));
                    }
                    // 이미지 추가 End
                    // 이미지 삭제 Start
                    let removeImages = getImageLists?.slice();
                    for (let i = 0; i < contents_images.length; i++) {
                        removeImages = removeImages.filter(v => v.dataValues.image_url !== contents_images[i].image_url);
                    }
                    if (!isEmpty(removeImages)) {
                        await Promise.all(removeImages.map(async (image, i) => {
                            deleteFiles.push({ key: awsGetKey(image.dataValues.image_url) });
                            return await image.destroy({ transaction: t });
                        }));
                    }
                    // 이미지 삭제 End
                    // 이미지 수정 Start
                    let updateImages = [];
                    for (let i = 0; i < getImageLists.length; i++) {
                        const list = contents_images.filter(v => {
                            return v.image_url === getImageLists[i].dataValues.image_url
                        });
                        updateImages = updateImages.concat(list);
                    }
                    if (!isEmpty(updateImages)) {
                        await Promise.all(updateImages.map(async (image, i) => {
                            await db.MagazineContentsImages.update({
                                image_ref: image.image_ref,
                                order_rank: image.index,
                            }, { 
                                where: { 
                                    contents_number, 
                                    image_url: image.image_url,
                                }, 
                                transaction: t });
                        }));
                    }
                    // 이미지 수정 End
                }));
            }

            // 추가
            let addContents = magazine_contents.slice() || [];
            for (let i = 0; i < preContents.length; i++) {
                addContents = addContents.filter(v => v.contents_number !== preContents[i].contents_number);
            }
            if (!isEmpty(addContents)) {

                // 매거진  콘텐츠
                return await Promise.all(addContents.map(async (item, i) => {
                    const { contents_title, contents_subtitle, contents_text, cafe,
                        contents_tags, contents_images
                    } = item;

                    const content = {
                        magazine_number: magazineNumber,
                        contents_title,
                        contents_subtitle,
                        contents_text,
                        cafe_number: cafe.cafe_number
                    }

                    const newContent = await db.MagazineContents.create(content, { transaction: t });

                    // 태그 추가
                    await Promise.all(contents_tags.map(async (tag) => {
                        return await newContent.createContents_tag({ tag_name: tag.tag_name }, { transaction: t });
                    }));

                    // 이미지 추가
                    await Promise.all(contents_images.map(async (image, index) => {
                        let imageExt = getFileExt(image.image_name);
                        return await newContent.createContents_image({
                            order_rank: index,
                            image_ori_name: image.image_file.originalname,
                            image_url: image.image_file.location,
                            image_ref: image.image_ref,
                            image_ext: imageExt,
                            image_size: image.image_file.size
                        }, { transaction: t });
                    }));

                    return;
                }));
            }// 추가 END

            // 삭제
            let removeContents = getMagazineContents.slice();
            for (let i = 0; i < magazine_contents.length; i++) {
                removeContents = removeContents.filter(v => v.dataValues.contents_number !== magazine_contents[i].contents_number);
            }
            if (!isEmpty(removeContents)) {
                await Promise.all(removeContents.map(async (content, i) => {
                    const contentImageList = await db.MagazineContentsImages.findAll({ where: { contents_number: content.dataValues.contents_number } });
                    for (let im = 0; im < contentImageList.length; im++) {
                        const deleteImage = contentImageList[im];
                        deleteFiles.push({ key: awsGetKey(deleteImage.dataValues.image_url) });
                    }
                    return await content.destroy({ transaction: t });
                }));
            } // 삭제 End




        }
        else { // 기존 리스트 없을 경우 전체 추가
            // 매거진  콘텐츠
            return await Promise.all(magazine_contents.map(async (item, i) => {
                const { contents_title, contents_subtitle, contents_text, cafe,
                    contents_tags, contents_images
                } = item;

                const content = {
                    magazine_number: magazineNumber,
                    contents_title,
                    contents_subtitle,
                    contents_text,
                    cafe_number: cafe.cafe_number
                }

                const newContent = await db.MagazineContents.create(content, { transaction: t });

                // 태그 추가
                await Promise.all(contents_tags.map(async (tag) => {
                    return await newContent.createContents_tag({ tag_name: tag.tag_name }, { transaction: t });
                }));

                // 이미지 추가
                await Promise.all(contents_images.map(async (image, index) => {
                    let imageExt = getFileExt(image.image_name);
                    return await newContent.createContents_image({
                        order_rank: index,
                        image_ori_name: image.image_file.originalname,
                        image_url: image.image_file.location,
                        image_ref: image.image_ref,
                        image_ext: imageExt,
                        image_size: image.image_file.size
                    }, { transaction: t });
                }));

                return;
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
    magazineCheck,
    getMagazinesLists,
    changeDisplay,
    removeMagazine,
    getMagazineData,
    addMagazines,
    editMagazines,
}


