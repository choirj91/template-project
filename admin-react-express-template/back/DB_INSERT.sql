-- search_filter_group ***********************************************************

INSERT INTO search_filter_group (group_code,group_title,group_type,order_rank,dp_yn,remarks) VALUES
	 ('BRUNCH','브런치','category',4,1,'카테고리 그룹'),
	 ('CLASS','원데이 클래스','category',7,1,'카테고리 그룹'),
	 ('DESSERT','디저트','category',2,1,'카테고리 그룹'),
	 ('ETC','기타','category',8,0,'카테고리 그룹'),
	 ('FRUITVEGET','과일/야채','category',6,1,'카테고리 그룹'),
	 ('PREMIUM','프리미엄','category',1,1,'카테고리 그룹'),
	 ('SG01','서비스','service',11,1,'카페 서비스'),
	 ('TEA','차/밀크티','category',5,1,'카테고리 그룹'),
	 ('TG01','테마','thema',10,1,'카페 테마'),
	 ('VEGANKETO','비건/키토','category',3,1,'카테고리 그룹');


-- search_filter ***********************************************************

INSERT INTO search_filter (code,code_title,recomm_filter_yn,recomm_menu_yn,dp_yn,remarks,group_code) VALUES
	 ('BR001','감바스',0,0,0,NULL,'BRUNCH'),
	 ('BR002','고르곤졸라',0,0,0,NULL,'BRUNCH'),
	 ('BR003','그릭요거트',1,0,0,NULL,'BRUNCH'),
	 ('BR004','라이스',0,0,1,NULL,'BRUNCH'),
	 ('BR005','라자냐',0,0,0,NULL,'BRUNCH'),
	 ('BR006','로제파스타',0,0,0,NULL,'BRUNCH'),
	 ('BR007','리조또',0,0,0,NULL,'BRUNCH'),
	 ('BR008','리코타샐러드',0,0,0,NULL,'BRUNCH'),
	 ('BR009','버거',0,0,0,NULL,'BRUNCH'),
	 ('BR010','베이글',0,0,1,NULL,'BRUNCH');
INSERT INTO search_filter (code,code_title,recomm_filter_yn,recomm_menu_yn,dp_yn,remarks,group_code) VALUES
	 ('BR011','샌드위치',0,0,1,NULL,'BRUNCH'),
	 ('BR012','샐러드',0,0,1,NULL,'BRUNCH'),
	 ('BR013','수플레',1,0,0,NULL,'BRUNCH'),
	 ('BR014','스무디볼',0,0,0,NULL,'BRUNCH'),
	 ('BR015','스테이크',0,0,0,NULL,'BRUNCH'),
	 ('BR016','스파게티',0,0,0,NULL,'BRUNCH'),
	 ('BR017','스프',0,0,0,NULL,'BRUNCH'),
	 ('BR018','오일파스타',0,0,0,NULL,'BRUNCH'),
	 ('BR019','요거트',0,0,1,NULL,'BRUNCH'),
	 ('BR020','요거트볼',0,0,0,NULL,'BRUNCH');
INSERT INTO search_filter (code,code_title,recomm_filter_yn,recomm_menu_yn,dp_yn,remarks,group_code) VALUES
	 ('BR021','잠봉뵈르샌드위치',0,0,0,NULL,'BRUNCH'),
	 ('BR022','치킨샐러드',0,0,0,NULL,'BRUNCH'),
	 ('BR023','카야토스트',0,0,0,NULL,'BRUNCH'),
	 ('BR024','카프레제',0,0,0,NULL,'BRUNCH'),
	 ('BR025','크로크무슈',0,0,0,NULL,'BRUNCH'),
	 ('BR026','크루아상샌드위치',0,0,0,NULL,'BRUNCH'),
	 ('BR027','크림스프',0,0,0,NULL,'BRUNCH'),
	 ('BR028','크림파스타',0,0,0,NULL,'BRUNCH'),
	 ('BR029','토마토파스타',0,0,0,NULL,'BRUNCH'),
	 ('BR030','토스트',0,0,1,NULL,'BRUNCH');
INSERT INTO search_filter (code,code_title,recomm_filter_yn,recomm_menu_yn,dp_yn,remarks,group_code) VALUES
	 ('BR031','파니니',0,0,0,NULL,'BRUNCH'),
	 ('BR032','파스타',0,0,1,NULL,'BRUNCH'),
	 ('BR033','팬케이크',0,0,1,NULL,'BRUNCH'),
	 ('BR034','프렌치토스트',1,0,0,NULL,'BRUNCH'),
	 ('BR035','플레이트',0,0,0,NULL,'BRUNCH'),
	 ('BR036','피자',0,0,1,NULL,'BRUNCH'),
	 ('BR037','핫도그',0,0,0,NULL,'BRUNCH'),
	 ('BR038','햄치즈토스트',0,0,0,NULL,'BRUNCH'),
	 ('BR039','연어샐러드',0,0,0,'2021-09-03 필터 추가','BRUNCH'),
	 ('BR040','부라타치즈',0,0,0,'2021-09-03 필터 추가','BRUNCH');
INSERT INTO search_filter (code,code_title,recomm_filter_yn,recomm_menu_yn,dp_yn,remarks,group_code) VALUES
	 ('BR041','에그베네딕트',0,0,0,'2021-09-03 필터 추가','BRUNCH'),
	 ('BR042','오믈렛',0,0,0,'2021-09-03 필터 추가','BRUNCH'),
	 ('BR043','바질파스타',0,0,0,'2021-09-03 필터 추가','BRUNCH'),
	 ('BR044','맥앤치즈',0,0,0,'2021-09-03 필터 추가','BRUNCH'),
	 ('BR045','퀘사디아',0,0,0,'2021-09-03 필터 추가','BRUNCH'),
	 ('BR046','그래놀라',0,0,0,'2021-09-03 필터 추가','BRUNCH'),
	 ('BR047','시리얼',0,0,0,'2021-09-03 필터 추가','BRUNCH'),
	 ('BR048','감자튀김',0,0,0,'2021-09-03 필터 추가','BRUNCH'),
	 ('DE001','갈레트',0,0,0,NULL,'DESSERT'),
	 ('DE002','갸또',0,0,0,NULL,'DESSERT');
INSERT INTO search_filter (code,code_title,recomm_filter_yn,recomm_menu_yn,dp_yn,remarks,group_code) VALUES
	 ('DE003','과일빙수',0,0,0,NULL,'DESSERT'),
	 ('DE004','과일타르트',0,0,0,NULL,'DESSERT'),
	 ('DE005','구움과자',0,0,1,NULL,'DESSERT'),
	 ('DE006','까눌레',0,1,0,NULL,'DESSERT'),
	 ('DE007','꼬끄',0,0,0,NULL,'DESSERT'),
	 ('DE008','다쿠아즈',0,1,0,NULL,'DESSERT'),
	 ('DE009','당근케이크',1,0,0,NULL,'DESSERT'),
	 ('DE010','데니쉬',0,0,0,NULL,'DESSERT'),
	 ('DE011','도넛',0,0,1,NULL,'DESSERT'),
	 ('DE012','딸기케이크',0,0,0,NULL,'DESSERT');
INSERT INTO search_filter (code,code_title,recomm_filter_yn,recomm_menu_yn,dp_yn,remarks,group_code) VALUES
	 ('DE013','떡',0,0,0,NULL,'DESSERT'),
	 ('DE014','러스크',0,0,0,NULL,'DESSERT'),
	 ('DE015','레드벨벳케이크',0,0,0,NULL,'DESSERT'),
	 ('DE016','레몬케이크',0,0,0,NULL,'DESSERT'),
	 ('DE017','롤케이크',0,0,0,NULL,'DESSERT'),
	 ('DE018','르뱅쿠키',1,0,0,NULL,'DESSERT'),
	 ('DE019','마들렌',0,0,0,NULL,'DESSERT'),
	 ('DE020','마카롱',0,0,1,NULL,'DESSERT'),
	 ('DE021','망고케이크',0,0,0,NULL,'DESSERT'),
	 ('DE022','머랭쿠키',0,0,0,NULL,'DESSERT');
INSERT INTO search_filter (code,code_title,recomm_filter_yn,recomm_menu_yn,dp_yn,remarks,group_code) VALUES
	 ('DE023','머핀',0,0,0,NULL,'DESSERT'),
	 ('DE024','모나카',0,0,0,NULL,'DESSERT'),
	 ('DE025','몽블랑',0,0,0,NULL,'DESSERT'),
	 ('DE026','무스케이크',0,0,0,NULL,'DESSERT'),
	 ('DE027','밀크티빙수',0,0,0,NULL,'DESSERT'),
	 ('DE028','밀푀유',0,0,0,NULL,'DESSERT'),
	 ('DE029','바게트',0,0,0,NULL,'DESSERT'),
	 ('DE030','바닐라타르트',0,0,0,NULL,'DESSERT'),
	 ('DE031','뱅오쇼콜라',0,0,0,NULL,'DESSERT'),
	 ('DE032','베이커리',0,0,1,NULL,'DESSERT');
INSERT INTO search_filter (code,code_title,recomm_filter_yn,recomm_menu_yn,dp_yn,remarks,group_code) VALUES
	 ('DE033','브라우니',0,0,0,NULL,'DESSERT'),
	 ('DE034','브라운치즈크로플',0,0,0,NULL,'DESSERT'),
	 ('DE035','브리오슈',0,0,0,NULL,'DESSERT'),
	 ('DE036','비스코티',0,0,0,NULL,'DESSERT'),
	 ('DE037','빅토리아케이크',0,0,0,NULL,'DESSERT'),
	 ('DE038','빙수',0,0,1,NULL,'DESSERT'),
	 ('DE039','빨미까레',0,0,0,NULL,'DESSERT'),
	 ('DE040','쉬폰케이크',0,0,0,NULL,'DESSERT'),
	 ('DE041','슈',0,0,0,NULL,'DESSERT'),
	 ('DE042','스모어쿠키',0,0,0,NULL,'DESSERT');
INSERT INTO search_filter (code,code_title,recomm_filter_yn,recomm_menu_yn,dp_yn,remarks,group_code) VALUES
	 ('DE043','스콘',0,0,0,NULL,'DESSERT'),
	 ('DE044','식빵',0,0,0,NULL,'DESSERT'),
	 ('DE045','쑥케이크',0,0,0,NULL,'DESSERT'),
	 ('DE046','아이스크림',0,0,1,NULL,'DESSERT'),
	 ('DE047','아이스크림와플',0,0,0,NULL,'DESSERT'),
	 ('DE048','아이스크림크로플',0,0,0,NULL,'DESSERT'),
	 ('DE049','앙버터',0,0,0,NULL,'DESSERT'),
	 ('DE050','양갱',0,0,0,NULL,'DESSERT'),
	 ('DE051','얼그레이케이크',0,0,0,NULL,'DESSERT'),
	 ('DE052','얼그레이타르트',0,0,0,NULL,'DESSERT');
INSERT INTO search_filter (code,code_title,recomm_filter_yn,recomm_menu_yn,dp_yn,remarks,group_code) VALUES
	 ('DE053','에그타르트',0,0,0,NULL,'DESSERT'),
	 ('DE054','에끌레어',0,0,0,NULL,'DESSERT'),
	 ('DE055','오레오케이크',0,0,0,NULL,'DESSERT'),
	 ('DE056','오렌지케이크',0,0,0,NULL,'DESSERT'),
	 ('DE057','와플',0,0,1,NULL,'DESSERT'),
	 ('DE058','전통디저트',0,0,1,NULL,'DESSERT'),
	 ('DE059','젤라또',1,0,0,NULL,'DESSERT'),
	 ('DE060','초코빙수',0,0,0,NULL,'DESSERT'),
	 ('DE061','초코케이크',0,0,0,NULL,'DESSERT'),
	 ('DE062','초코타르트',0,0,0,NULL,'DESSERT');
INSERT INTO search_filter (code,code_title,recomm_filter_yn,recomm_menu_yn,dp_yn,remarks,group_code) VALUES
	 ('DE063','초콜릿',0,0,0,NULL,'DESSERT'),
	 ('DE064','츄러스',0,0,0,NULL,'DESSERT'),
	 ('DE065','치아바타',0,0,0,NULL,'DESSERT'),
	 ('DE066','치즈케이크',1,0,0,NULL,'DESSERT'),
	 ('DE067','치즈타르트',0,0,0,NULL,'DESSERT'),
	 ('DE068','카라멜',0,0,0,NULL,'DESSERT'),
	 ('DE069','카라멜케이크',0,0,0,NULL,'DESSERT'),
	 ('DE070','카라멜타르트',0,0,0,NULL,'DESSERT'),
	 ('DE071','카스테라',0,0,0,NULL,'DESSERT'),
	 ('DE072','컵케이크',0,0,0,NULL,'DESSERT');
INSERT INTO search_filter (code,code_title,recomm_filter_yn,recomm_menu_yn,dp_yn,remarks,group_code) VALUES
	 ('DE073','케이크',0,0,1,NULL,'DESSERT'),
	 ('DE074','콘브레드',0,0,0,NULL,'DESSERT'),
	 ('DE075','쿠키',0,0,1,NULL,'DESSERT'),
	 ('DE076','퀸아망',0,0,0,NULL,'DESSERT'),
	 ('DE077','크래커',0,0,0,NULL,'DESSERT'),
	 ('DE078','크럼블',0,0,0,NULL,'DESSERT'),
	 ('DE079','크레이프케이크',0,0,0,NULL,'DESSERT'),
	 ('DE080','크레페',0,0,0,NULL,'DESSERT'),
	 ('DE081','크렘브륄레',0,0,0,NULL,'DESSERT'),
	 ('DE082','크로플',1,0,0,NULL,'DESSERT');
INSERT INTO search_filter (code,code_title,recomm_filter_yn,recomm_menu_yn,dp_yn,remarks,group_code) VALUES
	 ('DE083','크루아상',0,0,0,NULL,'DESSERT'),
	 ('DE084','크림브륄레',0,0,0,NULL,'DESSERT'),
	 ('DE085','크림빵',0,0,0,NULL,'DESSERT'),
	 ('DE086','타르트',0,1,0,NULL,'DESSERT'),
	 ('DE087','테린느',0,0,0,NULL,'DESSERT'),
	 ('DE088','통밀빵',0,0,0,NULL,'DESSERT'),
	 ('DE089','티라미수',1,0,0,NULL,'DESSERT'),
	 ('DE090','파블로바',0,0,0,NULL,'DESSERT'),
	 ('DE091','파운드케이크',0,1,0,NULL,'DESSERT'),
	 ('DE092','파이',0,0,0,NULL,'DESSERT');
INSERT INTO search_filter (code,code_title,recomm_filter_yn,recomm_menu_yn,dp_yn,remarks,group_code) VALUES
	 ('DE093','팥빙수',0,0,0,NULL,'DESSERT'),
	 ('DE094','팥빵',0,0,0,NULL,'DESSERT'),
	 ('DE095','페스츄리',0,0,0,NULL,'DESSERT'),
	 ('DE096','포카치아',0,0,0,NULL,'DESSERT'),
	 ('DE097','퐁당쇼콜라',0,0,0,NULL,'DESSERT'),
	 ('DE098','푸딩',0,0,0,NULL,'DESSERT'),
	 ('DE099','프레즐',0,0,0,NULL,'DESSERT'),
	 ('DE100','프레첼',0,0,0,NULL,'DESSERT'),
	 ('DE101','호두파이',0,0,0,NULL,'DESSERT'),
	 ('DE102','휘낭시에',0,0,0,NULL,'DESSERT');
INSERT INTO search_filter (code,code_title,recomm_filter_yn,recomm_menu_yn,dp_yn,remarks,group_code) VALUES
	 ('DE103','흑임자케이크',0,0,0,NULL,'DESSERT'),
	 ('DE104','화과자',0,0,0,'2021-09-03 필터 추가','DESSERT'),
	 ('DE105','단호박케이크',0,0,0,'2021-09-03 필터 추가','DESSERT'),
	 ('DE106','프레지에',0,0,0,'2021-09-03 필터 추가','DESSERT'),
	 ('DE107','고구마케이크',0,0,0,'2021-09-03 필터 추가','DESSERT'),
	 ('DE108','망고빙수',0,0,0,'2021-09-03 필터 추가','DESSERT'),
	 ('DE109','바스크치즈케이크',0,0,0,'2021-09-03 필터 추가','DESSERT'),
	 ('DE110','팝콘',0,0,0,'2021-09-03 필터 추가','DESSERT'),
	 ('DE111','젤리',0,0,0,'2021-09-03 필터 추가','DESSERT'),
	 ('ET001','강아지음료',0,0,0,NULL,'ETC');
INSERT INTO search_filter (code,code_title,recomm_filter_yn,recomm_menu_yn,dp_yn,remarks,group_code) VALUES
	 ('ET002','고구마라떼',0,0,0,NULL,'ETC'),
	 ('ET004','그린티프라페',0,0,0,NULL,'ETC'),
	 ('ET005','니트로커피',0,0,0,NULL,'ETC'),
	 ('ET006','다방커피',0,0,0,NULL,'ETC'),
	 ('ET007','달고나라떼',0,1,0,NULL,'ETC'),
	 ('ET008','딸기요거트스무디',0,0,0,NULL,'ETC'),
	 ('ET009','로투스라떼',0,0,0,NULL,'ETC'),
	 ('ET010','롱블랙',0,0,0,NULL,'ETC'),
	 ('ET011','룽고',0,0,0,NULL,'ETC'),
	 ('ET012','리스트레토',0,0,0,NULL,'ETC');
INSERT INTO search_filter (code,code_title,recomm_filter_yn,recomm_menu_yn,dp_yn,remarks,group_code) VALUES
	 ('ET013','망고요거트스무디',0,0,0,NULL,'ETC'),
	 ('ET014','메이플라떼',0,0,0,NULL,'ETC'),
	 ('ET015','모히또',0,0,0,NULL,'ETC'),
	 ('ET016','미숫가루',0,0,0,NULL,'ETC'),
	 ('ET017','민트라떼',0,0,0,NULL,'ETC'),
	 ('ET018','민트초코',0,0,0,NULL,'ETC'),
	 ('ET019','밀크쉐이크',0,0,0,NULL,'ETC'),
	 ('ET020','바닐라라떼',0,1,0,NULL,'ETC'),
	 ('ET021','바닐라쉐이크',0,0,0,NULL,'ETC'),
	 ('ET022','바닐라프라페',0,0,0,NULL,'ETC');
INSERT INTO search_filter (code,code_title,recomm_filter_yn,recomm_menu_yn,dp_yn,remarks,group_code) VALUES
	 ('ET023','밤라떼',0,0,0,NULL,'ETC'),
	 ('ET024','베트남커피',0,0,0,NULL,'ETC'),
	 ('ET025','복숭아요거트스무디',0,0,0,NULL,'ETC'),
	 ('ET026','블루베리요거트스무디',0,0,0,NULL,'ETC'),
	 ('ET027','샤케라또',0,1,0,NULL,'ETC'),
	 ('ET028','솔티라떼',0,0,0,NULL,'ETC'),
	 ('ET029','쉐이크',0,0,0,NULL,'ETC'),
	 ('ET030','슈크림라떼',0,0,0,NULL,'ETC'),
	 ('ET031','스무디',0,0,0,NULL,'ETC'),
	 ('ET032','시나몬라떼',0,0,0,NULL,'ETC');
INSERT INTO search_filter (code,code_title,recomm_filter_yn,recomm_menu_yn,dp_yn,remarks,group_code) VALUES
	 ('ET033','쌀라떼',0,0,0,NULL,'ETC'),
	 ('ET034','쑥라떼',0,1,0,NULL,'ETC'),
	 ('ET035','아메리카노',0,0,0,NULL,'ETC'),
	 ('ET036','아몬드라떼',0,0,0,NULL,'ETC'),
	 ('ET037','아이스크림라떼',0,0,0,NULL,'ETC'),
	 ('ET038','아인슈페너',0,1,0,NULL,'ETC'),
	 ('ET039','아포가토',0,0,0,NULL,'ETC'),
	 ('ET040','에스프레소',0,0,0,NULL,'ETC'),
	 ('ET041','에스프레소마끼아또',0,0,0,NULL,'ETC'),
	 ('ET042','에이드',0,0,0,NULL,'ETC');
INSERT INTO search_filter (code,code_title,recomm_filter_yn,recomm_menu_yn,dp_yn,remarks,group_code) VALUES
	 ('ET043','연유라떼',0,1,0,NULL,'ETC'),
	 ('ET044','오곡라떼',0,0,0,NULL,'ETC'),
	 ('ET045','오렌지비앙코',0,0,0,NULL,'ETC'),
	 ('ET046','오트밀라떼',0,0,0,NULL,'ETC'),
	 ('ET047','요거트스무디',0,0,0,NULL,'ETC'),
	 ('ET048','우유',0,0,0,NULL,'ETC'),
	 ('ET049','유자요거트스무디',0,0,0,NULL,'ETC'),
	 ('ET050','인절미라떼',0,0,0,NULL,'ETC'),
	 ('ET051','자바칩프라페',0,0,0,NULL,'ETC'),
	 ('ET052','죠리퐁라떼',0,0,0,NULL,'ETC');
INSERT INTO search_filter (code,code_title,recomm_filter_yn,recomm_menu_yn,dp_yn,remarks,group_code) VALUES
	 ('ET053','청포도요거트스무디',0,0,0,NULL,'ETC'),
	 ('ET054','초코라떼',0,1,0,NULL,'ETC'),
	 ('ET055','초코쉐이크',0,0,0,NULL,'ETC'),
	 ('ET056','초코프라페',0,0,0,NULL,'ETC'),
	 ('ET057','치즈라떼',0,0,0,NULL,'ETC'),
	 ('ET058','카라멜라떼',0,0,0,NULL,'ETC'),
	 ('ET059','카라멜마끼아또',0,0,0,NULL,'ETC'),
	 ('ET060','카페라떼',0,0,0,NULL,'ETC'),
	 ('ET061','카페모카',0,0,0,NULL,'ETC'),
	 ('ET062','카푸치노',0,0,0,NULL,'ETC');
INSERT INTO search_filter (code,code_title,recomm_filter_yn,recomm_menu_yn,dp_yn,remarks,group_code) VALUES
	 ('ET063','커피소다',0,0,0,NULL,'ETC'),
	 ('ET064','코르타도',0,0,0,NULL,'ETC'),
	 ('ET065','코코넛라떼',0,0,0,NULL,'ETC'),
	 ('ET066','코코넛스무디',0,0,0,NULL,'ETC'),
	 ('ET067','코코넛커피',0,0,0,NULL,'ETC'),
	 ('ET068','콘파냐',0,1,0,NULL,'ETC'),
	 ('ET069','쿠앤크라떼',0,0,0,NULL,'ETC'),
	 ('ET070','큐브라떼',0,0,0,NULL,'ETC'),
	 ('ET071','크림라떼',0,0,0,NULL,'ETC'),
	 ('ET072','크림커피',0,1,0,NULL,'ETC');
INSERT INTO search_filter (code,code_title,recomm_filter_yn,recomm_menu_yn,dp_yn,remarks,group_code) VALUES
	 ('ET073','키위요거트스무디',0,0,0,NULL,'ETC'),
	 ('ET074','토피넛라떼',0,0,0,NULL,'ETC'),
	 ('ET075','티라미수라떼',0,0,0,NULL,'ETC'),
	 ('ET076','파인애플요거트스무디',0,0,0,NULL,'ETC'),
	 ('ET077','팥라떼',0,0,0,NULL,'ETC'),
	 ('ET078','프라페',0,0,0,NULL,'ETC'),
	 ('ET079','플랫화이트',0,1,0,NULL,'ETC'),
	 ('ET080','플레인요거트스무디',0,0,0,NULL,'ETC'),
	 ('ET081','피콜로라떼',0,0,0,NULL,'ETC'),
	 ('ET082','허니라떼',0,0,0,NULL,'ETC');
INSERT INTO search_filter (code,code_title,recomm_filter_yn,recomm_menu_yn,dp_yn,remarks,group_code) VALUES
	 ('ET083','헤이즐넛라떼',0,0,0,NULL,'ETC'),
	 ('ET084','헤이즐넛아메리카노',0,0,0,NULL,'ETC'),
	 ('ET085','호두라떼',0,0,0,NULL,'ETC'),
	 ('ET086','호박라떼',0,0,0,NULL,'ETC'),
	 ('ET087','흑당밀크티',0,0,0,NULL,'ETC'),
	 ('ET088','흑임자라떼',0,1,0,NULL,'ETC'),
	 ('ET089','탄산수',0,0,0,'2021-09-03 필터 추가','ETC'),
	 ('ET090','파르페',0,0,0,'2021-09-03 필터 추가','ETC'),
	 ('ET091','탄산음료',0,0,0,'2021-09-03 필터 추가','ETC'),
	 ('ET092','뱅쇼',0,0,0,'2021-09-03 필터 추가','ETC');
INSERT INTO search_filter (code,code_title,recomm_filter_yn,recomm_menu_yn,dp_yn,remarks,group_code) VALUES
	 ('ET093','흑당라떼',0,0,0,'2021-09-03 필터 추가','ETC'),
	 ('ET094','식혜',0,0,0,'2021-09-03 필터 추가','ETC'),
	 ('ET095','사케라또',0,0,0,'2021-09-03 필터 추가','ETC'),
	 ('ET096','카페오레',0,0,0,'2021-09-03 필터 추가','ETC'),
	 ('ET098','프로그램',0,0,0,'2021-09-03 필터 추가','ETC'),
	 ('ET099','아이스크림소다',0,0,0,'2021-09-03 필터 추가','ETC'),
	 ('ET100','뱅쇼에이드',0,0,0,'2021-09-03 필터 추가','ETC'),
	 ('ET101','샹그리아',0,0,0,'2021-09-03 필터 추가','ETC'),
	 ('ET102','요구르트',0,0,0,'2021-09-03 필터 추가','ETC'),
	 ('ET103','쿠앤크프라페',0,0,0,'2021-09-03 필터 추가','ETC');
INSERT INTO search_filter (code,code_title,recomm_filter_yn,recomm_menu_yn,dp_yn,remarks,group_code) VALUES
	 ('ET104','칵테일',0,0,0,'2021-09-03 필터 추가','ETC'),
	 ('ET105','더티커피',0,0,0,'2021-09-03 필터 추가','ETC'),
	 ('ET106','오레그랏세',0,0,0,'2021-09-03 필터 추가','ETC'),
	 ('ET107','스낵',0,0,0,'2021-09-03 필터 추가','ETC'),
	 ('ET108','대추라떼',0,0,0,'2021-09-03 필터 추가','ETC'),
	 ('ET109','석류차',0,0,0,'2021-09-03 필터 추가','ETC'),
	 ('ET110','감잎차',0,0,0,'2021-09-03 필터 추가','ETC'),
	 ('ET112','배도라지',0,0,0,'2021-09-03 필터 추가','ETC'),
	 ('ET113','옥수수라떼',0,0,0,'2021-09-03 필터 추가','ETC'),
	 ('ET114','진저에이드',0,0,0,'2021-09-03 필터 추가','ETC');
INSERT INTO search_filter (code,code_title,recomm_filter_yn,recomm_menu_yn,dp_yn,remarks,group_code) VALUES
	 ('ET115','피스타치오라떼',0,0,0,'2021-09-03 필터 추가','ETC'),
	 ('ET116','조리퐁',0,0,0,'2021-09-03 필터 추가','ETC'),
	 ('ET117','코코볼',0,0,0,'2021-09-03 필터 추가','ETC'),
	 ('ET118','골드메달애플주스',0,0,0,'2021-09-03 필터 추가','ETC'),
	 ('FR001','감귤에이드',0,0,0,NULL,'FRUITVEGET'),
	 ('FR002','감귤주스',0,0,0,NULL,'FRUITVEGET'),
	 ('FR003','과일라떼',0,0,1,NULL,'FRUITVEGET'),
	 ('FR004','과일스무디',0,0,1,NULL,'FRUITVEGET'),
	 ('FR005','과일에이드',0,0,1,NULL,'FRUITVEGET'),
	 ('FR006','과일주스',0,0,1,NULL,'FRUITVEGET');
INSERT INTO search_filter (code,code_title,recomm_filter_yn,recomm_menu_yn,dp_yn,remarks,group_code) VALUES
	 ('FR007','깔라만시에이드',0,0,0,NULL,'FRUITVEGET'),
	 ('FR008','딸기라떼',1,0,0,NULL,'FRUITVEGET'),
	 ('FR009','딸기바나나',0,0,0,NULL,'FRUITVEGET'),
	 ('FR011','딸기스무디',0,0,0,NULL,'FRUITVEGET'),
	 ('FR012','딸기에이드',0,0,0,NULL,'FRUITVEGET'),
	 ('FR013','딸기주스',0,0,0,NULL,'FRUITVEGET'),
	 ('FR014','라임에이드',0,0,0,NULL,'FRUITVEGET'),
	 ('FR015','라즈베리에이드',0,0,0,NULL,'FRUITVEGET'),
	 ('FR016','레몬스무디',0,0,0,NULL,'FRUITVEGET'),
	 ('FR017','레몬에이드',1,0,0,NULL,'FRUITVEGET');
INSERT INTO search_filter (code,code_title,recomm_filter_yn,recomm_menu_yn,dp_yn,remarks,group_code) VALUES
	 ('FR018','레몬주스',0,0,0,NULL,'FRUITVEGET'),
	 ('FR019','망고라떼',0,0,0,NULL,'FRUITVEGET'),
	 ('FR020','망고스무디',0,0,0,NULL,'FRUITVEGET'),
	 ('FR021','망고에이드',0,0,0,NULL,'FRUITVEGET'),
	 ('FR022','망고주스',0,0,0,NULL,'FRUITVEGET'),
	 ('FR023','매실에이드',0,0,0,NULL,'FRUITVEGET'),
	 ('FR024','메론에이드',0,0,0,NULL,'FRUITVEGET'),
	 ('FR025','메론주스',0,0,0,NULL,'FRUITVEGET'),
	 ('FR026','멜론에이드',0,0,0,NULL,'FRUITVEGET'),
	 ('FR027','바나나라떼',0,0,0,NULL,'FRUITVEGET');
INSERT INTO search_filter (code,code_title,recomm_filter_yn,recomm_menu_yn,dp_yn,remarks,group_code) VALUES
	 ('FR028','바나나스무디',0,0,0,NULL,'FRUITVEGET'),
	 ('FR029','바나나주스',0,0,0,NULL,'FRUITVEGET'),
	 ('FR030','백향과에이드',0,0,0,NULL,'FRUITVEGET'),
	 ('FR031','복숭아라떼',0,0,0,NULL,'FRUITVEGET'),
	 ('FR032','복숭아스무디',0,0,0,NULL,'FRUITVEGET'),
	 ('FR033','복숭아에이드',0,0,0,NULL,'FRUITVEGET'),
	 ('FR034','복숭아주스',0,0,0,NULL,'FRUITVEGET'),
	 ('FR035','블루베리라떼',0,0,0,NULL,'FRUITVEGET'),
	 ('FR036','블루베리스무디',0,0,0,NULL,'FRUITVEGET'),
	 ('FR037','블루베리에이드',0,0,0,NULL,'FRUITVEGET');
INSERT INTO search_filter (code,code_title,recomm_filter_yn,recomm_menu_yn,dp_yn,remarks,group_code) VALUES
	 ('FR038','블루베리주스',0,0,0,NULL,'FRUITVEGET'),
	 ('FR039','사과라떼',0,0,0,NULL,'FRUITVEGET'),
	 ('FR040','사과스무디',0,0,0,NULL,'FRUITVEGET'),
	 ('FR041','사과에이드',0,0,0,NULL,'FRUITVEGET'),
	 ('FR042','사과주스',0,0,0,NULL,'FRUITVEGET'),
	 ('FR043','생과일',0,0,1,NULL,'FRUITVEGET'),
	 ('FR044','석류에이드',0,0,0,NULL,'FRUITVEGET'),
	 ('FR045','수박주스',0,0,0,NULL,'FRUITVEGET'),
	 ('FR046','아보카도스무디',0,0,0,NULL,'FRUITVEGET'),
	 ('FR047','애플망고에이드',0,0,0,NULL,'FRUITVEGET');
INSERT INTO search_filter (code,code_title,recomm_filter_yn,recomm_menu_yn,dp_yn,remarks,group_code) VALUES
	 ('FR048','야채주스',0,0,1,NULL,'FRUITVEGET'),
	 ('FR049','오디라떼',0,0,0,NULL,'FRUITVEGET'),
	 ('FR050','오렌지라떼',0,0,0,NULL,'FRUITVEGET'),
	 ('FR051','오렌지스무디',0,0,0,NULL,'FRUITVEGET'),
	 ('FR052','오렌지에이드',0,0,0,NULL,'FRUITVEGET'),
	 ('FR053','오렌지주스',0,0,0,NULL,'FRUITVEGET'),
	 ('FR054','오렌지한라봉에이드',0,0,0,NULL,'FRUITVEGET'),
	 ('FR055','오미자에이드',0,0,0,NULL,'FRUITVEGET'),
	 ('FR056','오미자주스',0,0,0,NULL,'FRUITVEGET'),
	 ('FR058','유자스무디',0,0,0,NULL,'FRUITVEGET');
INSERT INTO search_filter (code,code_title,recomm_filter_yn,recomm_menu_yn,dp_yn,remarks,group_code) VALUES
	 ('FR059','유자에이드',0,0,0,NULL,'FRUITVEGET'),
	 ('FR060','자두복숭아에이드',0,0,0,NULL,'FRUITVEGET'),
	 ('FR061','자두에이드',0,0,0,NULL,'FRUITVEGET'),
	 ('FR062','자두주스',0,0,0,NULL,'FRUITVEGET'),
	 ('FR063','자몽라떼',0,0,0,NULL,'FRUITVEGET'),
	 ('FR064','자몽스무디',0,0,0,NULL,'FRUITVEGET'),
	 ('FR065','자몽에이드',1,0,0,NULL,'FRUITVEGET'),
	 ('FR066','자몽주스',0,0,0,NULL,'FRUITVEGET'),
	 ('FR067','참외라떼',0,0,0,NULL,'FRUITVEGET'),
	 ('FR068','참외스무디',0,0,0,NULL,'FRUITVEGET');
INSERT INTO search_filter (code,code_title,recomm_filter_yn,recomm_menu_yn,dp_yn,remarks,group_code) VALUES
	 ('FR069','참외에이드',0,0,0,NULL,'FRUITVEGET'),
	 ('FR070','참외주스',0,0,0,NULL,'FRUITVEGET'),
	 ('FR071','청귤에이드',0,0,0,NULL,'FRUITVEGET'),
	 ('FR072','청사과에이드',0,0,0,NULL,'FRUITVEGET'),
	 ('FR073','청포도스무디',0,0,0,NULL,'FRUITVEGET'),
	 ('FR074','청포도에이드',0,0,0,NULL,'FRUITVEGET'),
	 ('FR075','청포도주스',0,0,0,NULL,'FRUITVEGET'),
	 ('FR076','체리에이드',0,0,0,NULL,'FRUITVEGET'),
	 ('FR078','키위라떼',0,0,0,NULL,'FRUITVEGET'),
	 ('FR079','키위바나나주스',0,0,0,NULL,'FRUITVEGET');
INSERT INTO search_filter (code,code_title,recomm_filter_yn,recomm_menu_yn,dp_yn,remarks,group_code) VALUES
	 ('FR080','키위스무디',0,0,0,NULL,'FRUITVEGET'),
	 ('FR081','키위에이드',0,0,0,NULL,'FRUITVEGET'),
	 ('FR082','키위주스',0,0,0,NULL,'FRUITVEGET'),
	 ('FR083','토마토바질에이드',0,0,0,NULL,'FRUITVEGET'),
	 ('FR084','토마토에이드',0,0,0,NULL,'FRUITVEGET'),
	 ('FR085','토마토주스',0,0,0,NULL,'FRUITVEGET'),
	 ('FR086','파인애플스무디',0,0,0,NULL,'FRUITVEGET'),
	 ('FR087','파인애플에이드',0,0,0,NULL,'FRUITVEGET'),
	 ('FR088','파인애플주스',0,0,0,NULL,'FRUITVEGET'),
	 ('FR089','파인후르츠에이드',0,0,0,NULL,'FRUITVEGET');
INSERT INTO search_filter (code,code_title,recomm_filter_yn,recomm_menu_yn,dp_yn,remarks,group_code) VALUES
	 ('FR090','패션후르츠스무디',0,0,0,NULL,'FRUITVEGET'),
	 ('FR091','패션후르츠에이드',1,0,0,NULL,'FRUITVEGET'),
	 ('FR092','포도주스',0,0,0,NULL,'FRUITVEGET'),
	 ('FR093','한라봉에이드',0,0,0,NULL,'FRUITVEGET'),
	 ('FR094','한라봉오렌지에이드',0,0,0,NULL,'FRUITVEGET'),
	 ('FR095','홍시주스',0,0,0,NULL,'FRUITVEGET'),
	 ('FR096','수박에이드',0,0,0,'2021-09-03 필터 추가','FRUITVEGET'),
	 ('FR097','베리에이드',0,0,0,'2021-09-03 필터 추가','FRUITVEGET'),
	 ('FR098','복분자에이드',0,0,0,'2021-09-03 필터 추가','FRUITVEGET'),
	 ('FR099','오디주스',0,0,0,'2021-09-03 필터 추가','FRUITVEGET');
INSERT INTO search_filter (code,code_title,recomm_filter_yn,recomm_menu_yn,dp_yn,remarks,group_code) VALUES
	 ('FR100','석류주스',0,0,0,'2021-09-03 필터 추가','FRUITVEGET'),
	 ('FR101','한라봉주스',0,0,0,'2021-09-03 필터 추가','FRUITVEGET'),
	 ('FR102','무화과에이드',0,0,0,'2021-09-03 필터 추가','FRUITVEGET'),
	 ('FR103','유자주스',0,0,0,'2021-09-03 필터 추가','FRUITVEGET'),
	 ('FR104','메론라떼',0,0,0,'2021-09-03 필터 추가','FRUITVEGET'),
	 ('FR105','청귤주스',0,0,0,'2021-09-03 필터 추가','FRUITVEGET'),
	 ('PR001','과테말라원두',0,0,0,NULL,'PREMIUM'),
	 ('PR002','디카페인',0,0,1,NULL,'PREMIUM'),
	 ('PR003','버터스카치라떼',0,0,0,NULL,'PREMIUM'),
	 ('PR004','볼리비아원두',0,0,0,NULL,'PREMIUM');
INSERT INTO search_filter (code,code_title,recomm_filter_yn,recomm_menu_yn,dp_yn,remarks,group_code) VALUES
	 ('PR005','브라질원두',0,0,0,NULL,'PREMIUM'),
	 ('PR006','스페셜티',0,0,1,NULL,'PREMIUM'),
	 ('PR007','에스프레소바',0,0,1,NULL,'PREMIUM'),
	 ('PR008','에콰도르원두',0,0,0,NULL,'PREMIUM'),
	 ('PR009','에티오피아원두',0,0,0,NULL,'PREMIUM'),
	 ('PR010','오늘의커피',0,0,0,NULL,'PREMIUM'),
	 ('PR011','인도네시아원두',0,0,0,NULL,'PREMIUM'),
	 ('PR012','케냐원두',0,0,0,NULL,'PREMIUM'),
	 ('PR013','코스타리카원두',0,0,0,NULL,'PREMIUM'),
	 ('PR014','콜드브루',0,0,1,NULL,'PREMIUM');
INSERT INTO search_filter (code,code_title,recomm_filter_yn,recomm_menu_yn,dp_yn,remarks,group_code) VALUES
	 ('PR015','콜드브루라떼',0,0,0,NULL,'PREMIUM'),
	 ('PR016','콜롬비아원두',0,0,0,NULL,'PREMIUM'),
	 ('PR017','파푸아뉴기니원두',0,0,0,NULL,'PREMIUM'),
	 ('PR018','페루원두',0,0,0,NULL,'PREMIUM'),
	 ('PR019','푸어오버',0,0,0,NULL,'PREMIUM'),
	 ('PR020','핸드드립',0,0,1,NULL,'PREMIUM'),
	 ('SV01','무선인터넷',0,0,1,NULL,'SG01'),
	 ('SV02','주차',0,0,1,'내주변에서 service_code > PARKING 코드 사용','SG01'),
	 ('SV03','발렛파킹',0,0,1,NULL,'SG01'),
	 ('SV04','반려동물',0,0,1,'내주변에서 service_code > PET 코드 사용','SG01');
INSERT INTO search_filter (code,code_title,recomm_filter_yn,recomm_menu_yn,dp_yn,remarks,group_code) VALUES
	 ('SV06','예약',0,0,1,NULL,'SG01'),
	 ('SV07','포장',0,0,1,NULL,'SG01'),
	 ('SV08','배달',0,0,1,NULL,'SG01'),
	 ('SV09','화장실구분',0,0,1,NULL,'SG01'),
	 ('SV10','리필가능',0,0,1,NULL,'SG01'),
	 ('SV11','텀블러할인',0,0,1,NULL,'SG01'),
	 ('SV12','테이크아웃 전용',0,0,1,NULL,'SG01'),
	 ('SV13','콘센트 좌석',0,0,1,NULL,'SG01'),
	 ('SV14','단체석',0,0,1,NULL,'SG01'),
	 ('SV15','원두선택가능',0,0,1,NULL,'SG01');
INSERT INTO search_filter (code,code_title,recomm_filter_yn,recomm_menu_yn,dp_yn,remarks,group_code) VALUES
	 ('SV16','원두판매',0,0,1,NULL,'SG01'),
	 ('SV17','주류판매',0,0,1,NULL,'SG01'),
	 ('SV18','굿즈판매',0,0,1,NULL,'SG01'),
	 ('TE001','감귤차',0,0,0,NULL,'TEA'),
	 ('TE002','과일차',0,0,1,NULL,'TEA'),
	 ('TE003','국화차',0,0,0,NULL,'TEA'),
	 ('TE004','그린티',0,0,0,NULL,'TEA'),
	 ('TE005','깔라만시차',0,0,0,NULL,'TEA'),
	 ('TE006','꽃차',0,0,1,NULL,'TEA'),
	 ('TE007','다즐링',0,0,0,NULL,'TEA');
INSERT INTO search_filter (code,code_title,recomm_filter_yn,recomm_menu_yn,dp_yn,remarks,group_code) VALUES
	 ('TE008','대추차',0,0,0,NULL,'TEA'),
	 ('TE009','도라지차',0,0,0,NULL,'TEA'),
	 ('TE010','디카페인차',0,0,0,NULL,'TEA'),
	 ('TE011','디톡스차',0,0,0,NULL,'TEA'),
	 ('TE012','딸기차',0,0,0,NULL,'TEA'),
	 ('TE013','라벤더',0,0,0,NULL,'TEA'),
	 ('TE014','라임차',0,0,0,NULL,'TEA'),
	 ('TE015','라즈베리차',0,0,0,NULL,'TEA'),
	 ('TE016','레몬차',1,0,0,NULL,'TEA'),
	 ('TE017','로즈마리',0,0,0,NULL,'TEA');
INSERT INTO search_filter (code,code_title,recomm_filter_yn,recomm_menu_yn,dp_yn,remarks,group_code) VALUES
	 ('TE018','루이보스',1,0,0,NULL,'TEA'),
	 ('TE019','마르코폴로',0,0,0,NULL,'TEA'),
	 ('TE020','차이',0,0,0,NULL,'TEA'),
	 ('TE021','매실차',0,0,0,NULL,'TEA'),
	 ('TE022','모과차',0,0,0,NULL,'TEA'),
	 ('TE023','무화과차',0,0,0,NULL,'TEA'),
	 ('TE024','민트차',0,0,0,NULL,'TEA'),
	 ('TE025','밀크티',0,0,1,NULL,'TEA'),
	 ('TE026','백차',0,0,0,NULL,'TEA'),
	 ('TE027','백향과차',0,0,0,NULL,'TEA');
INSERT INTO search_filter (code,code_title,recomm_filter_yn,recomm_menu_yn,dp_yn,remarks,group_code) VALUES
	 ('TE028','버블티',0,0,0,NULL,'TEA'),
	 ('TE029','보이차',0,0,0,NULL,'TEA'),
	 ('TE030','블렌딩차',0,0,1,NULL,'TEA'),
	 ('TE031','블루베리차',0,0,0,NULL,'TEA'),
	 ('TE032','사과차',0,0,0,NULL,'TEA'),
	 ('TE033','생강차',0,0,0,NULL,'TEA'),
	 ('TE034','수정과',0,0,0,NULL,'TEA'),
	 ('TE035','시나몬차',0,0,0,NULL,'TEA'),
	 ('TE036','쌍화차',0,0,0,NULL,'TEA'),
	 ('TE037','쑥차',0,0,0,NULL,'TEA');
INSERT INTO search_filter (code,code_title,recomm_filter_yn,recomm_menu_yn,dp_yn,remarks,group_code) VALUES
	 ('TE038','아쌈',0,0,0,NULL,'TEA'),
	 ('TE039','아이리쉬',0,0,0,NULL,'TEA'),
	 ('TE040','아이스티',0,0,1,NULL,'TEA'),
	 ('TE041','얼그레이',0,0,0,NULL,'TEA'),
	 ('TE042','연근차',0,0,0,NULL,'TEA'),
	 ('TE043','오렌지차',0,0,0,NULL,'TEA'),
	 ('TE044','우롱차',0,0,0,NULL,'TEA'),
	 ('TE045','우엉차',0,0,0,NULL,'TEA'),
	 ('TE046','웨딩임페리얼',0,0,0,NULL,'TEA'),
	 ('TE047','유자차',0,0,0,NULL,'TEA');
INSERT INTO search_filter (code,code_title,recomm_filter_yn,recomm_menu_yn,dp_yn,remarks,group_code) VALUES
	 ('TE048','잉글리쉬블랙퍼스트',0,0,0,NULL,'TEA'),
	 ('TE049','자몽차',1,0,0,NULL,'TEA'),
	 ('TE050','자몽허니블랙티',0,0,0,NULL,'TEA'),
	 ('TE051','자스민',0,0,0,NULL,'TEA'),
	 ('TE052','전통차',0,0,1,NULL,'TEA'),
	 ('TE053','진저라떼',0,0,0,NULL,'TEA'),
	 ('TE054','차이티',0,0,0,NULL,'TEA'),
	 ('TE055','오미자차',0,0,0,NULL,'TEA'),
	 ('TE056','청귤차',0,0,0,NULL,'TEA'),
	 ('TE057','캐모마일',0,0,0,NULL,'TEA');
INSERT INTO search_filter (code,code_title,recomm_filter_yn,recomm_menu_yn,dp_yn,remarks,group_code) VALUES
	 ('TE058','콤부차',0,0,0,NULL,'TEA'),
	 ('TE059','팥차',0,0,0,NULL,'TEA'),
	 ('TE060','패션후르츠차',0,0,0,NULL,'TEA'),
	 ('TE061','페퍼민트',0,0,0,NULL,'TEA'),
	 ('TE062','한라봉차',0,0,0,NULL,'TEA'),
	 ('TE063','허브차',0,0,1,NULL,'TEA'),
	 ('TE064','호지차',0,0,0,NULL,'TEA'),
	 ('TE065','호지차라떼',0,0,0,NULL,'TEA'),
	 ('TE066','홍차',0,0,1,NULL,'TEA'),
	 ('TE067','히비스커스',1,0,0,NULL,'TEA');
INSERT INTO search_filter (code,code_title,recomm_filter_yn,recomm_menu_yn,dp_yn,remarks,group_code) VALUES
	 ('TE068','체리차',0,0,0,'2021-08-31 추가','TEA'),
	 ('TE069','복분자차',0,0,0,'2021-09-03 필터 추가','TEA'),
	 ('TE070','그린티라떼',0,1,0,'2021-09-07 필터 추가','TEA'),
	 ('TH01','갤러리',0,0,1,NULL,'TG01'),
	 ('TH02','꽃집',0,0,1,NULL,'TG01'),
	 ('TH03','드로잉',0,0,1,NULL,'TG01'),
	 ('TH04','루프탑',0,0,1,NULL,'TG01'),
	 ('TH05','박물관',0,0,1,NULL,'TG01'),
	 ('TH06','북',0,0,1,NULL,'TG01'),
	 ('TH07','쇼룸',0,0,1,NULL,'TG01');
INSERT INTO search_filter (code,code_title,recomm_filter_yn,recomm_menu_yn,dp_yn,remarks,group_code) VALUES
	 ('TH08','식물원',0,0,1,NULL,'TG01'),
	 ('TH09','테라스',0,0,1,NULL,'TG01'),
	 ('TH10','빈티지',0,0,1,NULL,'TG01'),
	 ('TH11','한옥',0,0,1,NULL,'TG01'),
	 ('TH12','휴양지',0,0,1,NULL,'TG01'),
	 ('VE001','두유라떼',0,0,0,NULL,'VEGANKETO'),
	 ('VE002','방탄커피',0,0,0,NULL,'VEGANKETO'),
	 ('VE003','비건',0,0,1,NULL,'VEGANKETO'),
	 ('VE004','비건라떼',1,0,0,NULL,'VEGANKETO'),
	 ('VE005','비건베이커리',1,0,0,NULL,'VEGANKETO');
INSERT INTO search_filter (code,code_title,recomm_filter_yn,recomm_menu_yn,dp_yn,remarks,group_code) VALUES
	 ('VE006','비건브런치',0,0,0,NULL,'VEGANKETO'),
	 ('VE007','비건샌드위치',0,0,0,NULL,'VEGANKETO'),
	 ('VE008','비건케이크',0,0,0,NULL,'VEGANKETO'),
	 ('VE009','비건파스타',0,0,0,NULL,'VEGANKETO'),
	 ('VE010','오트라떼',0,0,0,NULL,'VEGANKETO'),
	 ('VE011','키토',0,0,1,NULL,'VEGANKETO'),
	 ('VE012','비건아이스크림',0,0,0,'2021-08-27 카페1차 데이터 카테고리 리뉴얼 추가내용(요청 26일)','VEGANKETO');

-- search_filter ***********************************************************