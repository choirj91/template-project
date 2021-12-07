const multer = require('multer');
const path = require('path');
const { errorGenerator } = require('../utills/errors');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');
const moment = require('moment');
const randomstring = require('randomstring');
const { isEmpty } = require('./stringUtil');
const s3ImageBucket = process.env.NODE_ENV === 'production' ? process.env.S3_IMAGE_BUCKET : process.env.S3_IMAGE_DEV_BUCKET;

moment.locale('ko');

/****************************
********AWS 파일 관리 ********
****************************/
AWS.config.update({
    region: 'ap-northeast-2',
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
});

const S3 = new AWS.S3();

// 이미지 파일만 받기
const fileFilter = (req, file, cb) => {
    let typeArray = file.mimetype.split('/');
    // let fileType = typeArray[1];
    // if (fileType == 'jpg' || fileType == 'png' || fileType == 'jpeg' || fileType == 'gif') {
    let fileType = typeArray[0];
    if (fileType === 'image') {
        cb(null, true);
    } else {
        cb('이미지 파일이 아닙니다.', false)
    }
}

/* 파일명에서 출처(아이디) 추출 -  cafe+테스트아이디+인스타그램+1.jpg   */
exports.getFileRef = (fileName) => {
    if(!isEmpty(fileName)) {
        const splitWord = '+';
        if(fileName.includes(splitWord)) {
            const fileNameArr = fileName.split(splitWord);
            const fileRef = fileNameArr[1];
            return fileRef;
        }
        else return null;
    }
    else return null;
}

/* 파일명에서 출처 플랫폼 추출 -  cafe+테스트아이디+인스타그램+1.jpg */
exports.getFileRefPath = (fileName) => {
    if(!isEmpty(fileName)) {
        const splitWord = '+';
        if(fileName.includes(splitWord)) {
            const fileNameArr = fileName.split(splitWord);
            const fileRefPath = fileNameArr[2];
            return fileRefPath;
        }
        else return null;
    }
    else return null;
}

/* 파일 확장자 추출 */
exports.getFileExt = (fileName) => {
    if(!isEmpty(fileName)) return fileName.split('.')[fileName.split('.').length - 1].toLowerCase();
    else return null;
}

/* 키 추출 */
exports.awsGetKey = (location) => {
    if(!isEmpty(location)) return location.split('https://cnj-admin-template.s3.ap-northeast-2.amazonaws.com/')[1];
    else location;
}

/* 파일 업로드 */
exports.awsS3Upload = (fileSize, savePath) => multer({
    storage: multerS3({
        s3: new AWS.S3(),
        bucket: s3ImageBucket,
        key(req, file, cb) {
            const ext = path.extname(file.originalname); // 확장자 추출
            const randomStr = randomstring.generate(5);
            const dateFileName = moment().format("YYYY-MM-DD_HHmmssSSSSS");
            cb(null, savePath + dateFileName + randomStr + ext);
        }
    }),
    fileFilter: fileFilter,
    limits: { fileSize: fileSize }, // 서버 용량 제한
});

/* 파일 가져오기 */
exports.awsS3Get = async (key) => {
    try {
        return await S3.getObject({
            Bucket: s3ImageBucket,
            Key: key,
        }).promise();
    } catch (error) {
        console.error('[awsS3Get Error]', error);
        errorGenerator({ statusCode: 500 });
    }
}

/* 파일 저장하기 */
exports.awsS3Put = async (body, key) => {
    return await S3.putObject({
        Body: body,
        Bucket: s3ImageBucket,
        Key: key
    }).promise();
}

/* 파일 삭제하기 */
exports.awsS3Delete = async (key) => {
        return await S3.deleteObject({
            Bucket: s3ImageBucket,
            Key: key,
        }).promise();
}

function downloadImage(params, destPath) {
    return new Promise((resolve, reject) => {
        const s3Stream = S3.getObject(params).createReadStream();
        const fileStream = fs.createWriteStream(destPath);
        s3Stream.on('error', reject);
        fileStream.on('error', reject);
        fileStream.on('close', () => { resolve(destPath); });
        s3Stream.pipe(fileStream);
    });
}

/* gif 썸네일 생성 */
exports.makeGifThumbAndS3Put = async (key, target, targetSize = 500, sizeInfo) => {

    // console.log('---------------------------------------- Start');
    const Bucket = s3ImageBucket;
    const Key = key;
    const filename = key.split('/')[key.split('/').length - 1]; // 파일명
    const ext = path.extname(filename).toLowerCase();  // 확장자
    const basename = path.basename(filename, ext); // 파일명만 추출
    const inputFile = 'tmp/' + filename;
    const outputFile = 'tmp/' + filename.replace(basename, basename + '-thumb');
    // console.log('key =' + key, 'filename = ', filename, 'ext = ', ext, 'basename = ', basename);
    // console.log('inputFile =', inputFile, 'outputFile = ', outputFile);

    /* 이미지 가져오기 */
    // console.log('---------------------------------------- Get Image');
    await downloadImage({ Bucket, Key }, inputFile);

    /* 데이타 셋팅 */
    const imageFile = sharp(inputFile);
    const imageMeta = await imageFile.metadata();
    const imgHeight = imageMeta.height; // 이미지 세로
    const imgWidth = imageMeta.width; // 이미지 가로

    /* 사이즈 설정 */
    let imageSize = targetSize;
    if(!empty(sizeInfo) && !empty(sizeInfo.heightSize) && !empty(sizeInfo.widthSize)) {
        if(sizeInfo.heightSize >= sizeInfo.widthSize) {
            imageSize = targetSize * sizeInfo.heightSize;
        }
        else {
            imageSize = targetSize * sizeInfo.widthSize;
        }
    }

    /* 사이즈 기준 설정 */
    let resizeFit = null;
    if (imgHeight >= imgWidth) resizeFit = '--resize-fit-width'; // 이미지 세로가 더 클때
    else resizeFit = '--resize-fit-height'; // 이미지 가로가 더 클때

    // console.log('---------------------------------------- Resize Image');
    /* 사진 줄이기 Start*/
    // 1. tmp 파일 생성
    try {
        await execFileSync(gifsicle, [resizeFit, imageSize, '-o', outputFile, inputFile]);
        const stream = fs.createReadStream(outputFile);
        // console.log('---------------------------------------- Put S3');
        await S3.putObject({
            Body: stream,
            Bucket: Bucket,
            Key: Key.replace('tmp/', target)
        }).promise();
    } catch (error) {
        console.error('[makeGifThumbAndS3Put Error!]', error);
        errorGenerator({ statusCode: 500 });
    }

    console.log('---------------------------------------- Remove Image');
    /* 사진 삭제 */
    await fs.unlink(inputFile, err => {
        if (err) console.error('File Delete Error01!!- ', inputFile, err);
    });
    await fs.unlink(outputFile, err => {
        if (err) console.error('File Delete Error02!!- ', outputFile, err);
    });
    console.log('---------------------------------------- End');

    return {bucket: Bucket, key: Key.replace('tmp/', target)};
}

/* gif 이외 썸네일 생성 */
exports.makeThumbAndS3Put = async (s3Object, key, target, targetSize = 500, sizeInfo) => {
    
    console.log('---------------------------------------- Start');
    const Bucket = s3ImageBucket;
    console.log('s3Object', s3Object);
    const Key = key;
    const filename = Key.split('/')[Key.split('/').length - 1]; // 파일명
    const ext = Key.split('.')[Key.split('.').length - 1].toLowerCase(); // 확장자
    const basename = path.basename(filename, ext); // 파일명만 추출
    const requiredFormat = ext === 'jpg' ? 'jpeg' : ext; // sharp에서는 jpg 대신 jpeg사용
    console.log('Key =' + Key, 'filename = ', filename, 'ext = ', ext, 'basename = ', basename);

    /* 데이타 셋팅 */
    const imageFile = sharp(s3Object.Body);
    const imageMeta = await imageFile.metadata();
    const imgHeight = imageMeta.height; // 이미지 세로
    const imgWidth = imageMeta.width; // 이미지 가로

    /* 사이즈 설정 */
    let imageSize = targetSize;
    if(!empty(sizeInfo) && !empty(sizeInfo.heightSize) && !empty(sizeInfo.widthSize)) {
        if(sizeInfo.heightSize >= sizeInfo.widthSize) {
            imageSize = targetSize * sizeInfo.heightSize;
        }
        else {
            imageSize = targetSize * sizeInfo.widthSize;
        }
    }

    /* 사이즈 기준 설정 */
    let resizeFit = null;
    if (imgHeight >= imgWidth) resizeFit = {width: imageSize}; // 이미지 세로가 더 클때
    else resizeFit = {height: imageSize}; // 이미지 가로가 더 클때

    /* 사진 줄이기 */
    try {
        const sharpResult = await sharp(s3Object.Body).resize(resizeFit).toFormat(requiredFormat).toBuffer();
        await S3.putObject({
            Body: sharpResult,
            Bucket,
            Key: Key.replace('tmp/', target),
        }).promise();
    } catch (error) {
        console.error('[makeThumbAndS3Put Error!]', error);
        errorGenerator({ statusCode: 500 });
    }
    return {bucket: Bucket, key: Key.replace('tmp/', target)};
}
