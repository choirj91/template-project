import React, { memo, useCallback, useEffect, useState } from 'react';
import { magazineEditStore, magazineRegisterStore } from '@zustand/MagazineStore';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// import components
import MagazineImage from '@components/magazine/MagazineImage';
import MagazineForm from '@components/magazine/MagazineForm';
import ContentsContainer from '@components/magazine/magazineConents/ContentsContainer';

// import material
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

// import utils
import { isEmpty } from '@utils/string';

type MagazineContainerProps = {
    magazineNumber?: number;
}

const MagazineContainer = (props: MagazineContainerProps) => {
    const [ isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const { magazineNumber } = props;
    const isEdit = !isEmpty(magazineNumber) ? true : false;
    const magazineStore = isEdit ? magazineEditStore() : magazineRegisterStore();
    const navigate = useNavigate();

    // 저장
    const handleClickSubmit = useCallback((e) => {
        e.preventDefault();
        
        const formData = new FormData();
        const magazineInfo = magazineStore.magazine;
        
        // 매거진 사진
        if (!isEmpty(magazineInfo.image_file) && magazineInfo.image_file !== null) {
            magazineInfo.image_size = magazineInfo.image_file?.size || null;
            magazineInfo.image_name = magazineInfo.image_file?.name || null;
            formData.append('image', magazineInfo.image_file);
        }
        else if(isEmpty(magazineInfo.image_url) && isEmpty(magazineInfo.image_file)) return alert('매거진 사진을 등록해주세요.');

        //  컨텐츠
        if (isEmpty(magazineInfo.magazine_contents)) return alert('콘텐츠를 추가해 주세요.');

        for (let i = 0; i < magazineInfo.magazine_contents.length; i++) {
            const content = magazineInfo.magazine_contents[i];
            if(isEmpty(content.contents_tags)) return alert(`[${i+1}]-태그를 하나 이상 입력해 주세요.`);
            if(isEmpty(content.contents_images)) return alert(`[${i+1}]- 사진을 등록해 주세요.`);
            
            for (let j = 0; j < content.contents_images.length; j++) {
                const contentImg = content.contents_images[j];
                // 2021. 11. 01 필수 X 제거
                // if(isEmpty(contentImg.image_ref)) return alert(`[${i+1}-${j+1}]-사진출처를 입력해 주세요.`);

                if(!isEmpty(contentImg.image_file) && contentImg.image_file !== null) {
                    formData.append('image', contentImg.image_file);
                }
            }

            // 2021. 11. 01 필수 X 제거
            // if(isEmpty(content.cafe)) return alert(`[${i+1}]-정보를 등록해 주세요.`);
        }
        setIsSubmitting(true);
        
        // 보내기전 blob 제거
        magazineInfo.image_url = magazineInfo.image_url?.toString().substr(0, 200) || null;
        for (let i = 0; i < magazineInfo.magazine_contents.length; i++) {
            const content = magazineInfo.magazine_contents[i];
            for (let j = 0; j < content.contents_images.length; j++) {
                const contentImg = content.contents_images[j];
                if(!isEmpty(contentImg.image_file) && contentImg.image_file !== null) {
                    contentImg.image_url = contentImg.image_url?.toString().substr(0, 200) || null;
                }
            }
        }

        formData.append('magazine', JSON.stringify(magazineInfo));

        if(isEdit) {
            axios.put(`/api/magazines/${magazineNumber}`, formData, {withCredentials: true})
            .then(result => {
                setIsSubmitting(false);
                magazineStore.resetMagazine();
                alert('수정이 완료되었습니다.');
                return navigate({ pathname: '/app/magazines' });
            })
            .catch(err => {
                alert(err.response?.data?.message);
                setIsSubmitting(false);
            });
        }
        else {
            axios.post("/api/magazines", formData, {withCredentials: true})
            .then(result => {
                setIsSubmitting(false);
                magazineStore.resetMagazine();
                alert('등록이 완료되었습니다.');
                return navigate({ pathname: '/app/magazines' });
            })
            .catch(err => {
                alert(err.response?.data?.message);
                setIsSubmitting(false);
            });
        }

    }, [magazineStore.magazine]);

    return (
        <Grid container flexDirection="column" justifyItems="center" alignItems="center">
            <Paper sx={{ width: '600px', mb: 2 }}>
                <form onSubmit={handleClickSubmit}>
                    <Stack width="100%" height="100%" alignItems="center" justifyItems="center">
                        <MagazineImage isEdit={isEdit} />
                        <MagazineForm isEdit={isEdit} />
                        <Divider variant="middle" style={{width: "500px", margin: "30px 0"}}/>
                        <ContentsContainer isEdit={isEdit}/>
                        <Button disabled={isSubmitting} variant={"contained"} size={"large"} type="submit" sx={{width: "100%"}}>저장</Button>
                    </Stack>
                </form>
            </Paper>
        </Grid>
    )
}


export default memo(MagazineContainer);