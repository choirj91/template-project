/* 존재여부 체크 */
const isEmpty = (value: any | any[]) => {
	if (value === null) return true
	if (typeof value === 'undefined') return true
	if (typeof value === 'string' && value.trim() === '') return true
	if (Array.isArray(value) && value.length < 1) return true
	// if (typeof value === 'object' && value.constructor.name === 'Object' && Object.keys(value).length < 1 && Object.getOwnPropertyNames(value) < 1) return true
	if (typeof value === 'object' && value.constructor.name === 'Object' && Object.keys(value).length < 1 ) return true
	if (typeof value === 'object' && value.constructor.name === 'String' && Object.keys(value).length < 1) return true // new String()
	return false;
}

// 3자릿수 마다 콤마 1,123,222,000
const numberWithCommas = (x: number) => {
    if(typeof x === 'number') return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    else return '???';
}


export {
    isEmpty,
	numberWithCommas
}