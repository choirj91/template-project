const { isEmpty } = require('./stringUtil');

/* 전화번호 형식 */
exports.addHyphenNum = (type = null, num) => {
    let result;
    if (type === "regnum") {
        // * 사업자 등록번호에 하이픈 추가
        result = num.substr(0, 3) + "-" + num.substr(3, 2) + "-" + num.substr(5);
        return result;
    } else if (type === "tel") {
        // * 숫자만 있을 경우 하이픈 추가 로직
        if (num.substr(0, 2) === "02") {
            // * 02(서울) 일 경우 나머지 숫자가 7자리 이면, 8자리 이면으로 로직 설정.
            if (num.substr(2).length === 7) {
                // *ex)023322346 ==> 02-332-2346
                result = num.substr(0, 2) + "-" + num.substr(2, 3) + "-" + num.substr(5);
            } else if (num.substr(2).length === 8) {
                // * ex) 0260200594 ==> 02-6020-0594
                result = num.substr(0, 2) + "-" + num.substr(2, 4) + "-" + num.substr(6);
            }
            return result;
        } else {
            // * 서울 이외 지역
            if (num.substr(3).length === 7) {
                // * ex) 0317329932 ==> 031-732-9923
                result = num.substr(0, 3) + "-" + num.substr(3, 3) + "-" + num.substr(6);
            } else {
                // * ex) 03112345678 ==> 031-1234-5678
                // * ex) 050712345678 ==> 050-7123-45678 (인터넷 전화같은 예외 케이스일 경우)
                result = num.substr(0, 3) + "-" + num.substr(3, 4) + "-" + num.substr(7);
            }
            return result;
        }
    }
};

/* 숫자 간략화 */
exports.convertCnt = (cnt) => {
    if (isEmpty(cnt)) return 0;
    else {
        const count = parseInt(cnt);
        let dpCnt = null;
        if (count >= 10000) dpCnt = (count / 10000).toFixed(0) + "만+";
        // else if(count >= 1000) dpCnt =(count/1000).toFixed(0) + "천+";
        else dpCnt = this.numberWithCommas(count);

        return dpCnt;
    }
}

/* 3자릿수 마다 콤마 1,123,222,000 */
exports.numberWithCommas = (x) => {
    if(typeof x === 'number') return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    else return '???';
}