import React, { Dispatch, SetStateAction, useCallback, memo, useEffect } from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { Box, Typography, Grid } from '@mui/material';
import { isEmpty } from "@utils/string";
import { styled } from '@mui/material/styles';
import update from 'immutability-helper';
import DndCard from './DndCard';
import { cafeImagesStore } from '@zustand/CafeStore';
import { RegisterCafeStore } from '@zustand/CafeStore';

/* 추가, 전체 삭제 버튼 */
const MediumButton = styled('div')(
    ({ theme }) => ({
        padding: "5px 10px",
        backgroundColor: "#4d5cab",
        color: "#fff",
        display: "inline-block",
        border: "1px solid #fff",
        fontSize: "12",
        borderRadius: "5px",
        cursor: 'pointer'
    })
);

type FileUploadProps = {
    type: string;
}
const FileUpload = ({ type }: FileUploadProps) => {
    const maxNumber = 500;
    const cafeImages = cafeImagesStore();

    const onChange = useCallback((imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        const newList = imageList.map((imgs, index) => { return { rank: index, index, fileName: imgs?.file?.name, ...imgs } });
        cafeImages.setImages(newList as []);
    }, []);
    
    const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {

        cafeImages.moveImages(dragIndex, hoverIndex);
    }, [],
    );

    return (
        <Box
            sx={{
                p: 2,
                width: '100%',
                minHeight: 300,
                height: "100%",
                bgcolor: '#fff',
                opacity: [0.9, 0.9, 0.9],
                '&:hover': {
                    backgroundColor: '#fff',
                    opacity: [1, 1, 1],
                },
            }}
        >
            <ImageUploading
                multiple
                value={cafeImages.images}
                onChange={onChange}
                maxNumber={maxNumber}
            >
                {({
                    imageList,
                    onImageUpload,
                    onImageRemoveAll,
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps
                }) => isEmpty(cafeImages.images) ? (
                    <div style={{ height: '100%', width: '100%', padding: 10 }}>
                        <button
                            style={{
                                background: "#fff",
                                color: isDragging ? "red" : "#000",
                                height: '100%',
                                width: '100%',
                                border: '1px dashed grey',
                                borderRadius: 5,
                            }}
                            onClick={onImageUpload}
                            {...dragProps}
                        >
                            <Typography
                                color="#4d5cab"
                                variant="h2"
                                style={{ fontWeight: 'bolder', textAlign: "center", backgroundColor: "#fff", marginTop: 5 }}>
                                {"이미지 업로드"}<br />
                                {"Click or Drop here"}
                            </Typography>
                        </button>
                    </div>
                )
                        : (
                            <div style={{ height: '100%', width: '100%', padding: 10, userSelect: "none" }}>
                                {/* 클릭 버튼 */}
                                <div style={{ display: "flex", justifyContent: "end", marginBottom: 20 }}>
                                    <MediumButton
                                        style={isDragging ? { color: "red" } : undefined}
                                        onClick={onImageUpload}
                                        {...dragProps}
                                    >추가</MediumButton>
                                    &nbsp;&nbsp;
                                    <MediumButton onClick={onImageRemoveAll}>전체삭제</MediumButton>
                                </div>
                                {/* 이미지 미리보기 */}
                                <div style={{ height: '100%', width: '100%', userSelect: "none" }}>
                                    <Grid container spacing={1}>
                                        <Grid lg={12} md={12} xs={12} item >
                                            {/* 드래그 */}
                                            {imageList.map((image, index) => <DndCard
                                                key={image.index + '-' + image?.file?.name}
                                                index={index}
                                                id={image.index}
                                                dataURL={image.dataURL}
                                                moveCard={moveCard}
                                                onImageUpdate={() => onImageUpdate(index)}
                                                onImageRemove={() => onImageRemove(index)}
                                            />)}
                                        </Grid>
                                    </Grid>
                                </div>
                            </div>
                        )}
            </ImageUploading>
        </Box>
    );
}

export default memo(FileUpload);