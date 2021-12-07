import React from 'react';
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography
} from '@mui/material';
import { indigo } from '@mui/material/colors'
import AddToHomeScreenIcon from '@mui/icons-material/AddToHomeScreen';
import { numberWithCommas } from '@utils/string';

const TodayVisitor = (props: any) => {
  const { statistics } = props;

  return (
    <Card {...props}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              금일 비회원 방문
            </Typography>
            <Typography color="textPrimary" variant="h3">
              {numberWithCommas(statistics?.today_visit_count) || 0}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar sx={{ backgroundColor: indigo[600], height: 56, width: 56 }}>
              <AddToHomeScreenIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default TodayVisitor;
