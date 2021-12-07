const { isEmpty } = require('../utills/stringUtil');


/* 필터 분리 하나로 통합*/
exports.filterSplit = ( filterArr, type ) => {
    const filterList = [];
    if(isEmpty(filterArr) || isEmpty(type)) return [];
    else {
        if(type === 'menu') {
            filterArr.forEach(v => {
                if (v.substr(0, 2) !== 'SV' && v.substr(0, 2) !== 'TH' && v !== 'PARKING' && v !== 'PET') filterList.push(v);
            });
        }
        else if (type === 'thema') {
            filterArr.forEach(v => {
                if (v.substr(0, 2) === 'TH') filterList.push(v);
            });
        }
        else if (type === 'service') {
            filterArr.forEach(v => {
                if (v.substr(0, 2) === 'SV') filterList.push(v);
                // IOS에서 요청
                // SV02 - PARKING
                // SV04 - PET
                else if (v === 'PARKING') filterList.push('SV02');
                else if (v === 'PET') filterList.push('SV04');
            });
        }
        return filterList;
    }
}