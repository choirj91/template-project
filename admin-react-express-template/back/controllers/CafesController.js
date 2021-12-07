const moment = require('moment');
const { CafesService } = require('../services');
const db = require('../models');

// import utils
const { isEmpty } = require('../utills/stringUtil');
const { awsS3Get, awsS3Upload, awsS3Delete, awsGetKey, awsS3Put } = require('../utills/fileUtil');
const { errorWrapper, errorGenerator } = require('../utills/errors');

/* 정보 */
const cafesInfo = errorWrapper(async (req, res, next) => {
  const { cafeNumber } = req.params;
  if (isEmpty(cafeNumber)) errorGenerator({ statusCode: 599, message: "정보가 없습니다." });

  const data = await CafesService.getCafeInfo(cafeNumber);

  return res.status(200).json({
    message: "success",
    data: data
  });
})

/*  간단 정보 - 매거진 정보 등록 */
const cafesSimpleInfo = errorWrapper(async (req, res, next) => {
  const { cafeNumber } = req.params;
  if (isEmpty(cafeNumber)) errorGenerator({ statusCode: 599, message: " 번호를 입력해주세요." });

  const data = await CafesService.getCafeName(cafeNumber);
  if(!data) errorGenerator({ statusCode: 500, message: "정보가 없습니다." });

  return res.status(200).json({
    message: "success",
    data: data
  });
})

/*  등록 */
const newCafes = errorWrapper(async (req, res, next) => {
  let uploadFiles = [];
  let awsS3DeleteFiles = []; // 삭제 대상 파일 'key'
  let awsS3UploadFiles = []; // 등록 대상 파일 {body, key}

  try {
    const result = await new Promise(function (resolve, reject) {
      const today = moment().format("YYYY-MM-DD");
      const savePath = 'cafe/' + today + '/';
      const imageSize = 5000 * 1024 * 1024;
      var imageUpload = awsS3Upload(imageSize, savePath).array('image');

      return imageUpload(req, res, (err) => {
        const { cafeValue } = req.body;
        const cafeInfo = JSON.parse(cafeValue);
        uploadFiles = req.files;

        /* 서버 필수 값 체크 */
        if (isEmpty(cafeInfo)) return reject("정보가 없습니다.");
        if (isEmpty(cafeInfo.cafeTitle)) return reject("명이 없습니다.");
        // if(isEmpty(cafeInfo.cafeTel)) return reject("전화번호가 없습니다.");
        // if(isEmpty(cafeInfo.cafeIntro)) return reject("한줄소개가 없습니다.");
        // if(isEmpty(cafeInfo.cafeContents)) return reject("소개가 없습니다.");
        if (isEmpty(cafeInfo.cafeOldAddress)) return reject(" 지번 주소가 없습니다.");
        if (isEmpty(cafeInfo.cafeRoadAddress)) return reject(" 도로명 주소가 없습니다.");
        if (isEmpty(cafeInfo.cafeSido)) return reject(" 시도 정보가 없습니다.");
        if (isEmpty(cafeInfo.cafeSiGnGu)) return reject(" 시군구 정보가 없습니다.");
        if (isEmpty(cafeInfo.cafeEMD)) return reject(" 읍면동 정보가 없습니다.");
        if (isEmpty(cafeInfo.cafeLatitude)) return reject(" 위도 정보가 없습니다.");
        if (isEmpty(cafeInfo.cafeLongitude)) return reject(" 경도 정보가 없습니다.");
        if (isEmpty(cafeInfo.categoryLists)) return reject(" 홈카테고리가 없습니다.");
        // if(isEmpty(cafeInfo.themeLists)) return reject(" 테마 정보가 없습니다.");
        // if(isEmpty(cafeInfo.serviceLists)) return reject(" 서비스 정보가 없습니다.");
        if (!isEmpty(cafeInfo?.profileImg?.location) && isEmpty(cafeInfo?.profileImg?.profileRef)) return reject("로고 사진 출처가 없습니다.");
        if (!isEmpty(cafeInfo?.profileImg?.location) && isEmpty(cafeInfo?.profileImg?.profileRefPath)) return reject("로고 사진 플랫폼 출처가 없습니다.");

        if (err) {
          console.error("[newCafes Error!]", err);
          let sendMsg = err.message;
          if (err && err.message) {
            if (JSON.stringify(err.message).includes('File too large')) sendMsg = 'size';
          }
          return reject(sendMsg);
        }

        return resolve({ cafeImages: req.files, ...cafeInfo });
      });
    });

    const cafeInfo = result;

    /* 프로필 사진 업로드 */
    if (!isEmpty(cafeInfo.profileImg?.key)) {
      // 삭제 대상 등록
      awsS3DeleteFiles.push({ key: cafeInfo.profileImg.key });
      const getS3Object = await awsS3Get(cafeInfo.profileImg.key);
      // 등록 대상 등록
      const addNewKey = cafeInfo.profileImg.key.replace('file-temp/', 'cafe/');
      awsS3UploadFiles.push({ body: getS3Object.Body, key: addNewKey });
      const addNewImgUrl = cafeInfo?.profileImg?.location.replace('file-temp/', 'cafe/');
      cafeInfo.profileImg.profile_img_url = addNewImgUrl;
    }

    /* 메뉴 사진 업로드 */
    if (!isEmpty(cafeInfo.menuCategoryList)) {
      const menuList = cafeInfo.menuCategoryList.map(v => v.menuList);
      if (!isEmpty(menuList)) {
        for (let i = 0; i < menuList.length; i++) {
          for (let j = 0; j < menuList[i].length; j++) {
            const element = menuList[i][j];
            if (!isEmpty(element.repImgInfo)) {
              // 삭제 대상 등록
              awsS3DeleteFiles.push({ key: element.repImgInfo.key });
              const getS3Object = await awsS3Get(element.repImgInfo.key);
              // 등록 대상 등록
              const addNewKey = element.repImgInfo.key.replace('file-temp/', 'menu/');
              awsS3UploadFiles.push({ body: getS3Object.Body, key: addNewKey });
              const addNewImgUrl = element.repImgInfo.location.replace('file-temp/', 'menu/');
              cafeInfo.menuCategoryList[i].menuList[j].location = addNewImgUrl;
            }
          }
        }
      }
    }

    /*  등록 */
    await CafesService.addNewCafes(cafeInfo);

    // 파일 처리
    if (!isEmpty(awsS3UploadFiles)) { // 파일 등록 {body, key}
      await Promise.all(awsS3UploadFiles.map(async item => {
        await awsS3Put(item.body, item.key);
      }));
    }

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

/* 전체  리스트 전달 */
const cafesList = errorWrapper(async (req, res, next) => {
  const { page, limit, dpYnOrder, query } = req.query;

  const data = await CafesService.getCafesList(page, limit, dpYnOrder, query);

  return res.status(200).json({
    message: "success",
    data
  });
});

/*  노출 변경 */
const cafeDisplay = errorWrapper(async (req, res, next) => {
  const { display, cafeNumber } = req.body;
  if(req.user.auth_grade !== 9 ) errorGenerator({ statusCode: 401 });
  if (isEmpty(display)) errorGenerator({ statusCode: 599 });
  if (isEmpty(cafeNumber)) errorGenerator({ statusCode: 599, message: "정보가 없습니다." });

  const data = await CafesService.changeDisplay(display, cafeNumber);

  return res.status(200).json({
    message: "success"
  });
});

/*  삭제 */
const cafeDelete = errorWrapper(async (req, res, next) => {
  const { cafeNumber } = req.params;
  if(req.user.auth_grade !== 9 ) errorGenerator({ statusCode: 401 });
  if (isEmpty(cafeNumber)) errorGenerator({ statusCode: 599, message: "정보가 없습니다." });

  const data = await CafesService.removeCafe(cafeNumber);

  return res.status(200).json({
    message: "success"
  });
});

/*  수정 */
const cafeEdit = errorWrapper(async (req, res, next) => {
  const { cafeNumber } = req.params;
  if (isEmpty(cafeNumber)) errorGenerator({ statusCode: 599, message: "정보가 없습니다." });
  let uploadFiles = [];
  let awsS3DeleteFiles = []; // 삭제 대상 파일 'key'
  let awsS3UploadFiles = []; // 등록 대상 파일 {body, key}

  try {
    const result = await new Promise(function (resolve, reject) {
      const today = moment().format("YYYY-MM-DD");
      const savePath = 'test/' + today + '/';
      const imageSize = 5000 * 1024 * 1024;
      var imageUpload = awsS3Upload(imageSize, savePath).array('image');

      return imageUpload(req, res, (err) => {
        const { cafeValue, imageLists } = req.body;
        const cafeInfo = JSON.parse(cafeValue);
        const imageValues = JSON.parse(imageLists);
        uploadFiles = req.files;

        /* 서버 필수 값 체크 */
        if (isEmpty(cafeInfo)) return reject("정보가 없습니다.");
        if (isEmpty(cafeInfo.cafeTitle)) return reject("명이 없습니다.");
        // if(isEmpty(cafeInfo.cafeTel)) return reject("전화번호가 없습니다.");
        // if(isEmpty(cafeInfo.cafeIntro)) return reject("한줄소개가 없습니다.");
        // if(isEmpty(cafeInfo.cafeContents)) return reject("소개가 없습니다.");
        if (isEmpty(cafeInfo.cafeOldAddress)) return reject(" 지번 주소가 없습니다.");
        if (isEmpty(cafeInfo.cafeRoadAddress)) return reject(" 도로명 주소가 없습니다.");
        if (isEmpty(cafeInfo.cafeSido)) return reject(" 시도 정보가 없습니다.");
        if (isEmpty(cafeInfo.cafeSiGnGu)) return reject(" 시군구 정보가 없습니다.");
        if (isEmpty(cafeInfo.cafeEMD)) return reject(" 읍면동 정보가 없습니다.");
        if (isEmpty(cafeInfo.cafeLatitude)) return reject(" 위도 정보가 없습니다.");
        if (isEmpty(cafeInfo.cafeLongitude)) return reject(" 경도 정보가 없습니다.");
        if (isEmpty(cafeInfo.categoryLists)) return reject(" 홈카테고리가 없습니다.");
        // if(isEmpty(cafeInfo.themeLists)) return reject(" 테마 정보가 없습니다.");
        // if(isEmpty(cafeInfo.serviceLists)) return reject(" 서비스 정보가 없습니다.");
        if (!isEmpty(cafeInfo?.profileImg?.location) && isEmpty(cafeInfo?.profileImg?.profileRef)) return reject("로고 사진 출처가 없습니다.");
        if (!isEmpty(cafeInfo?.profileImg?.location) && isEmpty(cafeInfo?.profileImg?.profileRefPath)) return reject("로고 사진 플랫폼 출처가 없습니다.");

        if (err) {
          console.error("[newCafes Error!]", err);
          let sendMsg = err.message;
          if (err && err.message) {
            if (JSON.stringify(err.message).includes('File too large')) sendMsg = 'size';
          }
          return reject(sendMsg);
        }

        return resolve({ cafeNumber: cafeNumber, cafeImages: req.files, imageValues: imageValues, ...cafeInfo });
      });
    });

    const cafeEditInfo = result;
    const menuGroupList = result.menuGroupList;
  
    const preCafeInfo = await db.Cafe.findOne({where: {cafe_number: cafeNumber}});

    /* 프로필 사진 업로드 */
    // 프로필 사진 변경시 type = 'change' 로 전달
    if (!isEmpty(cafeEditInfo.profileImg) && cafeEditInfo.profileImg.type === 'change') {

      // 삭제 대상 등록
      if (!isEmpty(preCafeInfo.dataValues.profileImgUrl)) awsS3DeleteFiles.push({ key: awsGetKey(preCafeInfo.dataValues.profileImgUrl)}); // 기존 이미지 삭제
      awsS3DeleteFiles.push({ key: cafeEditInfo.profileImg.key });
      const getS3Object = await awsS3Get(cafeEditInfo.profileImg.key);
      // 등록 대상 등록
      const addNewKey = cafeEditInfo.profileImg.key.replace('file-temp/', 'cafe/');
      awsS3UploadFiles.push({ body: getS3Object.Body, key: addNewKey });
      const addNewImgUrl = cafeEditInfo?.profileImg?.location.replace('file-temp/', 'cafe/');
      cafeEditInfo.profileImg.location = addNewImgUrl;
    }
    // 로고 삭제만 할 경우 파일 삭제
    else if (!isEmpty(cafeEditInfo.profileImg) && cafeEditInfo.profileImg.type === 'delete') {
      awsS3DeleteFiles.push({ key: awsGetKey(preCafeInfo.dataValues.profileImgUrl)});
    }

    /* 메뉴 사진 업로드 */
    if (!isEmpty(menuGroupList)) {
      const menuList = menuGroupList.map(v => v.menuList);
      if (!isEmpty(menuList)) {
        for (let i = 0; i < menuList.length; i++) {
          for (let j = 0; j < menuList[i].length; j++) {
            const element = menuList[i][j];
            if (!isEmpty(element.repImgInfo)) {
              // 삭제 대상 등록
              awsS3DeleteFiles.push({ key: element.repImgInfo.key });
              const getS3Object = await awsS3Get(element.repImgInfo.key);
              // 등록 대상 등록
              const addNewKey = element.repImgInfo.key.replace('file-temp/', 'menu/');
              awsS3UploadFiles.push({ body: getS3Object.Body, key: addNewKey });
              const addNewImgUrl = element.repImgInfo.location.replace('file-temp/', 'menu/');
              menuGroupList[i].menuList[j].image_url = addNewImgUrl;
            }
          }
        }
      }
    }

    /*  수정 */
    await CafesService.editCafeInfo(cafeEditInfo, preCafeInfo, awsS3DeleteFiles);

    // 파일 처리
    if (!isEmpty(awsS3UploadFiles)) { // 파일 등록 {body, key}
      await Promise.all(awsS3UploadFiles.map(async item => {
        await awsS3Put(item.body, item.key);
      }));
    }


    return res.status(200).json({
      message: "success"
    });

  } catch (error) {
    console.error(error);
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
  newCafes,
  cafesList,
  cafeDisplay,
  cafeDelete,
  cafesInfo,
  cafeEdit,
  cafesSimpleInfo,
}