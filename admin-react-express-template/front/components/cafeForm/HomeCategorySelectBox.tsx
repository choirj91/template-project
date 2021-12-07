import React, { useState, useCallback, useEffect, useRef, Dispatch, SetStateAction, memo } from 'react';
import SmallTextField from '@components/custom/textField/SmallTextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Grid, Typography } from '@mui/material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { isEmpty } from '@utils/string';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import update from 'immutability-helper';
import { useTrackedFilterStore } from '@zustand/FilterStore';
import { EditCafeStore, RegisterCafeStore } from '@zustand/CafeStore';

type Props = {
    categoryError: string,
    setCategoryError: Dispatch<SetStateAction<string>>,
    type: string,
}

type allCategoryListsTypes = { code_title: string; code: string; }[];


const HomeCategorySelectBox = ({ categoryError, setCategoryError, type }: Props) => {
    const isEdit = type === 'edit' ? true : false;
    const cafeState = isEdit ? EditCafeStore() : RegisterCafeStore();
    const filterState = useTrackedFilterStore();
    const listId = useRef(!isEmpty(cafeState.categoryLists) ? (Math.max(...cafeState.categoryLists.map(v => v.id))) + 1 : 0 );
    const allcategoryLists:allCategoryListsTypes = filterState.filterLists?.data?.home_category_lists;

    /* 홈카테고리 리스트 체크 */
    useEffect(() => {
        if (isEmpty(cafeState.categoryLists)) return setCategoryError('')
        const checkList = cafeState.categoryLists.map(v => v.categoryName);
        const rankList = cafeState.categoryLists.map(v => v.typeRank);

        /* select 체크 */
        const isSelected = (arr: any) => {
            return arr.indexOf('') !== -1;
        }

        /* 중복 체크 */
        const isDuplicate = (arr: any) => {
            const isDup = arr.some(function (x: any) {
                return arr.indexOf(x) !== arr.lastIndexOf(x);
            });
            return isDup;
        }

        if (isSelected(checkList)) return setCategoryError('홈카테고리를 선택해주세요.');
        else if (isDuplicate(checkList)) return setCategoryError('중복 선택된 홈카테고리가 존재합니다.');
        else if (isDuplicate(rankList)) return setCategoryError('순위 설정이 중복된 데이터가 존재합니다.');
        else return setCategoryError('');
    }, [cafeState.categoryLists]);

    /* 홈카테고리 추가 */
    const handleClickAdd = useCallback(() => {

        const checkList = cafeState.categoryLists.map(v => v.typeRank).sort();

        /* 이빨 빠진 숫자 or 최댓값 */
        const maxRank = (arr: any) => {
            let maxNo = 1;
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] === maxNo) maxNo += 1;
            }
            return maxNo;
        }

        cafeState.addCategoryLists(listId.current,  maxRank(checkList));
        listId.current += 1;
    }, [cafeState.categoryLists]);

    /* 홈카테고리 제거 */
    const handleClickDelete = useCallback((e, index) => {

        cafeState.removeCategoryLists(index);
    }, [cafeState.categoryLists]);

    /* 홈카테고리 선택 */
    const handleChange = useCallback((e: SelectChangeEvent, index: number) => {
        const { value } = e.target;
        const codeIndex = allcategoryLists.findIndex(v => v.code_title === value);
        const newCategoryLists = update(cafeState.categoryLists, { [index]: { 
            categoryCode: { $set: allcategoryLists[codeIndex]?.code },
            categoryName: { $set: value}
        } });
        cafeState.setCategoryLists(newCategoryLists);
    }, [cafeState.categoryLists]);

    /* 순위 */
    const handleChangeRank = useCallback((e, index: number, prevRank) => {
        const { value } = e.target;
        if( isEmpty(value) || /[^0-9]/g.test(value)) return;
        let nextRank = value;

        const numCheck = cafeState.categoryLists.findIndex( v => v.typeRank === parseInt(nextRank));
        if(numCheck !== -1) {
            const newCategoryLists = update(cafeState.categoryLists, { 
                [numCheck]: { typeRank: { $set: parseInt(prevRank) } },
                [index]: { typeRank: { $set: parseInt(nextRank) } }
             });
            cafeState.setCategoryLists(newCategoryLists);
        }
        else {
            const newCategoryLists = update(cafeState.categoryLists, { [index]: { typeRank: { $set: parseInt(nextRank) } } });
            cafeState.setCategoryLists(newCategoryLists);
        }


    }, [cafeState.categoryLists]);

    /* 표시 체크 */
    const handleChangeDisplay = useCallback((e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { checked } = e.target;

        const newCategoryLists = update(cafeState.categoryLists, { [index]: { displayYn: { $set: checked } } });
        cafeState.setCategoryLists(newCategoryLists);
    }, [cafeState.categoryLists]);

    return (
        <Grid container spacing={0} style={{ border: "1px solid #BDBDBD", color: "#BDBDBD", borderRadius: 5, padding: 10, marginTop: 30 }}>
            <Typography color="#616161" variant="h6" style={{ padding: "0 10 0 10", fontWeight: 'bolder', textAlign: "left", marginTop: -20, backgroundColor: "#fff" }}> 홈카테고리</Typography>
            <Grid container spacing={0} style={{ padding: 0 }}>
                <Grid lg={6} md={6} xs={6} item style={{ justifyContent: "start", alignItems: "center", display: "flex" }}>
                    {isEmpty(categoryError) ?
                        <Typography color="#616161" variant="h6" style={{ textAlign: "start", fontWeight: 'bolder', marginLeft: 10 }}>추가버튼을 눌러  홈카테고리를 선택해주세요.</Typography>
                        : <p className={'error-text'}>{categoryError}</p>}
                </Grid>
                <Grid lg={6} md={6} xs={6} item >
                <Grid container direction="row" justifyContent="flex-end" alignItems="center">
                    <Stack direction="row" spacing={0} style={{ padding: 0, justifyContent: "end" }}>
                        <Button variant="contained" size="large" endIcon={<AddCircleRoundedIcon />} onClick={handleClickAdd}>
                            추가
                        </Button>
                    </Stack>
                    </Grid>
                </Grid>
                {cafeState.categoryLists && cafeState.categoryLists.map((v, index) => (
                    <Grid container spacing={1} key={index + '-' + v.categoryName}
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Grid lg={1} md={1} xs={2} item >
                            <SmallTextField disabled={false} title="순위" name="typeRank" id={`typeRank-${v.id}`} type="number" value={v.typeRank || 0} handleChange={e => handleChangeRank(e, index, v.typeRank)} handleBlur={() => { }} helperText={''} error={false} />
                        </Grid>
                        <Grid lg={8} md={8} xs={5} item >
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label" style={{ fontSize: 13, fontWeight: 'bolder', color: "#4d5cab" }}>홈카테고리</InputLabel>
                                <Select
                                    labelId="service-label"
                                    id="service-select-box"
                                    value={v.categoryName || ''}
                                    onChange={(e) => handleChange(e, index)}
                                    label="홈카테고리"
                                    size="small"
                                    style={{ fontSize: 12, fontWeight: 'bolder', color: "#828282", height: 37, marginTop: 3 }}
                                >
                                    {allcategoryLists && allcategoryLists.map((obj: { code_title: string; code: string; }) => {

                                        /* 선택된 항목 체크 및 제거 */
                                        const isSelectedService = (categoryName: string) => {
                                            const checkList = cafeState.categoryLists.filter(data => data.id !== v.id);
                                            const checkNameList = checkList.map(v => v.categoryName);
                                            return checkNameList.some(x => {
                                                return x === categoryName;
                                            });
                                        }

                                        if (isSelectedService(obj.code_title)) return null;
                                        else return (
                                            <MenuItem key={obj.code} value={obj.code_title}>{obj.code_title}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid lg={2} md={2} xs={3} item>
                            <Grid container direction="row" justifyContent="center" alignItems="center">
                                <FormControlLabel control={<Switch onChange={(e) => handleChangeDisplay(e, index)} checked={v.displayYn} name="displayYn" />} label="표시" style={{ fontSize: 10, fontWeight: 'bolder', color: '#4d5cab' }} />
                            </Grid>
                        </Grid>
                        <Grid lg={1} md={1} xs={2} item>
                            <Stack direction="row" spacing={0}>
                                <IconButton color="primary" aria-label="delete" size="large" onClick={e => handleClickDelete(e, index)}>
                                    <DeleteIcon fontSize="inherit" />
                                </IconButton>
                            </Stack>
                        </Grid>
                    </Grid>
                ))}

            </Grid>
        </Grid>
    );
}


export default memo(HomeCategorySelectBox);