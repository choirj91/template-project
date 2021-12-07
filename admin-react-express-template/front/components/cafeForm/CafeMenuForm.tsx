import React, { useState, useCallback, useRef, useEffect, memo } from 'react';
import SmallTextField from '@components/custom/textField/SmallTextField';
import { isEmpty } from '@utils/string';
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Switch from '@mui/material/Switch';
import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import update from 'immutability-helper';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useTrackedFilterStore } from '@zustand/FilterStore';
import { EditCafeStore, RegisterCafeStore} from '@zustand/CafeStore';

// 테이블
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

// interface
import { CafeMenuFormProps } from './interface';

type allMenuFilterListstype = { code_title: string; code: string; group_code: string; group_title: string }[];

const CafeMenuForm = (props: CafeMenuFormProps) => {
    const {
        menuIndex,
        categoryIndex,
        isMenuImgUploading,
        setIsMenuImgUploading,
        type
    } = props;
    const isEdit = type === 'edit' ? true : false;

    const categoryOption = isEdit
        ? EditCafeStore(useCallback(state => state.menuGroupList[categoryIndex].categoryOption, [categoryIndex]))
        : RegisterCafeStore(useCallback(state => state.menuGroupList[categoryIndex].categoryOption, [categoryIndex]));

    const menuItem = isEdit
        ? EditCafeStore(useCallback(state => state.menuGroupList[categoryIndex].menuList[menuIndex], [categoryIndex, menuIndex]))
        : RegisterCafeStore(useCallback(state => state.menuGroupList[categoryIndex].menuList[menuIndex], [categoryIndex, menuIndex]));

    const menuFilter: allMenuFilterListstype = isEdit
        ? EditCafeStore(useCallback(state => state.menuGroupList[categoryIndex].menuList[menuIndex].menuFilter, [categoryIndex, menuIndex]))
        : RegisterCafeStore(useCallback(state => state.menuGroupList[categoryIndex].menuList[menuIndex].menuFilter, [categoryIndex, menuIndex]));

    const setMenuItem = isEdit
        ? EditCafeStore(useCallback(state => state.setMenuItem, []))
        : RegisterCafeStore(useCallback(state => state.setMenuItem, []));

    const setMenuFilter = isEdit
        ? EditCafeStore(useCallback(state => state.setMenuFilter, []))
        : RegisterCafeStore(useCallback(state => state.setMenuFilter, []));

    const removeMenuItem = isEdit
        ? EditCafeStore(useCallback(state => state.removeMenuItem, []))
        : RegisterCafeStore(useCallback(state => state.removeMenuItem, []));

    const filterState = useTrackedFilterStore();
    const allMenuFilterLists: allMenuFilterListstype = filterState.filterLists?.data?.menu_filter_lists;

    /* 메뉴 필터 */
    const handleChangeMenuFilter = useCallback((e, value, menuIndex) => {
        setMenuFilter(value, categoryIndex, menuIndex);
    }, [menuItem, categoryIndex]);

    /* 메뉴 대표 여부 변경 */
    const handleChangeMenuRepYn = useCallback((e, menuIndex) => {
        const { checked } = e.target;

        if (!checked && !isEmpty(menuItem?.repImgInfo)) {
            axios.post('/api/files/remove-image', menuItem?.repImgInfo, { withCredentials: true })
                .then(result => {
                })
                .catch(err => {
                    console.error(err.response?.data?.message);
                });
        }

        const newMenuItem = update(menuItem, {
            repYn: { $set: checked },
            repImgUrl: { $set: null },
            repImgInfo: { $set: null }
        });
        setMenuItem(newMenuItem, categoryIndex, menuIndex);
    }, [menuItem, categoryIndex]);

    /* 메뉴 정보 입력 */
    const handleChangeMenuText = useCallback((e, menuIndex) => {
        const { value, name } = e.target;

        if ((name === 'defaultPrice' || name === 'optionPrice' || name === 'repRank') && /[^0-9]/g.test(value)) return;
        if ((name === 'defaultPrice' || name === 'optionPrice' || name === 'repRank') && value < 0) return;

        if ((name === 'menuOption' && value !== 'hoticed')) {
            if (value === 'default' || value === 'hotonly') {
                const newMenuItem = update(menuItem, {
                    [name]: { $set: value },
                    optionPrice: { $set: null },
                });
                setMenuItem(newMenuItem, categoryIndex, menuIndex);
            }
            else if (value === 'icedonly') {
                const newMenuItem = update(menuItem, {
                    [name]: { $set: value },
                    defaultPrice: { $set: null },
                });
                setMenuItem(newMenuItem, categoryIndex, menuIndex);
            }
        }
        else {
            const newMenuItem = update(menuItem, {
                [name]: { $set: value }
            });
            setMenuItem(newMenuItem, categoryIndex, menuIndex);
        }
    }, [menuItem, categoryIndex]);

    /* 메뉴 아이템 삭제 */
    const handleClickItemDelete = useCallback((e, menuIndex) => {
        removeMenuItem(categoryIndex, menuIndex);
    }, [menuItem, categoryIndex]);

    /* 이미지 업로드 */
    const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>, menuIndex) => {
        const fileList = e.target.files;
        if (!fileList || !fileList[0]) return;
        const formData = new FormData();
        formData.append("image", fileList[0], fileList[0]?.name);

        setIsMenuImgUploading(true);
        axios.post('/api/files/image', formData, { withCredentials: true })
            .then(result => {
                const repImgInfo = result.data?.data[0];
                const newMenuItem = update(menuItem, {
                    repImgUrl: { $set: repImgInfo?.location },
                    repImgInfo: { $set: repImgInfo }
                });
                setMenuItem(newMenuItem, categoryIndex, menuIndex);
                setIsMenuImgUploading(false);
            })
            .catch(err => {
                setIsMenuImgUploading(false);
                alert(err.response?.data?.message);
                console.error(err.response?.data?.message);
            });
    }, [menuItem, categoryIndex]);

    /* Menu Filter AutoComplete*/
    const MenuFilterAutoComplete = useCallback(() => {

        let result = [];
        if (!isEmpty(menuFilter)) {
            for (let i = 0; i < menuFilter.length; i++) {
                const findIndex = allMenuFilterLists.findIndex(v => v.code === menuFilter[i].code && v.code_title === menuFilter[i].code_title);
                if (findIndex !== -1) result.push(allMenuFilterLists[findIndex]);
            }
        }

        return <Autocomplete
            multiple
            id={`menu_filter-outlined-multi-${categoryIndex}-${menuIndex}`}
            size="small"
            options={allMenuFilterLists}
            getOptionLabel={(option) => option.code_title}
            defaultValue={result}
            groupBy={(option) => option.group_title}
            style={{ fontSize: '10px' }}
            onChange={(e, value) => handleChangeMenuFilter(e, value, menuIndex)}
            renderInput={(params) => (
                <TextField {...params} label="필터" placeholder="필터검색" />
            )}
        />
    }, [allMenuFilterLists, menuFilter, menuIndex]);

    return (
        <TableRow hover tabIndex={-1}>
            <TableCell sx={{ width: "80px", padding: "0 5" }} padding="none" align="center">
                <Switch onChange={(e) => handleChangeMenuRepYn(e, menuIndex)} checked={menuItem?.repYn || false} name="repYn" />
            </TableCell>
            <TableCell sx={{ width: "90px", padding: "0 5" }} padding="normal" align="center">
                <SmallTextField disabled={!menuItem?.repYn} title="" name={"repRank"} id={`repRank-${categoryIndex}-${menuIndex}`} type="text" value={menuItem?.repRank || ''} handleChange={(e) => handleChangeMenuText(e, menuIndex)} handleBlur={() => { }} helperText={''} error={false} />
            </TableCell>
            <TableCell sx={{ width: "90px", padding: "0 5" }} padding="normal" align="center">
                <Button disabled={!menuItem?.repYn || isMenuImgUploading} color="primary" component="label" onClick={() => { }} >
                    <input
                        accept="image/*"
                        style={{ display: "none" }}
                        id={`fileInput-${categoryIndex}-${menuIndex}`}
                        name="imageFile"
                        type="file"
                        multiple={false}
                        onChange={e => handleImageChange(e, menuIndex)}
                    />
                    <Avatar
                        src={menuItem?.repYn && menuItem?.repImgUrl || 'https://cdn.pixabay.com/photo/2016/08/21/16/31/emoticon-1610228_960_720.png'}
                        sx={{ height: 50, width: 50, filter: !menuItem?.repYn || isEmpty(menuItem?.repImgUrl) ? "brightness(0.9)" : "none" }}
                        variant="square" />
                </Button>
            </TableCell>
            <TableCell sx={{ width: "150px", padding: "0 5" }} padding="none" align="center">
                <SmallTextField disabled={false} title="" name={"menuTitle"} id={`menuTitle-${categoryIndex}-${menuIndex}`} type="text" value={menuItem?.menuTitle || ''} handleChange={(e) => handleChangeMenuText(e, menuIndex)} handleBlur={() => { }} helperText={''} error={false} />
            </TableCell>
            <TableCell sx={{ width: "80px", padding: "0 5" }} padding="none" align="center">
                <SmallTextField disabled={menuItem?.menuOption === 'icedonly'} title="" name={"defaultPrice"} id={`defaultPrice-${categoryIndex}-${menuIndex}`} type="text" value={menuItem?.defaultPrice === null ? '' : menuItem?.defaultPrice.toString()} handleChange={(e) => handleChangeMenuText(e, menuIndex)} handleBlur={() => { }} helperText={''} error={false} />
            </TableCell>
            <TableCell sx={{ width: "80px", padding: "0 5" }} padding="none" align="center">
                <SmallTextField disabled={menuItem?.menuOption === 'default' || menuItem?.menuOption === 'hotonly'} title="" name={"optionPrice"} id={`optionPrice-${categoryIndex}-${menuIndex}`} type="text" value={menuItem?.optionPrice === null ? '' : menuItem?.optionPrice.toString()} handleChange={(e) => handleChangeMenuText(e, menuIndex)} handleBlur={() => { }} helperText={''} error={false} />
            </TableCell>
            <TableCell sx={{ width: "100px", padding: "0 5" }} padding="none" align="center">
                <FormControl fullWidth>
                    <Select
                        labelId="menu-option-label"
                        id="menu-option-select-box"
                        name="menuOption"
                        value={menuItem?.menuOption || ''}
                        onChange={(e) => handleChangeMenuText(e, menuIndex)}
                        label=""
                        size="small"
                        style={{ fontSize: 12, fontWeight: 'bolder', color: "#828282", height: 37, marginTop: 3 }}
                    >
                        {categoryOption === 'default' && <MenuItem value={'default'}>{'default'}</MenuItem>}
                        {(categoryOption === 'icedonly' || categoryOption === 'hoticed') && <MenuItem value={'icedonly'}>{'icedonly'}</MenuItem>}
                        {(categoryOption === 'hotonly' || categoryOption === 'hoticed') && <MenuItem value={'hotonly'}>{'hotonly'}</MenuItem>}
                        {categoryOption === 'hoticed' && <MenuItem value={'hoticed'}>{'hoticed'}</MenuItem>}
                    </Select>
                </FormControl>
            </TableCell>
            <TableCell sx={{ width: "150px" }} padding="normal" align="center">
                {isEmpty(allMenuFilterLists) ?
                    <CircularProgress />
                    : <MenuFilterAutoComplete />
                }
            </TableCell>
            <TableCell sx={{ width: "60px" }} padding="none" align="center">
                <IconButton color="primary" aria-label="delete" size="small" onClick={(e) => handleClickItemDelete(e, menuIndex)}>
                    <DeleteIcon fontSize="inherit" />
                </IconButton>
            </TableCell>
        </TableRow>
    );
}

export default memo(CafeMenuForm);