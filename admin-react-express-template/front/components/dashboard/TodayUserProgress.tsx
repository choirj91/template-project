import React from 'react';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Typography
} from '@mui/material';
import { red } from '@mui/material/colors'
import InsertChartIcon from '@mui/icons-material/InsertChartOutlined';
import { numberWithCommas } from '@utils/string';

const TodayUserProgress = (props: any) => {
  const { statistics } = props;

  return (
    <Card sx={{ height: '100%' }} {...props}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              금일 회원 접속률
            </Typography>
            <Typography color="textPrimary" variant="h3">
              {statistics?.today_user_count ? (((statistics?.today_user_count / statistics?.total_user_count)*100).toFixed(2)) : 0}% ({numberWithCommas(statistics?.today_user_count)})
            </Typography>
          </Grid>
          <Grid item>
            <Avatar sx={{ backgroundColor: red[600], height: 56, width: 56 }}>
              <InsertChartIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box sx={{ pt: 3 }}>
          <LinearProgress
            value={75.5}
            variant="determinate"
          />
        </Box>
      </CardContent>
    </Card>
  );
}


export default TodayUserProgress;
