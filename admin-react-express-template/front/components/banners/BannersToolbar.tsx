import React, { useCallback, useState } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTrackedBannerStore } from '@zustand/BannersStore';
import { isEmpty } from '@utils/string';
import axios from 'axios';

const BannersToolbar = () => {
    const bannersStore = useTrackedBannerStore();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    /* 배너추가 */
    const handleClickAddButton = useCallback(() => {
        bannersStore.addBanners();
    }, []);

    /* 배너 저장 */
    const handleClickSaveButton = useCallback(() => {
        setIsSubmitting(true);

        const bannerLists = bannersStore.bannersLists;

        const formData = new FormData();
        formData.append('bannersLists', JSON.stringify(bannerLists));

        if (!isEmpty(bannerLists)) {
            for (let i = 0; i < bannerLists.length; i++) {
                const banner = bannerLists[i];
                /* 이미지 체크 */
                if(isEmpty(banner.image_url)) return alert('이미지를 업로드해 주세요.');
                if (!isEmpty(banner.image_file) && banner.image_file !== null) {
                    formData.append('image', banner.image_file);
                }

                /* 필수 값 체크 */
                if(!isEmpty(banner.link_type) && banner.link_type !== 'empty' && banner.link_type !== 'joincafe' && isEmpty(banner.link_target)) return alert('링크 설정을 확인해 주세요.');
                if(banner.link_type === 'view' && isEmpty(banner.title)) return alert('링크 설정을 확인해 주세요.');

            }
        }

        return axios.post(`/api/banners`, formData, { withCredentials: true })
            .then(result => {
                alert('저장되었습니다.');
                setIsSubmitting(false);
                bannersStore.getBannersLists();
            })
            .catch(err => {
                console.error(err);
                alert(err.response?.data?.message);
                setIsSubmitting(false);
            });

    }, [bannersStore.bannersLists]);


    return (
        <Toolbar sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 } }}>
            <Stack justifyContent={"space-between"} alignItems={"center"} direction={"row"} width={"100%"} marginTop={3} marginBottom={4} color={"#4d5cab"} fontWeight={"bolder"}>
                <Typography variant="h3" id="tableTitle" component="div">
                    배너 리스트
                </Typography>
                <div>
                    <Button variant={"contained"} size={"large"} onClick={handleClickAddButton} style={{ margin: 10 }}>추가</Button>
                    <Button variant={"contained"} size={"large"} onClick={handleClickSaveButton}>저장</Button>
                </div>
            </Stack>
        </Toolbar>
    );
};

export default BannersToolbar;