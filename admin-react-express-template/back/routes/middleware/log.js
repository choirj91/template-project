const db = require('../../models');
const { isEmpty } = require('../../utills/stringUtil');

exports.activeMobileUserLogs = async (req, res, next) => {
    try {
        const { device_id, platform, version, app_version } = req.headers;
        const { user, user_number } = req.body;
        let userId = user_number;
        let reqBody = JSON.stringify(req.body);
        let reqHeader = JSON.stringify(req.headers);
        let originalUrl = JSON.stringify(req.originalUrl);
        let deviceInfo = {
            platform: platform,
            version: version,
            app_version: app_version,
            device_id: device_id,
        };
        // Decrypt
        if (!isEmpty(user)) {
            // 보안 이슈
            delete req.body.user.user_pwd;
        }
        await db.LogMobileActivity.create({
            user_number: userId,
            parameter: reqBody,
            headers: reqHeader,
            originalUrl: originalUrl,
            deviceInfo: deviceInfo,
        });
        next();
    } catch (error) {
        console.error('[activeMobileUserLogs Error]', error)
        next();
    }
};