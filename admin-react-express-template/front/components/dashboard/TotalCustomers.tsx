import React from 'react';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography
} from '@mui/material';
import { green } from '@mui/material/colors'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import PeopleIcon from '@mui/icons-material/PeopleOutlined';
import { numberWithCommas } from '@utils/string';

const TotalCustomers = (props: any) => {
  const { statistics } = props;

  return (
    <Card {...props}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              전체 회원 수
            </Typography>
            <Typography color="textPrimary" variant="h3">
              {numberWithCommas(statistics?.total_user_count)}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar sx={{ backgroundColor: green[600], height: 56, width: 56 }}>
              <PeopleIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box sx={{ alignItems: 'center', display: 'flex', pt: 2 }}>
          <ArrowUpwardIcon sx={{ color: green[900] }} />
          <Typography variant="body2" sx={{ color: green[900], mr: 1 }}>
            {numberWithCommas(statistics?.this_month_new_count)}
          </Typography>
          <Typography color="textSecondary" variant="caption">
            이번 달 신규 가입자 수
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default TotalCustomers;
