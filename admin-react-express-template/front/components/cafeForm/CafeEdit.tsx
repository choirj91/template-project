import React, { memo, useRef, useCallback, useEffect } from 'react';
import { Grid, Stack } from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { isEmpty } from '@utils/string';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CafeMenuGroupForm from './CafeMenuGroupForm';
import CafeForm from './CafeForm';
import CircularProgress from '@mui/material/CircularProgress';
import { EditCafeStore, RegisterCafeStore } from '@zustand/CafeStore';

// import interface
import { CafeEditProps } from './interface';

const CafeEdit = (props: CafeEditProps) => {
    const {
        onSubmit,
        categoryError,
        setCategoryError,
        serviceError,
        setServiceError,
        submittedError,
        isMenuImgUploading,
        setIsMenuImgUploading,
        type,
    } = props;
    const isEdit = type === 'edit' ? true : false;
    const cafeState = isEdit ? EditCafeStore() : RegisterCafeStore();
    const cafeInfo = cafeState.cafeInfo;

    const menuIndex = useRef(isEmpty(cafeState.menuGroupList) ? 1 : (Math.max(...cafeState.menuGroupList.map(v => v.id))) + 1);

    /* 메뉴 카테고리 추가 */
    const handleClickAddMenuGroup = useCallback(() => {
        menuIndex.current = menuIndex.current + 1;
        cafeState.addMenuGroupList(menuIndex.current);
    }, [type, cafeState]);

    return (isEdit && isEmpty(cafeInfo?.cafeTitle) ?
        <Stack direction="row" spacing={0} style={{ padding: 0, justifyContent: "center" }}>
            <CircularProgress />
        </Stack>
        :
        <>
            <Formik
                initialValues={{
                    cafeTitle: cafeInfo?.cafeTitle || '',
                    cafeTel: cafeInfo?.cafeTel || '',
                    cafeIntro: cafeInfo?.cafeIntro || '',
                    cafeContents: cafeInfo?.cafeContents || '',
                    openMonHours: cafeInfo?.openMonHours || '',
                    closeMonHours: cafeInfo?.closeMonHours || '',
                    openTuesHours: cafeInfo?.openTuesHours || '',
                    closeTuesHours: cafeInfo?.closeTuesHours || '',
                    openWednesHours: cafeInfo?.openWednesHours || '',
                    closeWednesHours: cafeInfo?.closeWednesHours || '',
                    openThursHours: cafeInfo?.openThursHours || '',
                    closeThursHours: cafeInfo?.closeThursHours || '',
                    openFriHours: cafeInfo?.openFriHours || '',
                    closeFriHours: cafeInfo?.closeFriHours || '',
                    openSaturHours: cafeInfo?.openSaturHours || '',
                    closeSaturHours: cafeInfo?.closeSaturHours || '',
                    openSunHours: cafeInfo?.openSunHours || '',
                    closeSunHours: cafeInfo?.closeSunHours || '',
                    cafeOffday: cafeInfo?.cafeOffday || '',
                    cafeOldAddress: cafeInfo?.cafeOldAddress || '',
                    cafeRoadAddress: cafeInfo?.cafeRoadAddress || '',
                    cafeSido: cafeInfo?.cafeSido || '',
                    cafeSiGnGu: cafeInfo?.cafeSiGnGu || '',
                    cafeEMD: cafeInfo?.cafeEMD || '',
                    cafeLatitude: cafeInfo?.cafeLatitude || '',
                    cafeLongitude: cafeInfo?.cafeLongitude || '',
                }}
                validationSchema={
                    Yup.object().shape({
                        cafeTitle: Yup.string().max(255).required('명을 입력해 주세요.'),
                        cafeIntro: Yup.string().max(30, '최대 30자까지 입력 가능합니다.'),
                        // cafeContents: Yup.string().max(255).required('소개를 입력해 주세요.'),
                        cafeTel: Yup.string().max(255).matches(/^\d{2,4}-\d{3,4}-\d{3,4}$/, "0000-0000-0000 포맷으로 입력해 주세요."),
                        cafeOldAddress: Yup.string().max(255).required('지번 주소를 입력해 주세요.'),
                        cafeRoadAddress: Yup.string().max(255).required('도로명 주소를 입력해 주세요.'),
                        cafeSido: Yup.string().max(255).required('주소 \'시도\'를 입력해 주세요.'),
                        cafeSiGnGu: Yup.string().max(255).required('주소 \'시군구\'를 입력해 주세요.'),
                        cafeEMD: Yup.string().max(255).required('주소 \'읍면동\'을 입력해 주세요.'),
                        cafeLatitude: Yup.string().matches(/^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,15}/, '위도의 형식이 올바르지 않습니다.').max(255).required(' 위도를 입력해 주세요.'),
                        cafeLongitude: Yup.string().matches(/^-?(([-+]?)([\d]{1,3})((\.)(\d+))?)/, '경도의 형식이 올바르지 않습니다.').max(255).required(' 경도를 입력해 주세요.'),
                        openMonHours: Yup.string().matches(/^([01][0-9]|2[0-4]):([0-5][0-9])$/, "00:00 포맷으로 입력해 주세요."),
                        closeMonHours: Yup.string().matches(/^([01][0-9]|2[0-4]):([0-5][0-9])$/, "00:00 포맷으로 입력해 주세요."),
                        openTuesHours: Yup.string().matches(/^([01][0-9]|2[0-4]):([0-5][0-9])$/, "00:00 포맷으로 입력해 주세요."),
                        closeTuesHours: Yup.string().matches(/^([01][0-9]|2[0-4]):([0-5][0-9])$/, "00:00 포맷으로 입력해 주세요."),
                        openWednesHours: Yup.string().matches(/^([01][0-9]|2[0-4]):([0-5][0-9])$/, "00:00 포맷으로 입력해 주세요."),
                        closeWednesHours: Yup.string().matches(/^([01][0-9]|2[0-4]):([0-5][0-9])$/, "00:00 포맷으로 입력해 주세요."),
                        openThursHours: Yup.string().matches(/^([01][0-9]|2[0-4]):([0-5][0-9])$/, "00:00 포맷으로 입력해 주세요."),
                        closeThursHours: Yup.string().matches(/^([01][0-9]|2[0-4]):([0-5][0-9])$/, "00:00 포맷으로 입력해 주세요."),
                        openFriHours: Yup.string().matches(/^([01][0-9]|2[0-4]):([0-5][0-9])$/, "00:00 포맷으로 입력해 주세요."),
                        closeFriHours: Yup.string().matches(/^([01][0-9]|2[0-4]):([0-5][0-9])$/, "00:00 포맷으로 입력해 주세요."),
                        openSaturHours: Yup.string().matches(/^([01][0-9]|2[0-4]):([0-5][0-9])$/, "00:00 포맷으로 입력해 주세요."),
                        closeSaturHours: Yup.string().matches(/^([01][0-9]|2[0-4]):([0-5][0-9])$/, "00:00 포맷으로 입력해 주세요."),
                        openSunHours: Yup.string().matches(/^([01][0-9]|2[0-4]):([0-5][0-9])$/, "00:00 포맷으로 입력해 주세요."),
                        closeSunHours: Yup.string().matches(/^([01][0-9]|2[0-4]):([0-5][0-9])$/, "00:00 포맷으로 입력해 주세요."),
                    })
                }
                onSubmit={(values, actions) => onSubmit(values, actions)}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form
                        onSubmit={handleSubmit}
                        style={{
                            backgroundColor: "#fff",
                            padding: "20px",
                            display: "flex",
                            flexDirection: "column"
                        }}
                    >
                        {/* 정보 입력 */}
                        <CafeForm
                            categoryError={categoryError}
                            setCategoryError={setCategoryError}
                            serviceError={serviceError}
                            setServiceError={setServiceError}
                            values={values}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            touched={touched}
                            errors={errors}
                            type={type}
                        />
                        {/* 메뉴 정보 입력 */}
                        <Grid lg={12} md={12} xs={12} item style={{ margin: "50 0" }}>
                            <>
                                {cafeState.menuGroupList && cafeState.menuGroupList.length > 0 &&
                                    <>
                                        <Grid container>
                                            <Grid lg={12} md={12} xs={12} item>
                                                <Typography color="#616161" variant="h3" style={{ textAlign: "left" }}> 메뉴 정보</Typography>
                                            </Grid>
                                            {cafeState.menuGroupList && cafeState.menuGroupList.map((menuGroup, index) => (
                                                <CafeMenuGroupForm
                                                    key={menuGroup.id + '-' + index}
                                                    isMenuImgUploading={isMenuImgUploading}
                                                    setIsMenuImgUploading={setIsMenuImgUploading}
                                                    index={index}
                                                    type={type}
                                                />
                                            ))}
                                        </Grid>
                                    </>
                                }
                                <div style={{ height: '100%', width: '100%' }}>
                                    <button type="button" onClick={handleClickAddMenuGroup}
                                        style={{
                                            background: "#fff",
                                            height: '100%',
                                            width: '100%',
                                            border: '1px dashed grey',
                                            borderRadius: 5,
                                            padding: 50
                                        }}
                                    >
                                        <Typography color="#4d5cab" variant="h2" style={{ fontWeight: 'bolder', textAlign: "center", backgroundColor: "#fff", marginTop: 5 }}>
                                            {"메뉴 추가"}
                                        </Typography>
                                    </button>
                                </div>
                            </>
                        </Grid>
                        <Button variant={"contained"} className={"signUpButton"} type={"submit"} disabled={isSubmitting}>{isEdit ? "수정" : "정보 등록"}</Button>
                        {!isEmpty(submittedError) && <p className={'error-text'}>{submittedError}</p>}
                    </form>
                )}
            </Formik>
        </>
    );
}

export default memo(CafeEdit);