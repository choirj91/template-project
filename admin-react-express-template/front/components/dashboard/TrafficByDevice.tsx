import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  colors,
  useTheme
} from '@mui/material';
import KaKaoIcon from '@mui/icons-material/PhoneAndroid';
import NaverIcon from '@mui/icons-material/SavedSearch';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';

const TrafficByDevice = (props: any) => {
  const theme = useTheme();

  const { statistics } = props;

  const [socialData, setSocialData] = useState({
    naver_user_count: 0,
    google_user_count: 0,
    kakao_user_count: 0,
    apple_user_count: 0,
    total_user_count: 0,
  });

  React.useEffect(() => {
    setSocialData(statistics);
  }, [statistics]);

  const data = {
    datasets: [
      {
        data: [
          socialData?.naver_user_count,
          socialData?.google_user_count,
          socialData?.kakao_user_count,
          socialData?.apple_user_count,
        ],
        backgroundColor: [
          '#03c75a',
          '#4285f4',
          '#ffbe00',
          '#231816',
        ],
        borderWidth: 8,
        borderColor: colors.common.white,
        hoverBorderColor: colors.common.white
      }
    ],
    labels: ['naver', 'google', 'kakao', 'apple']
  };

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  const devices = [
    {
      title: 'naver',
      value: ((socialData?.naver_user_count / socialData?.total_user_count) * 100).toFixed(1),
      icon: NaverIcon,
      color: '#03c75a'
    },
    {
      title: 'google',
      value: ((socialData?.google_user_count / socialData?.total_user_count) * 100).toFixed(1),
      icon: GoogleIcon,
      color: '#4285f4'
    },
    {
      title: 'kakao',
      value: ((socialData?.kakao_user_count / socialData?.total_user_count) * 100).toFixed(1),
      icon: KaKaoIcon,
      color: '#ffbe00'
    },
    {
      title: 'apple',
      value: (((socialData?.apple_user_count / socialData?.total_user_count) * 100).toFixed(1)),
      icon: AppleIcon,
      color: '#231816'
    },
  ];

  return (
    <Card {...props}>
      <CardHeader title="SOCIAL 사용자 유형" />
      <Divider />
      <CardContent>
        <Box sx={{ height: 300, position: 'relative' }}>
          <Doughnut data={data} options={options} />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', pt: 2 }}>
          {devices.map(({ color, icon: Icon, title, value }) => (
            <Box key={title} sx={{ p: 1, textAlign: 'center' }}>
              <Icon color="action" />
              <Typography color="textPrimary" variant="body1">
                {title}
              </Typography>
              <Typography style={{ color }} variant="h5">
                {value}%
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default TrafficByDevice;
