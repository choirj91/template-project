import React, { useCallback, useEffect, useRef, Dispatch, SetStateAction, memo } from 'react';
import SmallTextField from '@components/custom/textField/SmallTextField';
import Button from '@mui/material/Button';
import { Grid, Typography } from '@mui/material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ServiceForm from './ServiceForm';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { isEmpty } from '@utils/string';
import { useTrackedFilterStore } from '@zustand/FilterStore';
import { EditCafeStore } from '@zustand/CafeStore';
import { RegisterCafeStore } from '@zustand/CafeStore';
import _ from 'lodash';



type Props = {
    serviceError: string;
    setServiceError: Dispatch<SetStateAction<string>>;
    type: string;
}


const ServiceOptionSelectBox = ({ serviceError, setServiceError, type }: Props) => {
    const isEdit = type === 'edit' ? true : false;
    const cafeState = isEdit ? EditCafeStore() : RegisterCafeStore();
    const listId = useRef(isEmpty(cafeState.serviceLists) ? 0 : (Math.max(...cafeState.serviceLists.map(v => v.id))) + 1);

    /* 서비스 리스트 체크 */
    useEffect(() => {
        if (isEmpty(cafeState.serviceLists)) return setServiceError('')
        const checkList = cafeState.serviceLists.map(v => v.serviceName);

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

        if (isSelected(checkList)) return setServiceError('서비스를 선택해주세요.');
        else if (isDuplicate(checkList)) return setServiceError('중복 선택된 서비스가 존재합니다.');
        else return setServiceError('');
    }, [cafeState.serviceLists]);

    /* 서비스 추가 */
    const handleClickAdd = useCallback(() => {
        cafeState.addServiceLists(listId.current);
        listId.current += 1;
    }, []);

    return (
        <Grid container spacing={0} style={{ border: "1px solid #BDBDBD", color: "#BDBDBD", borderRadius: 5, padding: 10, marginTop: 30 }}>
            <Typography color="#616161" variant="h6" style={{ padding: "0 10 0 10", fontWeight: 'bolder', textAlign: "left", marginTop: -20, backgroundColor: "#fff" }}>서비스 및 옵션</Typography>
            <Grid container spacing={0} style={{ padding: 0 }}>
                <Grid lg={6} md={6} xs={6} item style={{ justifyContent: "start", alignItems: "center", display: "flex" }}>
                    {isEmpty(serviceError) ?
                        <Typography color="#616161" variant="h6" style={{ textAlign: "start", fontWeight: 'bolder', marginLeft: 10 }}>추가버튼을 눌러 서비스 및 옵션을 선택해주세요.</Typography>
                        : <p className={'error-text'}>{serviceError}</p>}
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
                {cafeState.serviceLists && cafeState.serviceLists.map((v, index) => {
                    let checkServiceNameList = cafeState.serviceLists.map(item => item.serviceName);
                    checkServiceNameList = _.uniq(checkServiceNameList);
                    return (
                    <ServiceForm key={`service-form-${index}`} index={index} isEdit={isEdit} checkServiceNameList={checkServiceNameList}/>
                )})}
            </Grid>
        </Grid>
    );
}


export default memo(ServiceOptionSelectBox);