import React, { useState, useCallback, Dispatch, SetStateAction, useEffect, memo } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Typography,
  Stack
} from '@mui/material';
import SmallTextField from '@components/custom/textField/SmallTextField';
import axios from 'axios';
import { isEmpty } from '@utils/string';
import { EditCafeStore, RegisterCafeStore } from '@zustand/CafeStore';

type Props = {
  profileImgError: string;
  setProfileImgError: Dispatch<SetStateAction<string>>;
  type: string;
}

const CafeLogo = ({ profileImgError, setProfileImgError, type }: Props) => {
  const [uploading, setUploading] = useState<boolean>(false);
  const isEdit = type === 'edit' ? true : false;
  const cafeState = isEdit ? EditCafeStore() : RegisterCafeStore();
  const profileImg = cafeState.profileImg;

  /* 이미지 업로드 */
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) return;
    const formData = new FormData();
    formData.append("image", fileList[0], fileList[0]?.name);

    setUploading(true);
    axios.post('/api/files/image', formData, { withCredentials: true })
      .then(result => {
        const newProfileImg = { ...result.data?.data[0], type: 'change', profileRef: profileImg?.profileRef, profileRefPath: profileImg?.profileRefPath };
        cafeState.setProfileImg(newProfileImg);
        setUploading(false);
      })
      .catch(err => {
        setUploading(false);
        setProfileImgError(err.response?.data?.message);
        console.error(err.response?.data?.message);
      });
  };

  /* 이미지 업로드 삭제 */
  const handleImageDelete = (e: React.MouseEvent) => {

    setUploading(true);

    // 방금 업로드 처리 된 사진 temp 에서 삭제 처리 필요
    if(!isEmpty(profileImg?.key)) {
      axios.post('/api/files/remove-image', profileImg, { withCredentials: true })
      .then(result => {
        cafeState.removeProfileImg();
        setUploading(false);
      })
      .catch(err => {
        setUploading(false);
        setProfileImgError(err.response?.data?.message);
        console.error(err.response?.data?.message);
      });
    }
    // 이미 존재하는 사진
    else {
      cafeState.removeProfileImg();
      setUploading(false);
    }
  };

  useEffect(() => {
    if (!isEmpty(profileImg?.location) && (isEmpty(profileImg?.profileRef) || isEmpty(profileImg?.profileRefPath))) {
      setProfileImgError('출처 정보를 모두 입력해 주세요.');
    }
    else {
      setProfileImgError('');
    }
  }, [profileImg, profileImg?.profileRef, profileImg?.profileRefPath]);

  /* 텍스트 입력 */
  const handleChangeText = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { value, id } } = e;
    cafeState.setProfileImgValue(id, value);

  }, []);

  return (
    <Card>
      <CardContent>
        <Box
          sx={{alignItems: 'center',display: 'flex',flexDirection: 'column'}}>
          <Button color="primary" component="label" onClick={() => { }} disabled={uploading}>
            <input
              accept="image/*"
              style={{ display: "none" }}
              id={"file-input"}
              name="imageFile"
              type="file"
              multiple={false}
              onChange={handleImageChange}
            />
            <Avatar
              src={!isEmpty(profileImg) && profileImg?.location || "/static/images/default_img.png"}
              sx={{ height: 100, width: 100 }} />
          </Button>
          <Grid container spacing={1}>
            <Grid lg={12} md={12} xs={12} item >
              <Stack direction="row" style={{ justifyContent: "center", alignItems: 'center' }}>
                {!isEmpty(profileImg?.location) ?
                  <Button variant="text" onClick={handleImageDelete}>사진 삭제</Button>
                  : <Typography color="#616161" variant="h6" style={{ fontWeight: 'bolder', textAlign: "center", backgroundColor: "#fff", marginTop: 5 }}>로고 이미지</Typography>}
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
      <Divider />
      <CardActions style={{ justifyContent: 'center' }}>
        <Grid container spacing={1}>
          <Grid lg={6} md={6} xs={6} item>
            <SmallTextField title="출처 (계정 ID)" name="profileRef" id="profileRef" type="text" value={profileImg?.profileRef || ''} handleChange={handleChangeText} handleBlur={() => { }} helperText={''} error={false} disabled={false} />
          </Grid>
          <Grid lg={6} md={6} xs={6} item>
            <SmallTextField title="출처 플랫폼 (인스타그램 등)" name="profileRefPath" id="profileRefPath" type="text" value={profileImg?.profileRefPath || ''} handleChange={handleChangeText} handleBlur={() => { }} helperText={''} error={false} disabled={false} />
          </Grid>
          {profileImgError &&
            <Grid lg={12} md={12} xs={12} item >
              <p className={'error-text'} style={{ textAlign: 'center' }}>{profileImgError}</p>
            </Grid>
          }
        </Grid>
      </CardActions>
    </Card>
  )
}

export default memo(CafeLogo);
