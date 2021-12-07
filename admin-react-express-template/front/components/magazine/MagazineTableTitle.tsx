import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const MagazineTableTitle = () => {
    const navigate = useNavigate();

    /* 매거진 글쓰기 페이지로 이동 */
    const handleClickButton = useCallback(() => {
        return navigate({ pathname: `/app/magazines/register` })
    }, []);


    return (
        <Toolbar sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 } }}>
            <Stack justifyContent={"space-between"} alignItems={"center"} direction={"row"} width={"100%"} marginTop={3} marginBottom={4} color={"#4d5cab"} fontWeight={"bolder"}>
                <Typography variant="h3" id="tableTitle" component="div">
                    매거진
                </Typography>
                <Button variant={"contained"} size={"large"} onClick={handleClickButton}>글쓰기</Button>
            </Stack>
        </Toolbar>
    );
};

export default MagazineTableTitle;