import React from 'react';

// import material
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { orange } from '@mui/material/colors';

// import icons
import StoreIcon from '@mui/icons-material/Store';

// import util
import { numberWithCommas } from '../../utils/string';


const CafeCount = (props: any) => {
  const { statistics } = props;

  return (
    <Card sx={{ height: '100%' }}    {...props}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              임시 카운트
            </Typography>
            <Typography color="textPrimary" variant="h3">
              {numberWithCommas(statistics?.total_cafe_count)}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar sx={{ backgroundColor: orange[600], height: 56, width: 56 }}>
              <StoreIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box sx={{ pt: 2, display: 'flex', alignItems: 'center' }}>
          {/* <ArrowDownwardIcon sx={{ color: orange[900] }} /> */}
          <Typography sx={{ color: orange[900], mr: 1 }} variant="body2">
            {numberWithCommas(statistics?.total_menu_count)}
          </Typography>
          <Typography color="textSecondary" variant="caption">
            임시 하위 카운트
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default CafeCount;
