import React, { useEffect } from 'react'
import { useTrackedBannerStore } from '@zustand/BannersStore';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// import component
import BannersToolbar from '@components/banners/BannersToolbar';
import { BannersContainer } from '@components/banners/BannersContainer';

// import material
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';

import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

// import utils
import { isEmpty } from '@utils/string';

const Banners = () => {

    const bannersStore = useTrackedBannerStore();

    useEffect(() => {
        bannersStore.getBannersLists();
        return () => {
            bannersStore.resetStore();
        }
    }, []);

    return (
        <Box sx={{ backgroundColor: 'background.default', minHeight: '100%', py: 2 }}>
            <Container maxWidth={false}>
                {!isEmpty(bannersStore.bannersError) ?
                    <Grid container direction="column" justifyContent="center" alignItems="center" style={{ height: '95%' }}>
                        <p className={'error-text'} style={{ textAlign: 'center', fontWeight: 'bolder', fontSize: 20 }}>{bannersStore.bannersError}</p>
                    </Grid>
                    : isEmpty(bannersStore.bannersLists) && bannersStore.isLoading?
                        <Grid container direction="column" justifyContent="center" alignItems="center" style={{ height: '95%' }}>
                            <CircularProgress />
                        </Grid>
                        : <Box sx={{ pt: 3 }}>
                            <Paper sx={{ width: '100%', mb: 2 }}>
                                <BannersToolbar />
                                <DndProvider backend={HTML5Backend}>
                                    <TableContainer>
                                        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="medium">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell padding="normal" align="center">순서</TableCell>
                                                    <TableCell padding="normal" align="center">배너</TableCell>
                                                    <TableCell padding="normal" align="center">링크설정</TableCell>
                                                    <TableCell padding="normal" align="center">등록날짜</TableCell>
                                                    <TableCell padding="normal" align="center">노출</TableCell>
                                                    <TableCell padding="normal" align="center">삭제</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <BannersContainer />
                                        </Table>
                                    </TableContainer>
                                </DndProvider>
                            </Paper>
                        </Box>}
            </Container>
        </Box>
    );
}

export default Banners;