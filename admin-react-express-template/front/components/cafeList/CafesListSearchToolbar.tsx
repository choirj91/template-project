import React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const CafesListSearchToolbar = (props: any) => {

  const { setQuery } = props;

  // 검색 키워드
  const handleChnageKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { value } } = e;
    setQuery(value);
  }

  return (
    <Box>
      <Box>
        <Card>
          <CardContent style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', paddingBottom: 16 }}>
            <Typography variant="h3" id="tableTitle" component="div" color={"#4d5cab"}>
               리스트
            </Typography>
            <Box sx={{ maxWidth: 500 }} style={{ width: '100%' }}>
              <TextField
                fullWidth
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon fontSize="small" color="action">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="명 검색"
                variant="outlined"
                onChange={handleChnageKeyword}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

export default CafesListSearchToolbar;
