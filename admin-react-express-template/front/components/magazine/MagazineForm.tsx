import React, { useCallback, memo } from 'react';
import { useTrackedRegisterStore, useTrackedEditStore } from '@zustand/MagazineStore';

// import material
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

type PropsTypes = {
    isEdit: boolean;
}

const SmallTextField = styled(TextField)({
    '& .MuiInputLabel-root': {
        fontSize: 13,
    },
    '& .MuiInputBase-input': {
        fontSize: 13,
    },
});

const MagazineForm = ({ isEdit }: PropsTypes) => {
    const magazineStore = isEdit ? useTrackedEditStore() : useTrackedRegisterStore();

    // 매거진 정보 변경
    const handleChangeText = useCallback((e) => {
        const { target: { name, value } } = e;
        if(name === 'magazine_title' || name === 'magazine_subtitle') {
            if(value.length >= 200) return alert('200자를 넘을 수 없습니다.');
        }
        magazineStore.setMagazineValue(name, value);
    }, []);

    return (
        <Grid container sx={{ width: 550, marginTop: "2px" }} spacing={3}>
            <Grid item xs={12} sm={12} md={12}>
                <SmallTextField
                    label="매거진 부제목"
                    fullWidth
                    size="small"
                    required
                    name="magazine_subtitle"
                    id="magazine_subtitle"
                    type="text"
                    value={magazineStore.magazine.magazine_subtitle || ''}
                    onChange={handleChangeText}
                    // helperText={magazineStore.magazine.noticeTitleError}
                    // error={!isEmpty(magazineStore.magazine.noticeTitleError)}
                    disabled={false}
                />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
                <SmallTextField
                    label="매거진 제목"
                    fullWidth
                    size="small"
                    required
                    name="magazine_title"
                    id="magazine_title"
                    type="text"
                    value={magazineStore.magazine.magazine_title || ''}
                    onChange={handleChangeText}
                    // helperText={magazineStore.magazine.noticeTitleError}
                    // error={!isEmpty(magazineStore.magazine.noticeTitleError)}
                    disabled={false}
                />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
                <SmallTextField
                    label="매거진 내용"
                    fullWidth
                    size="small"
                    required
                    multiline
                    minRows={5}
                    name="magazine_content"
                    id="magazine_content"
                    type="text"
                    value={magazineStore.magazine.magazine_content || ''}
                    onChange={handleChangeText}
                    // helperText={magazineStore.magazine.noticeTitleError}
                    // error={!isEmpty(magazineStore.magazine.noticeTitleError)}
                    disabled={false}
                />
            </Grid>
        </Grid>
    );
}

export default memo(MagazineForm);