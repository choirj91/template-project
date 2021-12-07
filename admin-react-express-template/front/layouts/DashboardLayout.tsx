import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import useSWR from 'swr';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

// import components
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';

// import material
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import { experimentalStyled } from '@mui/material';

// import utils
import fetcher from '@utils/fetcher';
import { isEmpty } from '@utils/string';

const DashboardLayoutRoot = experimentalStyled('div')(
  ({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  })
);

const DashboardLayoutWrapper = experimentalStyled('div')(
  ({ theme }) => ({
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 256
    }
  })
);

const DashboardLayoutContainer = experimentalStyled('div')({
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden'
});

const DashboardLayoutContent = experimentalStyled('div')({
  flex: '1 1 auto',
  height: '100%',
  overflow: 'auto'
});

const DashboardLayout = () => {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const { data: adminData, error, revalidate, mutate } = useSWR('/api/admins', fetcher);

  // if (isEmpty(adminData?.data?.admin_number) && error) {
  //   return <Navigate to="/login-register" />
  // }

  // if (!isEmpty(adminData?.data?.admin_number) && error) { 
  //   return <Navigate to="/login-register" />
  // }

  if(!isEmpty(error)) {
    return <Navigate to="/login-register" />
  }

  /* 로그아웃 */
  const handlecClickLogout = () => {
    return axios.post('/api/admins/logout')
      .then((result) => {
        mutate('');
      })
      .catch((error) => {
        console.error('handlecClickLogoutError==', error);
      });
  }

  return (isEmpty(adminData?.data?.admin_number) ?
    <Stack direction="row" spacing={0} style={{ padding: 0, justifyContent: "center", alignItems: 'center', height: '100%' }}>
      <CircularProgress size={100} />
    </Stack>
    :
    <DashboardLayoutRoot>
      <DashboardNavbar onMobileNavOpen={() => setMobileNavOpen(true)} handlecClickLogout={handlecClickLogout} />
      <DashboardSidebar
        onMobileClose={() => setMobileNavOpen(false)}
        handlecClickLogout={handlecClickLogout}
        openMobile={isMobileNavOpen}
        adminData={adminData}
      />
      <DashboardLayoutWrapper>
        <DashboardLayoutContainer>
          <DashboardLayoutContent>
            <Outlet />
          </DashboardLayoutContent>
        </DashboardLayoutContainer>
      </DashboardLayoutWrapper>
    </DashboardLayoutRoot>
  );
};

export default DashboardLayout;
