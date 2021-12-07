/* 존재여부 체크 */
exports.isEmpty = (value) => {
	if (value === null) return true
	if (typeof value === 'undefined') return true
	if (typeof value === 'string' && value.trim() === '') return true
	if (Array.isArray(value) && value.length < 1) return true
	if (typeof value === 'object' && value.constructor.name === 'Object' && Object.keys(value).length < 1 && Object.getOwnPropertyNames(value) < 1) return true
	if (typeof value === 'object' && value.constructor.name === 'String' && Object.keys(value).length < 1) return true // new String()
	return false;
}

/* 공백으로 리턴 아니면 그대로 사용 */
exports.isEmptyReplace = (value) => {
	if (value === null) return '';
	if (typeof value === 'undefined') return '';
	if (typeof value === 'string' && value.trim() === '') return '';
	if (Array.isArray(value) && value.length < 1) return '';
	if (typeof value === 'object' && value.constructor.name === 'Object' && Object.keys(value).length < 1 && Object.getOwnPropertyNames(value) < 1) return '';
	if (typeof value === 'object' && value.constructor.name === 'String' && Object.keys(value).length < 1) return ''; // new String()
	return value;
}

/* html 특수문자 치환 */
exports.replaceSpecialChar = (value) => {

	// 특수문자
	const regExp = /[!?@#$%^&*():;+-=~{}<>\_\[\]\|\\\"\'\,\.\/\`\₩]/g;

	// 변환 - 이스케이프 사용
	let newValue = '';
	if(!this.isEmpty(value)){
		for (let i = 0; i < value.length; i++) {
			// test 버그 (?) 연달아 2개 오는 특수문자 체크 오류 (ex: $$ 로 들어오면 $만 판별)
			// 두번 체크 할 경우 오류 해결
			if(/[//]/gi.test(value[i])) {
				newValue += "!/";
			}
			else if(/[/\\]/gi.test(value[i])) {
				newValue += "\\\\";
			}
			else if(/[/"]/gi.test(value[i])) {
				newValue += "\"";
			}
			else if(/[/']/gi.test(value[i])) {
				newValue += "!''";
			}
			else if(regExp.test(value[i])) {
				newValue += "!" + value[i];
			}
			else if(regExp.test(value[i])) {
				newValue += "!" + value[i];
			}
			else newValue += value[i];
		}
	}

	return newValue;
}