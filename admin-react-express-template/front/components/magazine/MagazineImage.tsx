import React, { useCallback, memo } from 'react';
import { useTrackedRegisterStore, useTrackedEditStore } from '@zustand/MagazineStore';
import fetcher from '@utils/fetcher';
import useSWR from 'swr';

// import material
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { isEmpty } from '@utils/string';
import moment from 'moment';

type propsTypes = {
    isEdit: boolean;
}

const MagazineLogoImage = ({ isEdit }: propsTypes) => {
    const { data: me, error: meError, revalidate: meRevalidate, mutate: meMutate } = useSWR('/api/admins', fetcher);
    const magazineStore = isEdit ? useTrackedEditStore() : useTrackedRegisterStore();
    const writer = magazineStore.magazine?.writer;

    const imageStyle = {
        backgroundImage: `url(${!isEmpty(magazineStore.magazine?.image_url) ? magazineStore.magazine?.image_url : ''})`,
        width: 500,
        height: 500,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        border: isEmpty(magazineStore.magazine?.image_url) ? '1px dashed #4d5cab' : 'none',
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
    }

    // 사진 변경
    const handleChangeImage = useCallback((e) => {

        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            magazineStore.setMagazineImageFile(file, reader.result);
        };
        if (file) reader.readAsDataURL(file);
    }, []);

    return (
        <Stack flexDirection="column" >
            <Button component="label" onClick={() => { }}>
                <input
                    accept="image/*"
                    style={{ display: "none" }}
                    id={"file-input"}
                    name="imageFile"
                    type="file"
                    multiple={false}
                    onChange={handleChangeImage}
                />
                <div style={imageStyle} >
                    <span style={{
                        display: !isEmpty(magazineStore.magazine?.image_url) ? 'none' : "block",
                        fontSize: 25,
                        color: "#4d5cab",
                        fontWeight: "bolder",
                    }}>매거진 이미지 추가</span>
                </div>
            {!isEmpty(magazineStore.magazine?.image_url) &&
                <div style={{ position: "absolute", color: "#fff", padding: "0 30px 40px 30px", left: 0, bottom: 0 }}>
                    <p style={{fontSize: 15, fontWeight: 100, maxWidth: 500, textTransform: "none"}}>{magazineStore.magazine?.magazine_subtitle || '부제목'}</p> {/* 부제목 */}
                    <p style={{fontSize: 28, maxWidth: 450, wordBreak: "keep-all", textTransform: "none"}}>{magazineStore.magazine?.magazine_title || '제목'}</p> {/* 제목 */}
                    <div style={{fontSize: 13, marginTop: "20px", display: "flex", flexDirection: "row", alignItems: "center"}}>
                        <Avatar src={ isEdit ? writer?.user_profile_img_url : me.data?.profile_img_url} sx={{ mr: 1 }}>
                            {isEdit ? writer?.user_nickname?.slice(0, 1) || '?' : me.data?.nickname?.slice(0, 1) || '?'}
                        </Avatar>
                        <span>{ isEdit ? writer?.user_nickname : me.data?.nickname}</span>
                        &nbsp;&nbsp;·&nbsp;&nbsp;
                        <span>{isEmpty(magazineStore.magazine?.created_at) ? moment().format('YYYY년 MM월 DD일') : moment(magazineStore.magazine?.created_at).format('YYYY년 MM월 DD일')}</span>
                    </div>
                </div>
            }
            </Button>
        </Stack>
    );
}

export default memo(MagazineLogoImage);