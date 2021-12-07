import React, { useCallback, useState } from 'react';
import { magazineEditStore, magazineRegisterStore } from '@zustand/MagazineStore';
import { useTrackedEditStore, useTrackedRegisterStore } from '@zustand/MagazineStore';
import ContentsImageSlider from './ContentsImageSlider';

// import material
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { styled as materialStyled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import styled from 'styled-components';
import { isEmpty } from '@utils/string';
import axios from 'axios';

const SmallTextField = materialStyled(TextField)({
    '& .MuiInputLabel-root': {
        fontSize: 13,
    },
    '& .MuiInputBase-input': {
        fontSize: 13,
    },
});


type PropsTypes = {
    isEdit: boolean;
    index: number;
}

const CustomInputBox = styled.input`
height: 24px;
width: 80px;
border: 1px solid #4d5cab;
border-radius: 30px;
background-color: #fff;
color: #4d5cab;
font-size: 11px;
&:focus {
    outline: none;
  }
`;

const ContentsForm = ({ isEdit, index }: PropsTypes) => {
    const [addTagTitle, setAddTagTitle] = useState('');
    const content = isEdit
        ? magazineEditStore(useCallback(state => state.magazine.magazine_contents[index], []))
        : magazineRegisterStore(useCallback(state => state.magazine.magazine_contents[index], []));

    const magazineStore = isEdit ? useTrackedEditStore() : useTrackedRegisterStore();
    const [cafeNumber, setCafeNumber] = useState(content.cafe?.cafe_number || '');


    /* 태그 삭제 */
    const handleClickChipDelete = useCallback((e, id) => {
        magazineStore.removeContentsTag(index, id);
    }, [index]);

    /* 태그 추가 텍스트 작성 */
    const handleChangeChipText = useCallback((e) => {
        const { target: { value } } = e;
        setAddTagTitle(value);
    }, []);

    /* 태그 추가 버튼 클릭 */
    const handleClickAddChip = useCallback((e) => {
        if (content.contents_tags.length >= 3) return alert('태그는 최대 3개까지 입력 가능합니다.');
        if (!isEmpty(addTagTitle)) {
            if(addTagTitle.length >= 50) return alert('50자를 넘을 수 없습니다.');

            // 중복 검사
            for (let i = 0; i < content.contents_tags.length; i++) {
                const tagName = content.contents_tags[i].tag_name;
                if(tagName === addTagTitle) return alert('이미 등록된 태그입니다.');
            }
            magazineStore.addContentsTag(index, addTagTitle);
            setAddTagTitle('');
        }
    }, [addTagTitle, index, content]);

    /* 태그 전체 삭제 버튼 클릭 */
    const handleClickAllDeleteChip = useCallback(() => {
        magazineStore.removeAllContentsTag(index);
    }, [index]);

    /* 제목 및 내용 */
    const handleChangeText = useCallback((e) => {
        const { target: { name, value } } = e;

        if(name === 'contents_title' || name === 'contents_subtitle') {
            if(value.length >= 200) return alert('200자를 넘을 수 없습니다.');
        }

        magazineStore.setContentsValue(index, name, value);
    }, [index]);

    /* 정보 적용 */
    const handleClickCafeApply = useCallback((e) => {

        axios.get(`/api/cafes/${cafeNumber}/name`, { withCredentials: true })
            .then(result => {
                const cafeInfo: {
                    cafe_address: string;
                    cafe_number: number;
                    cafe_title: string;
                    profile_img_url: string;
                } = result.data?.data;
                magazineStore.setContentsCafe(index, cafeInfo);
            })
            .catch(err => {
                alert(err.response?.data?.message);
            });
    }, [index, cafeNumber]);

    /* 정보 삭제 */
    const handleClickRemoveCafe = useCallback((e) => {
        magazineStore.removeContentsCafe(index);
        setCafeNumber('');
    }, [index]);

    /*  번호 입력*/
    const handleChangeCafeNumber = useCallback((e) => {
        const { target: { value } } = e;
        // 숫자만 입력
        setCafeNumber(value.replace(/[^0-9]/g, ''));
    }, []);

    /*  컨텐츠 삭제 */
    const handleClickRemoveContent = useCallback((e, index) => {
        magazineStore.removeContent(index);
    }, []);

    return (
        <Stack flexDirection="column" width={'100%'} padding={'10px'} >
            <Stack flexDirection="column" alignItems="center" width={'100%'} position="relative" padding={'20px'} border="1px solid #f5d6bc" borderRadius={5}>
                <span style={{ position: "absolute", top: 0, padding: "0 15px", backgroundColor: "#fff", color: "#4d5cab", marginTop: "-15px", fontSize: "20px" }}>{index + 1}</span>
                {/* 태그 */}
                <Stack flexDirection="row" justifyContent="space-between" width={'100%'}>
                    <Stack flexDirection="row" alignItems="center">
                        {content?.contents_tags?.map((tag, index) => {
                            return (
                                <Chip
                                    key={`tags-${index}-${tag.id}`}
                                    label={tag.tag_name}
                                    variant="outlined"
                                    color="warning"
                                    size="small"
                                    sx={{ fontSize: 12, marginRight: "5px" }}
                                    onDelete={(e) => handleClickChipDelete(e, index)} />
                            )
                        })}
                    </Stack>
                    <Stack flexDirection="row">
                        <CustomInputBox placeholder="태그추가" onChange={handleChangeChipText} value={addTagTitle || ''} />
                        <IconButton color="primary" aria-label="addTags" component="span" onClick={handleClickAddChip}>
                            <AddCircleIcon color="primary" />
                        </IconButton>
                        <IconButton color="primary" aria-label="deleteTags" component="span" onClick={handleClickAllDeleteChip}>
                            <AddCircleIcon color="primary" style={{transform: "rotateZ(45deg)"}}/>
                        </IconButton>
                    </Stack>
                </Stack>
                {/* 제목 및 내용 */}
                <Grid container sx={{ width: "100%", marginTop: "2px" }} spacing={2}>
                    <Grid item xs={12} sm={12} md={12}>
                        <SmallTextField
                            label=" 설명"
                            fullWidth
                            size="small"
                            required
                            name="contents_subtitle"
                            id="contents_subtitle"
                            type="text"
                            value={content.contents_subtitle || ''}
                            onChange={handleChangeText}
                            // helperText={magazineStore.magazine.noticeTitleError}
                            // error={!isEmpty(magazineStore.magazine.noticeTitleError)}
                            disabled={false}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <SmallTextField
                            label="명"
                            fullWidth
                            size="small"
                            required
                            name="contents_title"
                            id="contents_title"
                            type="text"
                            value={content.contents_title || ''}
                            onChange={handleChangeText}
                            // helperText={magazineStore.magazine.noticeTitleError}
                            // error={!isEmpty(magazineStore.magazine.noticeTitleError)}
                            disabled={false}
                        />
                    </Grid>
                    {/* 이미지들 */}
                    <Grid item xs={12} sm={12} md={12} style={{ marginBottom: 50 }}>
                        <ContentsImageSlider
                            imageLists={content.contents_images}
                            contentsIndex={index}
                            isEdit={isEdit}
                        />
                    </Grid>
                    {/* 정보 */}
                    <Grid item xs={12} sm={12} md={12}>
                        <SmallTextField
                            label=" 상세 설명"
                            fullWidth
                            size="small"
                            required
                            multiline
                            minRows={5}
                            name="contents_text"
                            id="contents_text"
                            type="text"
                            value={content.contents_text || ''}
                            onChange={handleChangeText}
                            // helperText={magazineStore.magazine.noticeTitleError}
                            // error={!isEmpty(magazineStore.magazine.noticeTitleError)}
                            disabled={false}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <Stack direction="row" justifyContent="space-between">
                            <Stack direction="row" alignItems="flex-start">
                                <Avatar src={content.cafe?.profile_img_url} sx={{ mr: 1 }}>
                                    {content.cafe?.cafe_title}
                                </Avatar>
                                <Stack direction="column" alignItems="flex-start" style={{ fontSize: 13 }}>
                                    <p>{content.cafe?.cafe_title}</p>
                                    <p>{content.cafe?.cafe_address}</p>
                                </Stack>
                            </Stack>
                            <Stack direction="row" alignItems="center">
                                <SmallTextField
                                    label="번호"
                                    style={{ width: "100px" }}
                                    size="small"
                                    name="contents_text"
                                    id="contents_text"
                                    type="text"
                                    value={cafeNumber}
                                    onChange={handleChangeCafeNumber}
                                    // helperText={magazineStore.magazine.noticeTitleError}
                                    // error={!isEmpty(magazineStore.magazine.noticeTitleError)}
                                    disabled={false}
                                />
                                <IconButton color="primary" aria-label="addTags" component="span" onClick={handleClickCafeApply}>
                                    <CheckIcon color="primary" />
                                </IconButton>
                                <IconButton color="primary" aria-label="addTags" component="span" onClick={handleClickRemoveCafe}>
                                    <CloseIcon color="primary" />
                                </IconButton>
                            </Stack>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <Stack flexDirection="row" justifyContent="end" alignItems="center">
                        <Button variant="contained" size={"small"} onClick={(e) => handleClickRemoveContent(e, index)}>콘텐츠 삭제</Button>
            </Stack>
                    </Grid>
                </Grid>
            </Stack>
        </Stack>
    );
}

export default ContentsForm;