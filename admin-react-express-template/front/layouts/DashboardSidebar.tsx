import React from 'react';
import { useEffect } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  Button,
  Stack
} from '@mui/material';
import NavItem from './NavItem';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import BarChartIcon from '@mui/icons-material/BarChart';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PersonIcon from '@mui/icons-material/Person';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import LogoutIcon from '@mui/icons-material/Logout';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';

const items = [
  // { href: '/app/account', icon: PersonIcon, title: '계정 관리', },
  { href: '/app/dashboard', icon: BarChartIcon, title: '대시보드', },
  { href: '/app/notices', icon: ContentPasteIcon, title: '공지사항', },
  { href: '/app/magazines', icon: ImportContactsIcon, title: '매거진', },
  { href: '/app/banners', icon: AutoAwesomeMotionIcon, title: '배너', },
  { href: '/app/cafes/list', icon: FormatListNumberedIcon, title: ' 리스트', },
  { href: '/app/cafes/register', icon: AddBusinessIcon, title: ' 등록', },
  { href: '#', icon: LogoutIcon, title: 'Logout' }
];

type Props = {
  onMobileClose: () => void;
  handlecClickLogout: () => void;
  openMobile: boolean;
  adminData: any;
}

const DashboardSidebar = ({ onMobileClose, handlecClickLogout, adminData, openMobile }: Props) => {
  const location = useLocation();
  const navigate = useNavigate();


  // 최고 권한
  if (adminData?.data?.auth_grade === 9 && !items.find((v: { title: string; }) => v.title === '관리자 리스트'))
    items.splice(1, 0, {
      href: '/app/admin/list',
      icon: PeopleAltIcon,
      title: '관리자 리스트',
    });

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const content = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          p: 2
        }}
      >
        <Avatar
          component={RouterLink}
          src={adminData?.data?.profile_img_url}
          sx={{
            cursor: 'pointer',
            width: 64,
            height: 64
          }}
          to="/app/account"
        />
        <Typography color="textSecondary" variant="body2" style={{ margin: 10 }}>
          {adminData?.data?.nickname}
        </Typography>
        <Stack direction="row" spacing={0} style={{ margin: 0, justifyContent: "center" }} onClick={() => { navigate({ pathname: '/app/account' }) }}>
          <Button variant="text">계정 관리</Button>
        </Stack>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
              handleClickAction={item.title === 'Logout' ? handlecClickLogout : () => { }}
            />
          ))}
        </List>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 256,
              top: 64,
              height: 'calc(100% - 64px)'
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => { },
  openMobile: false
};

export default DashboardSidebar;
