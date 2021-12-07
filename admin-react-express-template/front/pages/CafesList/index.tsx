import React, { useState, useEffect } from 'react';
import useSWR from 'swr';

// import utils
import fetcher from '@utils/fetcher';
import { isEmpty } from '@utils/string';

// import components
import CafesListTable from '@components/cafeList/CafesListTable';
import CafesListSearchToolbar from '@components/cafeList/CafesListSearchToolbar';

// import material
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';

const CafesList = () => {
  const [query, setQuery] = useState<string>('');
  const [dpYnOrder, setDpYnOrder] = React.useState<any>('asc');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(30);

  const { data, error, revalidate, mutate } = useSWR(`/api/cafes/list?page=${page}&limit=${rowsPerPage}&dpYnOrder=${dpYnOrder}&query=${query}`, fetcher);

  useEffect(() => {
    setPage(0);
  }, [query]);

  return (
    <Box sx={{ backgroundColor: 'background.default', minHeight: '100%', py: 3 }}>
      <Container maxWidth={false}>
        <CafesListSearchToolbar cafesList={data} setQuery={setQuery} />
        {!isEmpty(error?.response?.data?.message) ?
          <p className={'error-text'} style={{ textAlign: 'center', fontWeight: 'bolder', fontSize: 20 }}>{error.response?.data?.message}</p>
          : isEmpty(data) ?
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              style={{ height: '100%' }}
            >
              <CircularProgress />
            </Grid>
            : <Box sx={{ pt: 3 }}>
              <CafesListTable
                cafesList={data?.data?.rows}
                totalCount={data?.data?.count}
                dpYnOrder={dpYnOrder}
                page={page}
                rowsPerPage={rowsPerPage}
                setDpYnOrder={setDpYnOrder}
                setPage={setPage}
                setRowsPerPage={setRowsPerPage}
                revalidate={revalidate}
              />
            </Box>}
      </Container>
    </Box>
  );
}

export default CafesList;
