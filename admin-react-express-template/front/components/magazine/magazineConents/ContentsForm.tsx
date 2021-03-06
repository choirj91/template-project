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


    /* ํ๊ทธ ์ญ์  */
    const handleClickChipDelete = useCallback((e, id) => {
        magazineStore.removeContentsTag(index, id);
    }, [index]);

    /* ํ๊ทธ ์ถ๊ฐ ํ์คํธ ์์ฑ */
    const handleChangeChipText = useCallback((e) => {
        const { target: { value } } = e;
        setAddTagTitle(value);
    }, []);

    /* ํ๊ทธ ์ถ๊ฐ ๋ฒํผ ํด๋ฆญ */
    const handleClickAddChip = useCallback((e) => {
        if (content.contents_tags.length >= 3) return alert('ํ๊ทธ๋ ์ต๋ 3๊ฐ๊น์ง ์๋ ฅ ๊ฐ๋ฅํฉ๋๋ค.');
        if (!isEmpty(addTagTitle)) {
            if(addTagTitle.length >= 50) return alert('50์๋ฅผ ๋์ ์ ์์ต๋๋ค.');

            // ์ค๋ณต ๊ฒ์ฌ
            for (let i = 0; i < content.contents_tags.length; i++) {
                const tagName = content.contents_tags[i].tag_name;
                if(tagName === addTagTitle) return alert('์ด๋ฏธ ๋ฑ๋ก๋ ํ๊ทธ์๋๋ค.');
            }
            magazineStore.addContentsTag(index, addTagTitle);
            setAddTagTitle('');
        }
    }, [addTagTitle, index, content]);

    /* ํ๊ทธ ์ ์ฒด ์ญ์  ๋ฒํผ ํด๋ฆญ */
    const handleClickAllDeleteChip = useCallback(() => {
        magazineStore.removeAllContentsTag(index);
    }, [index]);

    /* ์ ๋ชฉ ๋ฐ ๋ด์ฉ */
    const handleChangeText = useCallback((e) => {
        const { target: { name, value } } = e;

        if(name === 'contents_title' || name === 'contents_subtitle') {
            if(value.length >= 200) return alert('200์๋ฅผ ๋์ ์ ์์ต๋๋ค.');
        }

        magazineStore.setContentsValue(index, name, value);
    }, [index]);

    /* ์ ๋ณด ์ ์ฉ */
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

    /* ์ ๋ณด ์ญ์  */
    const handleClickRemoveCafe = useCallback((e) => {
        magazineStore.removeContentsCafe(index);
        setCafeNumber('');
    }, [index]);

    /*  ๋ฒํธ ์๋ ฅ*/
    const handleChangeCafeNumber = useCallback((e) => {
        const { target: { value } } = e;
        // ์ซ์๋ง ์๋ ฅ
        setCafeNumber(value.replace(/[^0-9]/g, ''));
    }, []);

    /*  ์ปจํ์ธ  ์ญ์  */
    const handleClickRemoveContent = useCallback((e, index) => {
        magazineStore.removeContent(index);
    }, []);

    return (
        <Stack flexDirection="column" width={'100%'} padding={'10px'} >
            <Stack flexDirection="column" alignItems="center" width={'100%'} position="relative" padding={'20px'} border="1px solid #f5d6bc" borderRadius={5}>
                <span style={{ position: "absolute", top: 0, padding: "0 15px", backgroundColor: "#fff", color: "#4d5cab", marginTop: "-15px", fontSize: "20px" }}>{index + 1}</span>
                {/* ํ๊ทธ */}
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
                        <CustomInputBox placeholder="ํ๊ทธ์ถ๊ฐ" onChange={handleChangeChipText} value={addTagTitle || ''} />
                        <IconButton color="primary" aria-label="addTags" component="span" onClick={handleClickAddChip}>
                            <AddCircleIcon color="primary" />
                        </IconButton>
                        <IconButton color="primary" aria-label="deleteTags" component="span" onClick={handleClickAllDeleteChip}>
                            <AddCircleIcon color="primary" style={{transform: "rotateZ(45deg)"}}/>
                        </IconButton>
                    </Stack>
                </Stack>
                {/* ์ ๋ชฉ ๋ฐ ๋ด์ฉ */}
                <Grid container sx={{ width: "100%", marginTop: "2px" }} spacing={2}>
                    <Grid item xs={12} sm={12} md={12}>
                        <SmallTextField
                            label=" ์ค๋ช"
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
                            label="๋ช"
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
                    {/* ์ด๋ฏธ์ง๋ค */}
                    <Grid item xs={12} sm={12} md={12} style={{ marginBottom: 50 }}>
                        <ContentsImageSlider
                            imageLists={content.contents_images}
                            contentsIndex={index}
                            isEdit={isEdit}
                        />
                    </Grid>
                    {/* ์ ๋ณด */}
                    <Grid item xs={12} sm={12} md={12}>
                        <SmallTextField
                            label=" ์์ธ ์ค๋ช"
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
                                    label="๋ฒํธ"
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
                        <Button variant="contained" size={"small"} onClick={(e) => handleClickRemoveContent(e, index)}>์ฝํ์ธ  ์ญ์ </Button>
            </Stack>
                    </Grid>
                </Grid>
            </Stack>
        </Stack>
    );
}

export default ContentsForm;