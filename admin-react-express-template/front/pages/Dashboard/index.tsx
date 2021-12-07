import React from 'react';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';

// import components
import CafeCount from '@components/dashboard/CafeCount';
import LatestOrders from '@components/dashboard/LatestOrders';
import Sales from '@components/dashboard/Sales';
import TodayUserProgress from '@components/dashboard/TodayUserProgress';
import TotalCustomers from '@components/dashboard/TotalCustomers';
import TodayVisitor from '@components/dashboard/TodayVisitor';
import TrafficByDevice from '@components/dashboard/TrafficByDevice';

// import material
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

// temp
import { data } from './tempData';

const Dashboard = () => {
  // const { data, error, revalidate, mutate } = useSWR('/api/dashboard', fetcher);
  const revalidate = () => { };

  return (
    <>
      <Box sx={{ backgroundColor: 'background.default', minHeight: '100%', py: 3 }}>
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <CafeCount statistics={data?.data?.budgetStatistics} />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <TotalCustomers statistics={data?.data?.budgetStatistics} />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <TodayUserProgress statistics={data?.data?.budgetStatistics} />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <TodayVisitor sx={{ height: '100%' }} statistics={data?.data?.budgetStatistics} />
            </Grid>
            <Grid item lg={8} md={12} xl={9} xs={12}>
              <Sales statistics={data?.data?.daysStatistics} />
            </Grid>
            <Grid item lg={4} md={6} xl={3} xs={12}>
              <TrafficByDevice statistics={data?.data?.budgetStatistics} sx={{ height: '100%' }} />
            </Grid>
            <Grid item lg={12} md={12} xl={12} xs={12}>
              <LatestOrders cafeLists={data?.data?.cafeLists} revalidate={revalidate} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default Dashboard;
