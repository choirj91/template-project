import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { successToast } from '@components/custom/toast/toast';

// import material
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

// import utils
import { isEmpty } from '@utils/string';

const CssTextField = styled(TextField)({
  '& .MuiInputLabel-root': {
    fontSize: 14,
  },
  '& .MuiInputBase-input': {
    fontSize: 14,
  },
});


type Props = {
  setSignin: Dispatch<SetStateAction<boolean>>,
}

const Register = ({ setSignin }: Props) => {
  const [signUpError, setSignUpError] = useState('');
  /* 등록 */
  const onSubmit = useCallback((value, actions) => {
    setSignUpError('');
    axios.post('/api/admins', value)
      .then(() => {
        actions.setSubmitting(false);
        successToast('등록이 정상적으로 완료되었습니다. 계정 사용승인 요청을 해주세요.');
        setSignin(true);
      })
      .catch((error) => {
        setSignUpError(error.response?.data?.message);
        actions.setSubmitting(false);
      });
  }, []);

  return (
    <div className="form-container sign-up-container">
      <Formik
        initialValues={{
          email: '',
          nickname: '',
          name: '',
          password: '',
          passwordConfirmation: '',
        }}
        validationSchema={
          Yup.object().shape({
            email: Yup.string().email('이메일 형식이 올바르지 않습니다.').max(255).required('아이디를 입력해 주세요.'),
            nickname: Yup.string().max(255).required('닉네임을 입력해 주세요.'),
            name: Yup.string().max(255).required('이름을 입력해 주세요.'),
            password: Yup.string().max(255).required('비밀번호를 입력해 주세요.'),
            passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], '비밀번호가 일치하지 않습니다.').required('비밀번호를 입력해 주세요.'),
          })
        }
        onSubmit={(values, actions) => onSubmit(values, actions)}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values
        }) => (
          <form onSubmit={handleSubmit} className="login-form">
            <h1 style={{ fontWeight: "bolder" }}>Register</h1>
            <br />
            <CssTextField
              size="small"
              error={Boolean(touched.email && errors.email)}
              fullWidth
              helperText={touched.email && errors.email}
              label="이메일 아이디"
              margin="dense"
              name="email"
              onBlur={handleBlur}
              onChange={handleChange}
              type="email"
              value={values.email || ''}
              variant="outlined"
            />
            <CssTextField
              size="small"
              error={Boolean(touched.nickname && errors.nickname)}
              fullWidth
              helperText={touched.nickname && errors.nickname}
              label="닉네임"
              margin="dense"
              name="nickname"
              onBlur={handleBlur}
              onChange={handleChange}
              type="text"
              value={values.nickname || ''}
              variant="outlined"
            />
            <CssTextField
              size="small"
              error={Boolean(touched.name && errors.name)}
              fullWidth
              helperText={touched.name && errors.name}
              label="이름"
              margin="dense"
              name="name"
              onBlur={handleBlur}
              onChange={handleChange}
              type="text"
              value={values.name || ''}
              variant="outlined"
            />
            <CssTextField
              size="small"
              error={Boolean(touched.password && errors.password)}
              fullWidth
              helperText={touched.password && errors.password}
              label="비밀번호"
              margin="dense"
              name="password"
              onBlur={handleBlur}
              onChange={handleChange}
              type="password"
              value={values.password || ''}
              variant="outlined"
            />
            <CssTextField
              size="small"
              error={Boolean(touched.passwordConfirmation && errors.passwordConfirmation)}
              fullWidth
              helperText={touched.passwordConfirmation && errors.passwordConfirmation}
              label="비밀번호 확인"
              margin="dense"
              name="passwordConfirmation"
              onBlur={handleBlur}
              onChange={handleChange}
              type="password"
              value={values.passwordConfirmation || ''}
              variant="outlined"
            />
            {!isEmpty(signUpError) && <div style={{ color: 'red', fontSize: 12 }}>{signUpError}</div>}
            <button className={"signUpButton"} type={"submit"} disabled={isSubmitting}>Register</button>
          </form>
        )}
      </Formik>
    </div>
  )
}

export default Register;