import React, { useState, useCallback, useEffect, memo } from 'react';
import update from 'immutability-helper';
import _ from 'lodash';

// import component
import CafeMenuForm from './CafeMenuForm';
import SmallTextField from '@components/custom/textField/SmallTextField';

// import material Style
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { isEmpty } from '@utils/string';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
// 테이블
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

// zustand
import { EditCafeStore } from '@zustand/CafeStore';
import { RegisterCafeStore } from '@zustand/CafeStore';

// interface
import { CafeMenuGroupFormProps } from './interface';

import shallow from 'zustand/shallow';

const CafeMenuGroupForm = (props: CafeMenuGroupFormProps) => {
    const {
        index,
        isMenuImgUploading,
        setIsMenuImgUploading,
        type,
    } = props;

    const isEdit = type === 'edit' ? true : false;
    const [menuCategoryCheck, setMenuCategoryCheck] = useState('');

    const categoryLists = isEdit
        ? EditCafeStore(useCallback(state => state.categoryLists, []))
        : RegisterCafeStore(useCallback(state => state.categoryLists, []));

    const menuGroup = isEdit
        ? EditCafeStore(useCallback(state => state.menuGroupList[index], [index]))
        : RegisterCafeStore(useCallback(state => state.menuGroupList[index], [index]));

    const menuItemList = isEdit
        ? EditCafeStore(useCallback(state => state.menuGroupList[index].menuList, [index]))
        : RegisterCafeStore(useCallback(state => state.menuGroupList[index].menuList, [index]));

    const { setMenuGroupValue, setMenuItemList, addMenuItem, removeMenuGroup } = isEdit
        ? EditCafeStore(state => ({
            setMenuGroupValue: state.setMenuGroupValue,
            setMenuItemList: state.setMenuItemList,
            addMenuItem: state.addMenuItem,
            removeMenuGroup: state.removeMenuGroup,
        }), shallow)
        : RegisterCafeStore(state => ({
            setMenuGroupValue: state.setMenuGroupValue,
            setMenuItemList: state.setMenuItemList,
            addMenuItem: state.addMenuItem,
            removeMenuGroup: state.removeMenuGroup,
        }), shallow);




    useEffect(() => {
        setMenuCategoryCheck('');
        const cafeHomcategoryList = categoryLists?.map(v => v.categoryName);
        const menuFilterList = menuItemList?.map(v => v.menuFilter);
        const menuFilterGroupNameList = menuFilterList?.map(v => {
            return v?.map(item => item.group_title);
        });
        let concatList: string[] = [];
        for (let i = 0; i < menuFilterGroupNameList.length; i++) {
            if (!isEmpty(menuFilterGroupNameList[i])) {
                concatList = menuFilterGroupNameList[i]?.concat(concatList);
            }
        }
        concatList = _.uniq(concatList);
        const result = concatList.filter(item => {
            return !cafeHomcategoryList.find(o => o === item);
        });
        if (!isEmpty(result)) {
            setMenuCategoryCheck('홈 카테고리의 ' + result.join() + ' 설정 값이 없습니다.');
        }
    }, [categoryLists, menuItemList]);

    /* 메뉴 카테고리명 입력 */
    const handleChangeCategoryTitle = useCallback((e) => {
        const { target: { value } } = e;
        setMenuGroupValue('categoryTitle', value.toUpperCase(), index);
    }, [index]);

    /* 메뉴 카테고리 옵션 */
    const handleChangeCategoryOption = useCallback((e) => {
        const { target: { value } } = e;
        let newMenuItemList = menuItemList.slice();
        for (let j = 0; j < menuItemList?.length; j++) {

            let changeValue: any = {
                menuOption: { $set: value }
            }

            if (value === 'default') changeValue.optionPrice = { $set: null };
            else if (value === 'icedonly') changeValue.defaultPrice = { $set: null };
            else if (value === 'hotonly') changeValue.optionPrice = { $set: null };

            newMenuItemList = update(newMenuItemList, {
                [j]: changeValue
            });
        }
        setMenuGroupValue('categoryOption', value, index);
        setMenuItemList(newMenuItemList, index);
    }, [index, menuItemList]);

    /* 메뉴 아이템 추가 */
    const handleClickAddMenuItem = useCallback((e) => {
        const newMenuItem = {
            repYn: false,
            repRank: null,
            repImgUrl: null,
            repImgInfo: {},
            menuTitle: '',
            defaultPrice: null,
            optionPrice: null,
            menuOption: menuGroup?.categoryOption,
            menuFilter: [],
            menuNumber: -1
        };
        addMenuItem(newMenuItem, index);
    }, [index, menuGroup]);

    return (
        <Grid style={{ border: "1px solid #BDBDBD", color: "#BDBDBD", borderRadius: 5, padding: 10, margin: "15 0", width: "100%" }}>
            <Typography color="#616161" variant="h6" style={{ width: "90px", padding: "0 10 0 10", fontWeight: 'bolder', textAlign: "center", marginTop: -20, backgroundColor: "#fff" }}>메뉴-{index}</Typography>
            <Grid container direction="row" justifyContent="center" alignItems="center">
                <Grid lg={3} md={3} xs={4} item sx={{ padding: '0 5' }}>
                    <SmallTextField
                        disabled={false}
                        title="메뉴 카테고리명"
                        name={"menuCategoryTitle"}
                        id={`menuCategoryTitle-${index}`}
                        type="text"
                        value={menuGroup?.categoryTitle || ''}
                        handleChange={handleChangeCategoryTitle}
                        handleBlur={() => { }}
                        helperText={''}
                        error={false} />
                </Grid>
                <Grid lg={3} md={3} xs={4} item sx={{ padding: '0 5' }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label" style={{ fontSize: 13, fontWeight: 'bolder', color: "#4d5cab" }}>카테고리 옵션</InputLabel>
                        <Select
                            labelId="menu-category-option-label"
                            id="menu-category-option-select-box"
                            value={menuGroup?.categoryOption || ''}
                            onChange={handleChangeCategoryOption}
                            label="카테고리 옵션"
                            size="small"
                            style={{ fontSize: 12, fontWeight: 'bolder', color: "#828282", height: 37, marginTop: 3 }}
                        >
                            <MenuItem value={'default'}>{'default'}</MenuItem>
                            <MenuItem value={'icedonly'}>{'icedonly'}</MenuItem>
                            <MenuItem value={'hotonly'}>{'hotonly'}</MenuItem>
                            <MenuItem value={'hoticed'}>{'hoticed'}</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid lg={6} md={6} xs={4} item>
                    <Stack direction="row" justifyContent="flex-start" spacing={0}>
                        <IconButton color="primary" aria-label="delete" size="large" onClick={(e) => removeMenuGroup(index)}>
                            <DeleteIcon fontSize="inherit" />
                        </IconButton>
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'red' }}>
                            <span>{menuCategoryCheck}</span>
                        </div>
                    </Stack>
                </Grid>
            </Grid>
            {!isEmpty(menuItemList) &&
                <Grid container direction="row" justifyContent="center" alignItems="center" style={{ marginTop: 20 }}>
                    <TableContainer>
                        <Table sx={{ minWidth: 750, width: '100%' }} aria-labelledby="tableTitle" size={'small'}>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ width: "80px" }} padding="none" align="center">대표 여부</TableCell>
                                    <TableCell sx={{ width: "90px" }} padding="none" align="center">대표 순위</TableCell>
                                    <TableCell sx={{ width: "90px" }} padding="none" align="center">사진</TableCell>
                                    <TableCell padding='none' align='center'>메뉴명</TableCell>
                                    <TableCell sx={{ width: "80px" }} padding='none' align='center'>기본 가격</TableCell>
                                    <TableCell sx={{ width: "80px" }} padding='none' align='center'>옵션 가격</TableCell>
                                    <TableCell sx={{ width: "100px" }} padding='none' align='center'>옵션</TableCell>
                                    <TableCell sx={{ width: "150px" }} padding='none' align='center'>메뉴 필터</TableCell>
                                    <TableCell sx={{ width: "60px" }} padding='none' align='center'>삭제</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {menuItemList && menuItemList?.map((row, menuIndex) => {
                                    return <CafeMenuForm
                                        key={index + '-' + menuIndex}
                                        menuIndex={menuIndex}
                                        categoryIndex={index}
                                        isMenuImgUploading={isMenuImgUploading}
                                        setIsMenuImgUploading={setIsMenuImgUploading}
                                        type={type}
                                    />
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>}
            <Stack flexDirection="row" justifyContent="flex-end">
                <IconButton color="primary" aria-label="delete" size="large" onClick={handleClickAddMenuItem}>
                    <PlaylistAddIcon fontSize="inherit" />
                </IconButton>
            </Stack>
        </Grid>
    );
}

export default memo(CafeMenuGroupForm);