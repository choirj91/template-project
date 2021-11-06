const { isEmpty } = require('./stringUtil');

// 두 좌표간 위치 구하기
exports.getDistanceFromLatLonInKm = (lat1, lng1, lat2, lng2) => {
    const deg2rad = (deg) => {
        return deg * (Math.PI / 180);
    }

    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = deg2rad(lng2 - lng1);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
}

// 거리 단위 변환
exports.distanceTransformation = (distance) => {
    if (!isEmpty(distance) && distance !== 0) {
        if (distance >= 1) return distance.toFixed(1) + 'km';
        else return Math.round(distance * 1000) + 'm';
    }
    else return 0 + 'm';
}