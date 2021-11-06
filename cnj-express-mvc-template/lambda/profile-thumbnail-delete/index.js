const AWS = require('aws-sdk');

const S3 = new AWS.S3({ region: 'ap-northeast-2' });

exports.handler = async (event, context, callback) => {
  const Bucket = event.Records[0].s3.bucket.name;
  const Key = event.Records[0].s3.object.key.replace('profile/', 'profile-thumb/');
  const filename = Key.split('/')[Key.split('/').length - 1];
  const ext = Key.split('.')[Key.split('.').length - 1];
  console.log(Key, filename, ext);
  try {

    /// delete
    const s3Delete = await S3.deleteObject({
        Bucket,
        Key,
    }).promise();
    
    console.log('put');
    return callback(null, `profile-thumbnail-delete Success!`);
  } catch (error) {
    console.error(error);
    return callback(error);
  }
};
