import React from 'react';
import fetcher from '@utils/fetcher';
import useSWR from 'swr';
import { isEmpty } from '@utils/string';

// import components
import AdminListResults from '@components/adminList/AdminListResults';

// import material
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

const AdminList = () => {
  const { data, error, revalidate, mutate } = useSWR('/api/admins/list', fetcher);

  return (
    <Box sx={{ backgroundColor: 'background.default', minHeight: '100%', py: 3 }}>
      <Container maxWidth={false}>
        <Box sx={{ pt: 3 }}>
          {!isEmpty(error?.response?.data?.message) ?
            <p className={'error-text'} style={{ textAlign: 'center', fontWeight: 'bolder', fontSize: 20 }}>{error?.response?.data?.message}</p>
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
              : <AdminListResults adminsList={data?.data} style={{height: "auto", overflowX: "auto"}}/>}
        </Box>
      </Container>
    </Box>
  );
}

export default AdminList;
