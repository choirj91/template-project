const AWS = require('aws-sdk');
const Sharp = require('sharp');

const S3 = new AWS.S3({ region: 'ap-northeast-2' });

exports.handler = async (event, context, callback) => {
  console.log('-------------------- Start ----------------------------');
  const Bucket = event.Records[0].s3.bucket.name;
  const Key = event.Records[0].s3.object.key;
  const filename = Key.split('/')[Key.split('/').length - 1];
  const ext = Key.split('.')[Key.split('.').length - 1].toLowerCase();
  console.log('Key =' + Key, 'filename = ', filename, 'ext = ', ext);
  const requiredFormat = ext === 'jpg' ? 'jpeg' : ext; // sharp에서는 jpg 대신 jpeg사용
  try {
    if(ext === 'gif' || ext === 'GIF') {
      /* `GLIBC_2.29' not found 오류로 EC2 처리로 변경 */
      return callback(null, 'The End! This is Gif File!');
    }

    /* 이미지 가져오기 */
    console.log('---------------------------------------- Get Image');
    const s3Object = await S3.getObject({
      Bucket,
      Key,
    }).promise();

    console.log('---------------------------------------- Resize Image');

    /* 사진 줄이기 */
    const resizedImage = await Sharp(s3Object.Body)
      .resize(150, 150, {
        fit: 'inside',
      })
      .toFormat(requiredFormat)
      .toBuffer();

    console.log('---------------------------------------- Put S3');
    /* S3 저장 */
    await S3.putObject({
      Body: resizedImage,
      Bucket,
      Key: Key.replace('profile/', 'profile-thumb/'),
    }).promise();

    console.log('-------------------- End ----------------------------');
    return callback(null, Key.replace('profile/', 'profile-thumb/'));
  } catch (error) {
    console.error(error);
    return callback(error);
  }
};
