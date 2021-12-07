import React, { useState } from 'react';
import {
  Box,
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@mui/material';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import axios from 'axios';

const AccountProfile = ({ ...props }) => {
  const { data: admin, error, revalidate, mutate } = useSWR('/api/admins/account', fetcher);

  const [uploading, setUploading] = useState<boolean>(false);
  const [profileImgError, setProfileImgError] = useState<string>('');


  /* 이미지 업로드 */
  const handleImageChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files;
    if (!fileList) return;
    const formData = new FormData();
    formData.append("image", fileList[0], fileList[0]?.name);

    setUploading(true);
    axios.post('/api/files/admin', formData, { withCredentials: true })
      .then(result => {
        revalidate();
        setUploading(false);
        alert('프로필 사진이 변경되었습니다.');
      })
      .catch(err => {
        setUploading(false);
        setProfileImgError(err.response?.data?.message);
        console.error(err.response?.data?.message);
      });
  };

  return (
    <Card {...props}>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
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
              src={admin?.data?.profile_img_url}
              sx={{
                height: 100,
                width: 100
              }}
            />
          </Button>
          <br />
          <Typography
            color="textSecondary"
            variant="body1"
          >
            프로필 사진
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <div style={{ width: "100%" }}>
          <Button
            color="primary"
            fullWidth
            variant="text"
            component="label" 
            onClick={() => { }} 
            disabled={uploading}
          >
            <input
              accept="image/*"
              style={{ display: "none" }}
              id={"file-input"}
              name="imageFile"
              type="file"
              multiple={false}
              onChange={handleImageChange}
            />
            Upload picture
          </Button>
          {profileImgError &&
            <p className={'error-text'} style={{ textAlign: 'center' }}>{profileImgError}</p>
          }
        </div>
      </CardActions>
    </Card>
  )
};

export default AccountProfile;
