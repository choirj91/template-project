import React, { useCallback, useEffect, useRef, Dispatch, SetStateAction, memo } from 'react';
import SmallTextField from '@components/custom/textField/SmallTextField';
import Button from '@mui/material/Button';
import { Grid, Typography } from '@mui/material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { isEmpty } from '@utils/string';
import { useTrackedFilterStore } from '@zustand/FilterStore';
import { EditCafeStore, RegisterCafeStore } from '@zustand/CafeStore';


type Props = {
    isEdit: boolean;
    index: number;
    checkServiceNameList: string[];
}

type allServiceListsTypes = { code_title: string; code: string; }[];

const ServiceForm = ({ isEdit, index, checkServiceNameList }: Props) => {
    const removeService = isEdit ? EditCafeStore(state => state.removeService) : RegisterCafeStore(state => state.removeService);
    const setServiceName = isEdit ? EditCafeStore(state => state.setServiceName) : RegisterCafeStore(state => state.setServiceName);
    const setServiceValue = isEdit ? EditCafeStore(state => state.setServiceValue) : RegisterCafeStore(state => state.setServiceValue);
    const filterState = useTrackedFilterStore();
    const allServiceLists: allServiceListsTypes = filterState.filterLists?.data?.service_lists;
    const service = isEdit ? EditCafeStore(state => state.serviceLists[index]) : RegisterCafeStore(state => state.serviceLists[index]);

    /* 서비스 제거 */
    const handleClickDelete = useCallback((e, index) => {
        removeService(index);
    }, []);

    /* 서비스 선택 */
    const handleChangeServiceName = useCallback((e: SelectChangeEvent, index: number) => {
        const { target: { value } } = e;

        const codeIndex = allServiceLists.findIndex(v => v.code_title === e.target.value);
        const code = allServiceLists[codeIndex]?.code;

        setServiceName(index, value, code);
    }, [allServiceLists]);

    /* 서비스 옵션 내용 작성 */
    const handleChangeContents = useCallback((e: SelectChangeEvent, index: number) => {
        const { target: { value, name } } = e;

        setServiceValue(index, name, value);
    }, []);

    return (
        <Grid container spacing={1} key={index + '-' + service.serviceName}
            direction="row"
            justifyContent="center"
            alignItems="center"
        >
            <Grid lg={2} md={2} xs={2} item >
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label" style={{ fontSize: 13, fontWeight: 'bolder', color: "#4d5cab" }}>서비스</InputLabel>
                    <Select
                        labelId="service-label"
                        id="service-select-box"
                        value={service.serviceName || ''}
                        onChange={(e) => handleChangeServiceName(e, index)}
                        label="서비스"
                        size="small"
                        style={{ fontSize: 12, fontWeight: 'bolder', color: "#828282", height: 37, marginTop: 3 }}
                    >
                        {allServiceLists && allServiceLists.map((obj: { code_title: string; code: string; }) => {
                            /* 선택된 항목 체크 및 제거 */
                            const isSelectedService = (serviceName: string) => {

                                const checkList = checkServiceNameList.filter(name => name !== service.serviceName);
                                return checkList.some(x => {
                                    return x === serviceName;
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
            <Grid lg={9} md={9} xs={9} item>
                <SmallTextField disabled={false} title="서비스 옵션 내용" name="serviceContents" id={`serviceContents-${service.id}`} type="text" value={service.serviceContents || ''} handleChange={e => handleChangeContents(e, index)} handleBlur={() => { }} helperText={''} error={false} />
            </Grid>
            <Grid lg={1} md={1} xs={1} item>
                <Stack direction="row" spacing={0}>
                    <IconButton color="primary" aria-label="delete" size="large" onClick={e => handleClickDelete(e, index)}>
                        <DeleteIcon fontSize="inherit" />
                    </IconButton>
                </Stack>
            </Grid>
        </Grid>
    )
}

export default memo(ServiceForm, (prev, next) => {
    const prevValue = prev.checkServiceNameList.join();
    const nextValue = next.checkServiceNameList.join();
    if (prevValue != nextValue || prev.index != next.index || prev.isEdit != next.isEdit) return false;
    else return true;
});