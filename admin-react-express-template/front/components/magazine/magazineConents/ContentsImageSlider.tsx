import React, { useState, useCallback } from 'react';
import Slider from "react-slick";
import { isEmpty } from '@utils/string';
import styled from 'styled-components';
import { useTrackedEditStore, useTrackedRegisterStore } from '@zustand/MagazineStore';

// import material
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

const CustomInputBox = styled.input`
height: 30px;
width: 80px;
border: 1px solid #4d5cab;
border-radius: 2px;
background-color: #fff;
color: #4d5cab;
font-size: 11px;
padding: 0 5px;
&:focus {
    outline: none;
  }
`;

const CustomSlide = (props: any) => {
    const { index, image, ...rest } = props;
    return (
        <div {...rest}>
            <img src={image} style={{ width: "100%", height: "100%" }} />
        </div>
    );
}


type PropTypes = {
    imageLists: { 
        image_ref: string | null; 
        image_url: string | ArrayBuffer | null; 
        image_file: File | null; 
        image_size: number | null;
        image_name: string | null;
    }[] | [];
    contentsIndex: number;
    isEdit: boolean;
}

const ContentsImageSlider = ({ imageLists, contentsIndex, isEdit }: PropTypes) => {
    const magazineStore = isEdit ? useTrackedEditStore() : useTrackedRegisterStore();
    const [selectNo, setSelectNo] = useState(0);

    const settings = {
        customPaging: function (i: number) {
            return (
                <a style={{ width: "100%", height: "100%", filter: i === selectNo ? "brightness(1)" : "brightness(0.5)" }}>
                    <img src={imageLists[i]?.image_url?.toString() || ''} style={{ width: "100%", height: "100%" }} />
                </a>
            );
        },
        dots: true,
        dotsClass: "slick-dots slick-thumb",
        infinite: true,
        speed: 200,
        slidesToShow: 1,
        slidesToScroll: 1,
        afterChange: function (i: number) {
            setSelectNo(i)
        },
    };

    // 사진 추가
    const handleAddImage = useCallback((e, index) => {

        if(imageLists.length + e.target.files.length > 10) return alert('사진은 최대 10개까지 가능합니다.');

        if (!isEmpty(e.target.files)) {
            for (let i = 0; i < e.target.files.length; i++) {
                let reader = new FileReader();
                let file = e.target.files[i];
                reader.onloadend = () => {
                    magazineStore.addContentsImage(contentsIndex, file, reader.result);
                };

                if (file) reader.readAsDataURL(file);
            }
        }
    }, [imageLists]);

    // 사진 삭제
    const handleClickDeleteImage = useCallback(() => {
        if (imageLists.length + 1 === selectNo) {
            setSelectNo(selectNo - 1);
        }
        magazineStore.removeContentsImage(contentsIndex, selectNo);
    }, [selectNo]);

    // 사진 출처 변경
    const handleChangeImgRef = useCallback((e) => {
        const { target: { value } } = e;
        magazineStore.setContentsImageRef(contentsIndex, selectNo, value);
    }, [selectNo, contentsIndex]);

    return (
        <div style={{ width: "100%", height: 500 }}>
            <Slider {...settings}>
                {!isEmpty(imageLists) ? imageLists.map((v, index) => {
                    return <CustomSlide key={`slide-${index}`} index={index} image={v?.image_url} />
                }) :
                    <Button component="label" onClick={() => { }}>
                        <input
                            accept="image/*"
                            style={{ display: "none" }}
                            id={"file-input"}
                            name="imageFile"
                            type="file"
                            multiple={true}
                            onChange={(e) => handleAddImage(e, contentsIndex)}
                        />
                        <div style={{
                            display: "inline-flex",
                            width: "100%",
                            height: "480px",
                            backgroundSize: "contain",
                            border: '1px dashed #4d5cab',
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                        }}>
                            <span style={{ display: "block" }}>이미지 추가</span>
                        </div>
                    </Button>
                }
            </Slider>
            {!isEmpty(imageLists) &&
                <Stack flexDirection="row" justifyContent="space-between">
                    <Stack flexDirection="row" alignItems="center" sx={{ zIndex: 2, fontSize: 12, color: '#4d5cab' }}>
                        <div style={{ position: "relative" }}>
                            <CustomInputBox placeholder="사진 출처" value={imageLists[selectNo]?.image_ref || ''} onChange={handleChangeImgRef} />
                            <span style={{ left: 0, position: "absolute", backgroundColor: "#fff", fontSize: 11, marginLeft: 5 }}>사진 출처*</span>
                        </div>
                    </Stack>
                    <Stack flexDirection="row">
                        <IconButton color="primary" aria-label="deleteImage" component="label">
                            <input
                                accept="image/*"
                                style={{ display: "none" }}
                                id={"file-input"}
                                name="imageFile"
                                type="file"
                                multiple={true}
                                onChange={(e) => handleAddImage(e, contentsIndex)}
                            />
                            <AddCircleIcon color="primary" />
                        </IconButton>
                        <IconButton color="primary" aria-label="deleteImage" component="span" onClick={handleClickDeleteImage}>
                            <DeleteRoundedIcon color="primary" />
                        </IconButton>
                    </Stack>
                </Stack>
            }
        </div>
    );
}

export default ContentsImageSlider;

