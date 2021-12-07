import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import _ from 'lodash';

// import components
import CafeLogo from '@components/cafeForm/CafeLogo';
import FileUpload from '@components/fileUpload/FileUpload';
import CafeEdit from '@components/cafeForm/CafeEdit';

// import material
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

// import util & store
import { isEmpty } from '@utils/string';
import { useTrackedCafeRegisterStore, cafeImagesStore } from '@zustand/CafeStore';
import { useTrackedFilterStore } from '@zustand/FilterStore';


const CafesRegister = () => {
  const navigate = useNavigate();
  const cafeState = useTrackedCafeRegisterStore();
  const filterState = useTrackedFilterStore();
  const cafeImageState = cafeImagesStore();

  useEffect(() => {
    filterState.getFilterLists();
    return () => {
      cafeState.resetCafeState();
      cafeImageState.resetImages();
    }
  }, []);

  /* 등록 버튼 */
  const [submittedError, setSubmittedError] = useState<string>('');

  /* 오류 */
  const [categoryError, setCategoryError] = useState<string>('');
  const [serviceError, setServiceError] = useState<string>('');
  const [profileImgError, setProfileImgError] = useState('');

  /* 메뉴 */
  const [isMenuImgUploading, setIsMenuImgUploading] = useState<boolean>(false);

  /*  등록 */
  const onSubmit = useCallback((value, actions) => {
    setSubmittedError('');

    /* 체크 */
    if (isEmpty(cafeState.categoryLists)) { // 카테고리 체크
      alert('홈 카테고리를 한 개 이상 선택해주세요.');
      actions.setSubmitting(false);
      return setCategoryError('홈 카테고리를 한 개 이상 선택해주세요.');
    }
    else if (!isEmpty(categoryError)) { // 카테고리 에러 내용
      actions.setSubmitting(false);
      return alert(categoryError);
    }
    else if (!isEmpty(profileImgError)) { // 이미지에 대한 출처 체크
      actions.setSubmitting(false);
      return alert(profileImgError);
    }
    else if (!isEmpty(profileImgError)) { // 이미지에 대한 출처 체크
      actions.setSubmitting(false);
      return alert(profileImgError);
    }
    else if (!isEmpty(serviceError)) { // 서비스 리스트 체크
      actions.setSubmitting(false);
      return alert(serviceError);
    }
    /* 메뉴 체크*/
    else if (isMenuImgUploading) { // 메뉴 사진 업로드 중 체크
      actions.setSubmitting(false);
      return alert("메뉴 대표 사진이 업로드 중입니다.");
    }
    else if (!isEmpty(cafeState.menuGroupList)) { // 메뉴 정보 전체 체크
      // 카테고리명 체크
      const categoryTitleCheck = cafeState.menuGroupList.some(v => isEmpty(v.categoryTitle));
      if (categoryTitleCheck) {
        actions.setSubmitting(false);
        return alert("카테고리명이 입력되지 않았습니다.");
      }
      // 메뉴 존재 여부 체크
      const categoryMenuCheck = cafeState.menuGroupList.some(v => isEmpty(v.menuList));
      if (categoryMenuCheck) {
        actions.setSubmitting(false);
        return alert("메뉴가 없는 카테고리가 존재합니다.");
      }
      const menuList = cafeState.menuGroupList.map(v => v.menuList);
      let menuTitleCheck = false; // 메뉴명 체크
      let menuPriceCheck = false; // 가격 체크

      if (!isEmpty(menuList)) {
        for (let i = 0; i < menuList.length; i++) {
          for (let j = 0; j < menuList[i].length; j++) {
            const element = menuList[i][j];
            // 메뉴명 체크
            if (isEmpty(element.menuTitle)) menuTitleCheck = true;

            // 가격 체크
            if ((element.menuOption === 'hotonly' || element.menuOption === 'default') && isEmpty(element.defaultPrice)) menuPriceCheck = true;
            else if (element.menuOption === 'icedonly' && isEmpty(element.optionPrice)) menuPriceCheck = true;
            else if (element.menuOption === 'hoticed' && isEmpty(element.optionPrice) && isEmpty(element.defaultPrice)) menuPriceCheck = true;
          }
        }
      }

      if (menuTitleCheck) {
        actions.setSubmitting(false);
        return alert("메뉴명이 입력되지 않았습니다.");
      }
      if (menuPriceCheck) {
        actions.setSubmitting(false);
        return alert("메뉴 가격을 입력해 주세요.");
      }
    }

    /* 대표 설정 체크 */
    const menuRepList = cafeState.menuGroupList.map(v=> v.menuList.filter( v => v.repYn === true));
    let menuRepCount = 0;
    let menuRepNumArr = [];
    for (let i = 0; i < menuRepList.length; i++) {
      for (let j = 0; j < menuRepList[i].length; j++) {
        const element = menuRepList[i][j];
        menuRepCount = menuRepCount +1;
        menuRepNumArr.push(element.repRank);
        if(isEmpty(element.repRank) || element.repRank?.toString() === '0') {
          actions.setSubmitting(false);
          return alert("대표 메뉴 중 순위 설정이 필요한 메뉴가 존재합니다.");
        }
      }
    }
    if(menuRepCount > 5) {
      actions.setSubmitting(false);
      return alert("대표 메뉴 설정은 5개까지 가능합니다.");
    }
    else if (menuRepList.length > 0 && menuRepCount === 0) {
      actions.setSubmitting(false);
      return alert("대표 메뉴 설정이 필요합니다.");
    }
    const unqMenuRepNumArr = _.uniq(menuRepNumArr);
    if(menuRepNumArr.length !== unqMenuRepNumArr.length) {
      actions.setSubmitting(false);
      return alert("중복된 대표 메뉴 순위가 존재합니다.");
    }

    /*  등록 */
    const cafeInfo = {
      ...value,
      categoryLists: cafeState.categoryLists,
      themeLists: cafeState.themeLists,
      serviceLists: cafeState.serviceLists,
      profileImg: cafeState.profileImg,
      menuGroupList: cafeState.menuGroupList,
    }

    const formData = new FormData();
    formData.append('cafeValue', JSON.stringify(cafeInfo));
    if (!isEmpty(cafeImageState.images)) {
      [].forEach.call(cafeImageState.images, (f: any) => {
        formData.append('image', f.file);
      });
    }

    return axios.post('/api/cafes', formData, { withCredentials: true })
      .then(result => {
        alert('등록완료');
        actions.setSubmitting(false);
        cafeState.resetCafeState();
        cafeImageState.resetImages();
        return navigate({ pathname: '/app/cafes/list' });
      })
      .catch(err => {
        console.error(err);
        alert(err.response?.data?.message);
        setSubmittedError(err.response?.data?.message);
        actions.setSubmitting(false);
      });

  }, [
    cafeState.cafeInfo, cafeState.profileImg, cafeState.menuGroupList, cafeImageState.images,
    cafeState.categoryLists, cafeState.themeLists, cafeState.serviceLists,
    categoryError, profileImgError, serviceError, isMenuImgUploading
  ]);

  return (
    <>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3} justifyContent="center">
            <Grid lg={6} md={6} xs={12} item>
              {/*  로고 이미지 */}
              <CafeLogo
                profileImgError={profileImgError}
                setProfileImgError={setProfileImgError}
                type={"register"}
              />
            </Grid>
            <Grid lg={12} md={12} xs={12} item>
              {/*  이미지 업로드*/}
              <DndProvider backend={HTML5Backend}>
                <FileUpload type={"register"}/>
              </DndProvider>
            </Grid>
            {/* 정보 입력 */}
            <Grid lg={12} md={12} xs={12} item>
              <CafeEdit
                onSubmit={onSubmit}
                categoryError={categoryError}
                setCategoryError={setCategoryError}
                serviceError={serviceError}
                setServiceError={setServiceError}
                submittedError={submittedError}
                isMenuImgUploading={isMenuImgUploading}
                setIsMenuImgUploading={setIsMenuImgUploading}
                type={"register"}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default CafesRegister;
