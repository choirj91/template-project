import React, { useState, useCallback, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import CircularProgress from '@mui/material/CircularProgress';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { isEmpty } from '@utils/string';
import { useTrackedEditStore, useTrackedRegisterStore } from '@zustand/NoticeStore';
import { useNavigate } from 'react-router-dom';

type NoticeFormType = {
    noticeNumber?: number
}

const NoticeForm = (props: NoticeFormType) => {
    const { noticeNumber } = props;
    const navigate = useNavigate();

    const isEdit = !isEmpty(noticeNumber) ? true : false;
    const noticeState = isEdit ? useTrackedEditStore() : useTrackedRegisterStore();

    useEffect(() => {
        return () => {
            noticeState.resetNotice();
        }
    }, []);

    /* 공지 제목 */
    const handleChangeTitle = useCallback((e) => {
        const { target: { value } } = e;
        noticeState.setNoticeTitle(value);
    }, []);

    /* 공지 내용 */
    const handleChangeContents = useCallback((e) => {
        const { target: { value } } = e;
        noticeState.setNoticeContents(value);
    }, []);

    /* 공지 타입 */
    const handleChangeNoticeType = useCallback((event: SelectChangeEvent) => {
        const { target: { value } } = event;
        noticeState.setNoticeType(value);
    }, []);

    /* 저장버튼 */
    const handleClickSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        
        if(!isEmpty(noticeState.noticeTitleError)) return alert(noticeState.noticeTitleError);

        const noticeValue = {
            type: noticeState.noticeType,
            title: noticeState.noticeTitle,
            contents: noticeState.noticeContents
        }

        if (isEdit) {
            if (noticeNumber !== 0 && noticeNumber) {
                const result = noticeState.editSubmit && await noticeState.editSubmit(noticeNumber, noticeValue);
                if (result && result === 'ok') {
                    alert('수정이 완료되었습니다.');
                    return navigate({ pathname: '/app/notices' });
                }
            }
        }
        else {
            const result = noticeState.registerSubmit && await noticeState.registerSubmit(noticeValue);
            if (result && result === 'ok') {
                alert('등록이 완료되었습니다.');
                return navigate({ pathname: '/app/notices' });
            }
        }

    }, [noticeState.noticeContents, noticeState.noticeTitle, noticeState.noticeType, noticeState.noticeTitleError, noticeNumber]);

    return (!isEmpty(noticeNumber) && !noticeState.editCheck ?
        <Grid container direction="column" justifyContent="center" alignItems="center" style={{ height: '95%' }}>
            <CircularProgress />
        </Grid>
        : <Paper sx={{ width: '100%', mb: 2, padding: "20px" }}>
            <Stack justifyContent={"space-between"} alignItems={"center"} direction={"row"} width={"100%"} marginTop={3} marginBottom={4} color={"#4d5cab"} fontWeight={"bolder"}>
                <Typography variant="h2" id="tableTitle" component="div">
                    {!isEmpty(noticeNumber) ? "공지사항 수정" : "공지사항 등록"}
                </Typography>
            </Stack>
            <form onSubmit={handleClickSubmit}>
                <Grid container spacing={3}>
                    <Grid lg={2} md={2} xs={2} item >
                        <FormControl fullWidth>
                            <InputLabel id="notice-type-select-label">공지타입</InputLabel>
                            <Select
                                labelId="notice-type-select-label"
                                id="notice-type-select"
                                value={noticeState.noticeType}
                                label="Notice"
                                size="small"
                                onChange={handleChangeNoticeType}
                            >
                                <MenuItem value={'N'}>공지사항</MenuItem>
                                <MenuItem value={'E'}>이벤트</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item md={10} xs={10}>
                        <TextField
                            label="공지 제목"
                            fullWidth
                            size="small"
                            required
                            name="noticeTitle"
                            id="noticeTitle"
                            type="text"
                            value={noticeState.noticeTitle || ''}
                            onChange={handleChangeTitle}
                            helperText={noticeState.noticeTitleError} 
                            error={!isEmpty(noticeState.noticeTitleError)} 
                            disabled={false}
                        />
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <TextField
                            id="noticeContents"
                            name="noticeContents"
                            label="공지 내용"
                            multiline
                            fullWidth
                            required
                            minRows={20}
                            value={noticeState.noticeContents || ''}
                            onChange={handleChangeContents}
                        // helperText={touched.cafeContents && errors.cafeContents}
                        // error={Boolean(touched.cafeContents && errors.cafeContents)}
                        />
                    </Grid>
                </Grid>
                <Stack alignItems="center" justifyContent="center" sx={{ margin: "30px 0 10px 0" }}>
                    {!isEmpty(noticeState.errorNoticeData) && <p className={'error-text'} style={{ textAlign: 'center' }}>{noticeState.errorNoticeData}</p>}
                    <Button variant="contained" type="submit" size="large">저장</Button>
                </Stack>
            </form>
        </Paper>
    );
}

export default NoticeForm;