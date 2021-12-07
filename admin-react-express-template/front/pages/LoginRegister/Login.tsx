import React, { useState, useCallback } from 'react';
import axios, { AxiosResponse } from 'axios';
import useSWR from 'swr';

// import material
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

// import utils
import { isEmpty } from '@utils/string';
import fetcher from '@utils/fetcher';

const CssTextField = styled(TextField)({
  '& .MuiInputLabel-root': {
    fontSize: 14,
  },
  '& .MuiInputBase-input': {
    fontSize: 14,
  },
});

const Login = () => {
  const { data: userData, error, revalidate, mutate } = useSWR('/api/admins', fetcher);
  const [loginData, setLoginData] = useState({ adminId: '', password: '' });
  const [logInError, setLogInError] = useState('');

  // 로그인 데이타
  const handleChangeLoginData = useCallback((e) => {
    e.persist();
    setLoginData(data => ({ ...data, [e.target.id]: e.target.value }));
  }, [loginData]);

  const onSubmit = useCallback((e) => {
    e.preventDefault();

    if (!isEmpty(loginData.adminId) && !isEmpty(loginData.password)) {
      axios.post('api/admins/login', { ...loginData },
        {
          withCredentials: true,
        },
      )
        .then((response: AxiosResponse<any>) => {
          // Optimistic Ui 선 적용 후 
          // mutate(response.data, false); // 요청 안 보내고 교체 -- shouldRevalidate 확인
          revalidate(); // 요청 보냄
        })
        .catch((error) => {
          if (error.response?.data?.reason) setLogInError(error.response?.data?.reason);
          // setLogInError(error.response.data.data.message);
        });
    }
  }, [loginData]);

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={onSubmit} className="login-form">
        <h1 style={{ fontWeight: "bolder" }}>Login</h1>
        <CssTextField
          size="small"
          // error={Boolean(touched.email && errors.email)}
          fullWidth
          // helperText={touched.email && errors.email}
          label="이메일 아이디"
          margin="dense"
          name="email"
          id="adminId"
          // onBlur={handleBlur}
          onChange={handleChangeLoginData}
          type="email"
          value={loginData.adminId || ''}
          variant="outlined"
        />
        <CssTextField
          size="small"
          // error={Boolean(touched.email && errors.email)}
          fullWidth
          // helperText={touched.email && errors.email}
          label="비밀번호"
          margin="dense"
          name="password"
          id="password"
          // onBlur={handleBlur}
          onChange={handleChangeLoginData}
          type="password"
          value={loginData.password || ''}
          variant="outlined"
        />
        {/* {logInError && <div style={{ color: 'red', marginBottom: "12px", fontSize: 12 }}>{logInError}</div>} */}
        {true && <div style={{ color: 'red', marginBottom: "12px", fontSize: 12 }}>아이디: test@test.com</div>}
        {true && <div style={{ color: 'red', marginBottom: "12px", fontSize: 12 }}>비번: asdf</div>}
        <button className={"loginButton"} type={"submit"} >Login</button>
      </form>
    </div>
  )
}

export default Login;