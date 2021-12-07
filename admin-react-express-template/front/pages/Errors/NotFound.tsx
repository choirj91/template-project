import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';

// import material
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>404 | Admin Template</title>
      </Helmet>
      <Box sx={{ backgroundColor: 'background.default', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <Container maxWidth="md">
          <Typography align="center" color="primary" variant="h1">
            404: 페이지를 찾을 수 없습니다.
          </Typography>
          <Typography align="center" color="textPrimary" variant="subtitle2">
            올바른 URL을 입력하였는지 확인하세요.
          </Typography>
          <Stack direction="row" spacing={0} style={{ margin: 20, justifyContent: "center" }} onClick={() => { navigate({ pathname: '/' }) }}>
            <Button variant="contained">홈으로</Button>
          </Stack>
          <Box sx={{ textAlign: 'center' }}>
            <img
              alt="Under development"
              src="/static/images/not_found_img.svg"
              style={{
                marginTop: 50,
                display: 'inline-block',
                maxWidth: '100%',
                width: 560
              }}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default NotFound;
