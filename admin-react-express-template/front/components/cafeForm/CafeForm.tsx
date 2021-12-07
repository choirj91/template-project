import React, { memo } from 'react';
import { Grid } from '@mui/material';
import { TextField, Typography } from '@mui/material';

import HomeCategorySelectBox from './HomeCategorySelectBox';
import ThemeSelectBox from './ThemeSelectBox';
import ServiceOptionSelectBox from './ServiceOptionSelectBox';
import SmallTextField from '@components/custom/textField/SmallTextField';

// import interface
import { CafeFormProps } from './interface';

const CafeForm = (props: CafeFormProps) => {

    const {
        categoryError,
        setCategoryError,
        serviceError,
        setServiceError,
        values,
        handleChange,
        handleBlur,
        touched,
        errors,
        type
    } = props;

    return (
        <Grid container spacing={1}>
            <Grid lg={12} md={12} xs={12} item>
                <Typography color="#616161" variant="h3" style={{ textAlign: "left" }}>정보</Typography>
            </Grid>
            <Grid item md={3} xs={12}>
                <SmallTextField title="명" required name="cafeTitle" id="cafeTitle" type="text" value={values.cafeTitle || ''} handleChange={handleChange} handleBlur={handleBlur} helperText={touched.cafeTitle && errors.cafeTitle} error={Boolean(touched.cafeTitle && errors.cafeTitle)} disabled={false} />
            </Grid>
            <Grid item md={9} xs={12}>
                <SmallTextField title="한줄소개" name="cafeIntro" id="cafeIntro" type="text" value={values.cafeIntro || ''} handleChange={handleChange} handleBlur={handleBlur} helperText={touched.cafeIntro && errors.cafeIntro} error={Boolean(touched.cafeIntro && errors.cafeIntro)} disabled={false} />
            </Grid>
            <Grid item md={3} xs={12}>
                <SmallTextField title="전화번호" name="cafeTel" id="cafeTel" type="text" value={values.cafeTel || ''} handleChange={handleChange} handleBlur={handleBlur} helperText={touched.cafeTel && errors.cafeTel} error={Boolean(touched.cafeTel && errors.cafeTel)} disabled={false} />
            </Grid>
            <Grid item md={9} xs={12}>
                <ThemeSelectBox type={type}/>
            </Grid>
            <Grid item md={12} xs={12}>
                <HomeCategorySelectBox type={type} categoryError={categoryError} setCategoryError={setCategoryError}/>
            </Grid>
            <Grid item md={12} xs={12}>
                <ServiceOptionSelectBox type={type} serviceError={serviceError} setServiceError={setServiceError}/>
            </Grid>
            <Grid item md={8} xs={12}>
                <TextField
                    id="cafeContents"
                    label="소개"
                    multiline
                    fullWidth
                    maxRows={16}
                    minRows={16}
                    value={values.cafeContents || ''}
                    onChange={handleChange}
                    helperText={touched.cafeContents && errors.cafeContents}
                    error={Boolean(touched.cafeContents && errors.cafeContents)}
                />
            </Grid>
            <Grid item md={4} xs={12} style={{ margin: 0 }}>
                <Grid container spacing={1}>
                    <Grid item md={6} xs={6}>
                        <SmallTextField title="월요일 오픈시간" name="openMonHours" id="openMonHours" type="text" value={values.openMonHours || ''} handleChange={handleChange} handleBlur={handleBlur} helperText={touched.openMonHours && errors.openMonHours} error={Boolean(touched.openMonHours && errors.openMonHours)} disabled={false} />
                        <SmallTextField title="화요일 오픈시간" name="openTuesHours" id="openTuesHours" type="text" value={values.openTuesHours || ''} handleChange={handleChange} handleBlur={handleBlur} helperText={touched.openTuesHours && errors.openTuesHours} error={Boolean(touched.openTuesHours && errors.openTuesHours)} disabled={false} />
                        <SmallTextField title="수요일 오픈시간" name="openWednesHours" id="openWednesHours" type="text" value={values.openWednesHours || ''} handleChange={handleChange} handleBlur={handleBlur} helperText={touched.openWednesHours && errors.openWednesHours} error={Boolean(touched.openWednesHours && errors.openWednesHours)} disabled={false} />
                        <SmallTextField title="목요일 오픈시간" name="openThursHours" id="openThursHours" type="text" value={values.openThursHours || ''} handleChange={handleChange} handleBlur={handleBlur} helperText={touched.openThursHours && errors.openThursHours} error={Boolean(touched.openThursHours && errors.openThursHours)} disabled={false} />
                        <SmallTextField title="금요일 오픈시간" name="openFriHours" id="openFriHours" type="text" value={values.openFriHours || ''} handleChange={handleChange} handleBlur={handleBlur} helperText={touched.openFriHours && errors.openFriHours} error={Boolean(touched.openFriHours && errors.openFriHours)} disabled={false} />
                        <SmallTextField title="토요일 오픈시간" name="openSaturHours" id="openSaturHours" type="text" value={values.openSaturHours || ''} handleChange={handleChange} handleBlur={handleBlur} helperText={touched.openSaturHours && errors.openSaturHours} error={Boolean(touched.openSaturHours && errors.openSaturHours)} disabled={false} />
                        <SmallTextField title="일요일 오픈시간" name="openSunHours" id="openSunHours" type="text" value={values.openSunHours || ''} handleChange={handleChange} handleBlur={handleBlur} helperText={touched.openSunHours && errors.openSunHours} error={Boolean(touched.openSunHours && errors.openSunHours)} disabled={false} />
                    </Grid>
                    <Grid item md={6} xs={6}>
                        <SmallTextField title="월요일 종료시간" name="closeMonHours" id="closeMonHours" type="text" value={values.closeMonHours || ''} handleChange={handleChange} handleBlur={handleBlur} helperText={touched.closeMonHours && errors.closeMonHours} error={Boolean(touched.closeMonHours && errors.closeMonHours)} disabled={false} />
                        <SmallTextField title="화요일 종료시간" name="closeTuesHours" id="closeTuesHours" type="text" value={values.closeTuesHours || ''} handleChange={handleChange} handleBlur={handleBlur} helperText={touched.closeTuesHours && errors.closeTuesHours} error={Boolean(touched.closeTuesHours && errors.closeTuesHours)} disabled={false} />
                        <SmallTextField title="수요일 종료시간" name="closeWednesHours" id="closeWednesHours" type="text" value={values.closeWednesHours || ''} handleChange={handleChange} handleBlur={handleBlur} helperText={touched.closeWednesHours && errors.closeWednesHours} error={Boolean(touched.closeWednesHours && errors.closeWednesHours)} disabled={false} />
                        <SmallTextField title="목요일 종료시간" name="closeThursHours" id="closeThursHours" type="text" value={values.closeThursHours || ''} handleChange={handleChange} handleBlur={handleBlur} helperText={touched.closeThursHours && errors.closeThursHours} error={Boolean(touched.closeThursHours && errors.closeThursHours)} disabled={false} />
                        <SmallTextField title="금요일 종료시간" name="closeFriHours" id="closeFriHours" type="text" value={values.closeFriHours || ''} handleChange={handleChange} handleBlur={handleBlur} helperText={touched.closeFriHours && errors.closeFriHours} error={Boolean(touched.closeFriHours && errors.closeFriHours)} disabled={false} />
                        <SmallTextField title="토요일 종료시간" name="closeSaturHours" id="closeSaturHours" type="text" value={values.closeSaturHours || ''} handleChange={handleChange} handleBlur={handleBlur} helperText={touched.closeSaturHours && errors.closeSaturHours} error={Boolean(touched.closeSaturHours && errors.closeSaturHours)} disabled={false} />
                        <SmallTextField title="일요일 종료시간" name="closeSunHours" id="closeSunHours" type="text" value={values.closeSunHours || ''} handleChange={handleChange} handleBlur={handleBlur} helperText={touched.closeSunHours && errors.closeSunHours} error={Boolean(touched.closeSunHours && errors.closeSunHours)} disabled={false} />
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <SmallTextField title="휴무일" name="cafeOffday" id="cafeOffday" type="text" value={values.cafeOffday || ''} handleChange={handleChange} handleBlur={handleBlur} helperText={touched.cafeOffday && errors.cafeOffday} error={Boolean(touched.cafeOffday && errors.cafeOffday)} disabled={false} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item md={6} xs={12}>
                <SmallTextField title=" 지번주소(구주소)" required name="cafeOldAddress" id="cafeOldAddress" type="text" value={values.cafeOldAddress || ''} handleChange={handleChange} handleBlur={handleBlur} helperText={touched.cafeOldAddress && errors.cafeOldAddress} error={Boolean(touched.cafeOldAddress && errors.cafeOldAddress)} disabled={false} />
            </Grid>
            <Grid item md={6} xs={12}>
                <SmallTextField title=" 도로명주소(신주소)" required name="cafeRoadAddress" id="cafeRoadAddress" type="text" value={values.cafeRoadAddress || ''} handleChange={handleChange} handleBlur={handleBlur} helperText={touched.cafeRoadAddress && errors.cafeRoadAddress} error={Boolean(touched.cafeRoadAddress && errors.cafeRoadAddress)} disabled={false} />
            </Grid>
            <Grid item md={2} xs={4}>
                <SmallTextField title="시도" required name="cafeSido" id="cafeSido" type="text" value={values.cafeSido || ''} handleChange={handleChange} handleBlur={handleBlur} helperText={touched.cafeSido && errors.cafeSido} error={Boolean(touched.cafeSido && errors.cafeSido)} disabled={false} />
            </Grid>
            <Grid item md={2} xs={4}>
                <SmallTextField title="시군구" required name="cafeSiGnGu" id="cafeSiGnGu" type="text" value={values.cafeSiGnGu || ''} handleChange={handleChange} handleBlur={handleBlur} helperText={touched.cafeSiGnGu && errors.cafeSiGnGu} error={Boolean(touched.cafeSiGnGu && errors.cafeSiGnGu)} disabled={false} />
            </Grid>
            <Grid item md={2} xs={4}>
                <SmallTextField title="동읍면" required name="cafeEMD" id="cafeEMD" type="text" value={values.cafeEMD || ''} handleChange={handleChange} handleBlur={handleBlur} helperText={touched.cafeEMD && errors.cafeEMD} error={Boolean(touched.cafeEMD && errors.cafeEMD)} disabled={false} />
            </Grid>
            <Grid item md={3} xs={6}>
                <SmallTextField title=" 경도(longitude) - 123.0000000000" required name="cafeLongitude" id="cafeLongitude" type="text" value={values.cafeLongitude || ''} handleChange={handleChange} handleBlur={handleBlur} helperText={touched.cafeLongitude && errors.cafeLongitude} error={Boolean(touched.cafeLongitude && errors.cafeLongitude)} disabled={false} />
            </Grid>
            <Grid item md={3} xs={6}>
                <SmallTextField title=" 위도(latitude) - 37.3000000000" required name="cafeLatitude" id="cafeLatitude" type="text" value={values.cafeLatitude || ''} handleChange={handleChange} handleBlur={handleBlur} helperText={touched.cafeLatitude && errors.cafeLatitude} error={Boolean(touched.cafeLatitude && errors.cafeLatitude)} disabled={false} />
            </Grid>
        </Grid>
    );
}

export default memo(CafeForm);