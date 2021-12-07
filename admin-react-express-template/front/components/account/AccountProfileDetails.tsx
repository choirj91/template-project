import React, { useState, useEffect } from 'react';
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
import useSWR from 'swr';
import fetcher from '@utils/fetcher';

const AccountProfileDetails = ({ ...props }) => {
  const { data: admin, error, revalidate, mutate } = useSWR('/api/admins/account', fetcher);

  useEffect(() =>{
    if(!isEmpty(admin)) {
      setValues({
        name: admin?.data?.name || '',
        nickname: admin?.data?.nickname || '',
        birth: admin?.data?.birth || '',
        phone: admin?.data?.phone || '',
      });
    }
  }, [admin]);

  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: admin?.data?.name || '',
    nickname: admin?.data?.nickname || '',
    birth: admin?.data?.birth || '',
    phone: admin?.data?.phone || '',
  });
  const [saveError, setSaveError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target: {name, value}} = e;
    if(name === 'nickname' && value.length > 10) return;
    setValues({
      ...values,
      [name]: value
    });
  };

  /* 저장 */
  const handleClickSaveProfile = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.preventDefault();

    setSaveError('');

    if (isEmpty(values.name)) {
      setSaveError('이름을 입력해 주세요.');
      return alert('이름을 입력해 주세요.');
    }
    if (isEmpty(values.nickname)) {
      setSaveError('닉네임을 입력해 주세요.');
      return alert('닉네임을 입력해 주세요.');
    }
    return axios.post('/api/admins/profile', { ...values },
      {
        withCredentials: true,
      },
    )
      .then((response: AxiosResponse<any>) => {
        revalidate();
        alert('계정 정보가 저장되었습니다.');
        return navigate({ pathname: '/' });
      })
      .catch((error) => {
        if (error.response?.data?.message) {
          alert(error.response?.data?.message);
          setSaveError(error.response?.data?.message);
        }
        else {
          alert("예기치 못한 에러가 발생되었습니다.");
          setSaveError("예기치 못한 에러가 발생되었습니다.");
        }
      });
  }

  return (
    <form autoComplete="off" noValidate      {...props}>
      <Card>
        <CardHeader
          subheader={admin?.data?.admin_id || ''}
          title="프로필"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="실명을 입력해 주세요."
                label="관리자 이름"
                name="name"
                onChange={handleChange}
                required
                value={values.name}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="닉네임을 입력해 주세요."
                label="관리자 닉네임"
                name="nickname"
                onChange={handleChange}
                required
                value={values.nickname}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="생년월일을 입력해 주세요."
                label="생년월일"
                name="birth"
                onChange={handleChange}
                value={values.birth}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="연락처를 입력해 주세요."
                label="연락처"
                name="phone"
                onChange={handleChange}
                type="number"
                value={values.phone}
                variant="outlined"
              />
            </Grid>
            {!isEmpty(saveError) &&
            <Grid lg={12} md={12} xs={12} item >
              <p className={'error-text'} style={{ textAlign: 'center' }}>{saveError}</p>
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
          <Button color="primary" variant="contained" onClick={handleClickSaveProfile}>
            저장
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default AccountProfileDetails;
