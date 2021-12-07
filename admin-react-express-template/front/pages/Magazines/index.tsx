import React, { useState } from 'react';
import useSWR from 'swr';
import MagazineTable from '@components/magazine/MagazineTable';

// import material
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';

// import utils
import fetcher from '@utils/fetcher';
import { isEmpty } from '@utils/string';


const Magazines = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const { data: magazineLists, error, revalidate, mutate } = useSWR(`/api/magazines?page=${page}&limit=${rowsPerPage}`, fetcher);
    
    return (
        <Box sx={{ backgroundColor: 'background.default', minHeight: '100%', py: 2 }}>
            <Container maxWidth={false}>
                {!isEmpty(error?.response?.data?.message) ?
                    <Grid container direction="column" justifyContent="center" alignItems="center" style={{ height: '95%' }}>
                        <p className={'error-text'} style={{ textAlign: 'center', fontWeight: 'bolder', fontSize: 20 }}>{error.response?.data?.message}</p>
                    </Grid>
                    : isEmpty(magazineLists?.data) ?
                        <Grid container direction="column" justifyContent="center" alignItems="center" style={{ height: '95%' }}>
                            <CircularProgress />
                        </Grid>
                        : <Box sx={{ pt: 3 }}>
                            <MagazineTable 
                            magazineLists={magazineLists?.data?.rows}
                            totalCount={magazineLists?.data?.count}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            setPage={setPage}
                            setRowsPerPage={setRowsPerPage}
                            revalidate={revalidate}
                            />
                        </Box>}
            </Container>
        </Box>
    );
}

export default Magazines;