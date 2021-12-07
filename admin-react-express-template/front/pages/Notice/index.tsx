import React, { useState } from 'react';
import useSWR from 'swr';
import NoticeTable from '@components/notice/NoticeTable';

// import material
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';

// import utils
import fetcher from '@utils/fetcher';
import { isEmpty } from '@utils/string';


const Notice = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const { data: noticeLists, error, revalidate, mutate } = useSWR(`/api/notices?page=${page}&limit=${rowsPerPage}`, fetcher);
    
    return (
        <Box sx={{ backgroundColor: 'background.default', minHeight: '100%', py: 2 }}>
            <Container maxWidth={false}>
                {!isEmpty(error?.response?.data?.message) ?
                    <Grid container direction="column" justifyContent="center" alignItems="center" style={{ height: '95%' }}>
                        <p className={'error-text'} style={{ textAlign: 'center', fontWeight: 'bolder', fontSize: 20 }}>{error.response?.data?.message}</p>
                    </Grid>
                    : isEmpty(noticeLists?.data) ?
                        <Grid container direction="column" justifyContent="center" alignItems="center" style={{ height: '95%' }}>
                            <CircularProgress />
                        </Grid>
                        : <Box sx={{ pt: 3 }}>
                            <NoticeTable 
                            noticeLists={noticeLists?.data?.rows}
                            totalCount={noticeLists?.data?.count}
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

export default Notice;