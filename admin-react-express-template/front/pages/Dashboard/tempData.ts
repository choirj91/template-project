import moment from "moment";

const randomCount = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}

const getDaysSttistics = () => {
    const totalCnt = (parseInt(moment().format('DD')) * 2) + 2;
    let arr = Array.from({length: totalCnt}, (v, index) => {
        return {
            days: moment().format('YYYYMM') + index.toString(),
            user_cnt: randomCount(500, 1000),
            d_date: Math.floor(index/2),
            type: index % 2 === 0 ? 'this' : 'last'
        } 
    });
    console.log('arr', arr);



    return arr;
}

export const data = {
    data: {
        budgetStatistics: {
            total_user_count: 66900,
            naver_user_count: 22200,
            google_user_count: 6300,
            kakao_user_count: 34200,
            apple_user_count: 4220,
            this_month_new_count: 5751,
            total_cafe_count: 125411,
            total_menu_count: 5145124,
            today_user_count: 33100,
            today_visit_count: 2100
        },
        daysStatistics: getDaysSttistics(),
        cafeLists: [
            {
                "cafe_number": 833,
                "cafe_title": "임시데이터",
                "cafe_address": "임시",
                "cafe_road_address": "임시",
                "address_sido": "asdf",
                "address_signgu": "asdf",
                "address_emd": "asdf",
                "profile_img_name": null,
                "profile_img_url": null,
                "dp_yn": 0,
                "created_at": "2021-10-27T09:50:54.000Z"
            },
            {
                "cafe_number": 832,
                "cafe_title": "임시데이터",
                "cafe_address": "임시",
                "cafe_road_address": "임시",
                "address_sido": "asd",
                "address_signgu": "asd",
                "address_emd": "asd",
                "profile_img_name": null,
                "profile_img_url": null,
                "dp_yn": 0,
                "created_at": "2021-10-27T08:40:01.000Z"
            },
            {
                "cafe_number": 831,
                "cafe_title": "임시데이터",
                "cafe_address": "임시",
                "cafe_road_address": "임시",
                "address_sido": "ㅁㄴㅇㄹ",
                "address_signgu": "ㅁㄴㅇㄹ",
                "address_emd": "ㅁㄴㅇㄹ",
                "profile_img_name": null,
                "profile_img_url": null,
                "dp_yn": 0,
                "created_at": "2021-10-22T01:18:26.000Z"
            },
            {
                "cafe_number": 821,
                "cafe_title": "임시데이터",
                "cafe_address": "임시",
                "cafe_road_address": "임시",
                "address_sido": "변경",
                "address_signgu": "변경",
                "address_emd": "변경",
                "profile_img_name": null,
                "profile_img_url": null,
                "dp_yn": 0,
                "created_at": "2021-10-18T04:18:45.000Z"
            },
            {
                "cafe_number": 822,
                "cafe_title": "임시데이터",
                "cafe_address": "임시",
                "cafe_road_address": "임시",
                "address_sido": "asdf",
                "address_signgu": "asdf",
                "address_emd": "asdf",
                "profile_img_name": null,
                "profile_img_url": null,
                "dp_yn": 1,
                "created_at": "2021-10-20T04:33:11.000Z"
            },
            {
                "cafe_number": 798,
                "cafe_title": "임시데이터",
                "cafe_address": "임시",
                "cafe_road_address": "임시",
                "address_sido": "서울",
                "address_signgu": "강남구",
                "address_emd": "역삼동",
                "profile_img_name": null,
                "profile_img_url": "https://macciatto-dev.s3.ap-northeast-2.amazonaws.com/cafe/2021-10-18/2021-10-18_13420270400HQUO9.jpg",
                "dp_yn": 1,
                "created_at": "2021-10-06T04:53:42.000Z"
            },
            {
                "cafe_number": 411,
                "cafe_title": "임시데이터",
                "cafe_address": "임시",
                "cafe_road_address": "임시",
                "address_sido": "서울",
                "address_signgu": "강남구",
                "address_emd": "역삼동",
                "profile_img_name": null,
                "profile_img_url": "https://macciatto.s3.ap-northeast-2.amazonaws.com/cafe/2021-09-06/beansple/logo.jpg",
                "dp_yn": 1,
                "created_at": "2021-09-07T21:20:37.000Z"
            },
            {
                "cafe_number": 417,
                "cafe_title": "임시데이터",
                "cafe_address": "임시",
                "cafe_road_address": "임시",
                "address_sido": "서울",
                "address_signgu": "관악구",
                "address_emd": "봉천동",
                "profile_img_name": null,
                "profile_img_url": "https://macciatto.s3.ap-northeast-2.amazonaws.com/cafe/2021-09-06/koyoseoul/logo.jpg",
                "dp_yn": 1,
                "created_at": "2021-09-07T21:20:37.000Z"
            },
            {
                "cafe_number": 412,
                "cafe_title": "임시데이터",
                "cafe_address": "임시",
                "cafe_road_address": "임시",
                "address_sido": "서울",
                "address_signgu": "강남구",
                "address_emd": "신사동",
                "profile_img_name": null,
                "profile_img_url": "https://macciatto.s3.ap-northeast-2.amazonaws.com/cafe/2021-09-06/parnell__official/logo.jpg",
                "dp_yn": 1,
                "created_at": "2021-09-07T21:20:37.000Z"
            },
            {
                "cafe_number": 416,
                "cafe_title": "임시데이터",
                "cafe_address": "임시",
                "cafe_road_address": "임시",
                "address_sido": "서울",
                "address_signgu": "강서구",
                "address_emd": "화곡동",
                "profile_img_name": "logo.jpg",
                "profile_img_url": "https://macciatto.s3.ap-northeast-2.amazonaws.com/cafe/2021-09-06/nutsbyjd2/logo.jpg",
                "dp_yn": 1,
                "created_at": "2021-09-07T21:20:37.000Z"
            }
        ]
    }
}