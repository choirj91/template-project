import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@mui/material';
import { isEmpty } from '@utils/string';
import axios, { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';


const AccountPassword = ({ ...props }: any) => {
  const navigate = useNavigate();
  const [changeError, setChangeError] = useState('');
  const [values, setValues] = useState({
    currentPwd: '',
    changePwd: '',
    checkPwd: '',
  });

  const handleChange = (event: any) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  /* 저장 */
  const handleClickChangePassword = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.preventDefault();

    setChangeError('');

    if (isEmpty(values.currentPwd)) {
      setChangeError('비밀번호를 입력해 주세요.');
      return alert('비밀번호를 입력해 주세요.');
    }
    if (isEmpty(values.changePwd)) {
      setChangeError('변경할 비밀번호를 입력해 주세요.');
      return alert('변경할 비밀번호를 입력해 주세요.');
    }
    if (isEmpty(values.checkPwd)) {
      setChangeError('비밀번호 확인을 입력해 주세요.');
      return alert('비밀번호 확인을 입력해 주세요.');
    }

    if (values.changePwd !== values.checkPwd) {
      setChangeError('비밀번호 확인과 일치하지 않습니다.');
      return alert('비밀번호 확인과 일치하지 않습니다.');
    }

    return axios.post('/api/admins/password', { ...values },
      {
        withCredentials: true,
      },
    )
      .then((response: AxiosResponse<any>) => {
        alert('비밀번호가 변경되었습니다.');
        return navigate({ pathname: '/' });
      })
      .catch((error) => {
        if (error.response?.data?.message) {
          alert(error.response?.data?.message);
          setChangeError(error.response?.data?.message);
        }
        else {
          alert("예기치 못한 에러가 발생되었습니다.");
          setChangeError("예기치 못한 에러가 발생되었습니다.");
        }
      });
  }

  return (
    <form autoComplete="off" noValidate {...props}>
      <Card>
        <CardHeader subheader={''} title="비밀번호 변경" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                helperText="현재 비밀번호를 입력해 주세요."
                label="현재 비밀번호"
                name="currentPwd"
                onChange={handleChange}
                required
                value={values.currentPwd}
                variant="outlined"
                type="password"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="변경하실 비밀번호를 입력해 주세요."
                label="변경 비밀번호"
                name="changePwd"
                onChange={handleChange}
                required
                value={values.changePwd}
                variant="outlined"
                type="password"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="변경하실 비밀번호를 한번 더 입력해 주세요."
                label="비밀번호 확인"
                name="checkPwd"
                onChange={handleChange}
                required
                value={values.checkPwd}
                variant="outlined"
                type="password"
              />
            </Grid>
            {!isEmpty(changeError) &&
              <Grid lg={12} md={12} xs={12} item >
                <p className={'error-text'} style={{ textAlign: 'center' }}>{changeError}</p>
              </Grid>}
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button color="primary" variant="contained" onClick={handleClickChangePassword}>
            변경
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default AccountPassword;
