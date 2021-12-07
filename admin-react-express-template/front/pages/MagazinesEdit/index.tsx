import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import MagazineContainer from '@components/magazine/MagazineContainer';
import { useParams } from 'react-router-dom';
import { isEmpty } from '@utils/string';
import { useTrackedEditStore } from '@zustand/MagazineStore';

const NoticeEdit = () => {
    const { id } = useParams();
    const magazineState = useTrackedEditStore();
    const magazineNumber: number = parseInt(isEmpty(id) ? '-1' : id);

    useEffect(() => {
        magazineState.getMagazineData(magazineNumber);
        return () => {
            magazineState.resetMagazine();
        }
    }, []);

    useEffect(() => {
        console.log('magazineState?.magazine?.magazine_title==', magazineState?.magazine?.magazine_title);
    }, [magazineState?.magazine?.magazine_title]);
    useEffect(() => {
        console.log('magazineState?.getMagazineError==', magazineState?.getMagazineError);
    }, [magazineState?.getMagazineError]);
    useEffect(() => {
        console.log('magazineState?.magazine==', magazineState?.magazine);
    }, [magazineState?.magazine]);
    useEffect(() => {
        console.log('magazineState?.magazine?.magazine_title==', magazineState?.magazine?.magazine_title);
    }, [magazineState?.magazine?.magazine_title]);

    return ( isEmpty(magazineState?.magazine) || isEmpty(magazineState?.magazine?.magazine_title) ?
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            style={{ height: '100%' }}
        >
            {!isEmpty(magazineState?.getMagazineError) ?
                <p className={'cafeError-text'} style={{ textAlign: 'center', fontWeight: 'bolder', fontSize: 15, color: 'red' }}>{magazineState?.getMagazineError}</p>
                : <CircularProgress size={100}/>}
        </Grid>
        :
        <Box sx={{ backgroundColor: 'background.default', minHeight: '100%', py: 2 }}>
            <Container maxWidth={false}>
                {isEmpty(id) ?
                    <p className={'error-text'} style={{ textAlign: 'center' }}>{"잘못된 요청입니다."}</p>
                    : <MagazineContainer magazineNumber={parseInt(id)} />}
            </Container>
        </Box>
    );
}

export default NoticeEdit;