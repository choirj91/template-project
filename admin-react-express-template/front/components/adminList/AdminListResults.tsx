import React, { useEffect } from 'react';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import {
  Avatar,
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Switch,
  Stack
} from '@mui/material';
import { isEmpty } from '@utils/string';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import fetcher from '@utils/fetcher';
import useSWR from 'swr';
import { styled } from '@mui/material/styles';
import { successToast } from '@components/custom/toast/toast';

/* 수정, 삭제 버튼 */
const SmallCell = styled(TableCell)(
  ({ theme }) => ({
    fontSize: 12
  })
);

const AdminListResults = ({ adminsList, ...rest }: any) => {
  const { data: me, error: meError, revalidate: meRevalidate, mutate: meMutate } = useSWR('/api/admins', fetcher);

  const [admins, setAdmins] = useState(adminsList);
  const [isChecking, setIsChecking] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);

  /* 승인 여부 스위치 버튼 */
  const handleChangeStatusSwitch = (e: React.ChangeEvent<HTMLInputElement>, index: number, adminNumber: number) => {
    const { target: { checked } } = e;
    setIsChecking(true);

    return axios.post('/api/admins/status', { authStatus: checked, adminNumber: adminNumber }, { withCredentials: true })
      .then(result => {
        const newAdmins = [...admins];
        const chnageAdmin = admins[index];
        chnageAdmin.auth_status = checked;
        newAdmins[index] = chnageAdmin;
        setAdmins(newAdmins);
        setIsChecking(false);
        successToast('승인이 정상 처리되었습니다.');
      })
      .catch(err => {
        alert(err.response?.data?.message);
        setIsChecking(false);
      });
  };

  /* 권한 변경 Select box */
  const handleChangeGrade = (e: SelectChangeEvent<any>, index: number, adminNumber: number) => {
    const { target: { value } } = e;
    setIsSelecting(true);
    return axios.post('/api/admins/grade', { authGrade: value, adminNumber: adminNumber }, { withCredentials: true })
      .then(result => {
        const newAdmins = [...admins];
        const chnageAdmin = admins[index];
        chnageAdmin.auth_grade = value;
        newAdmins[index] = chnageAdmin;
        setAdmins(newAdmins);
        setIsSelecting(false);
        successToast('권한이 변경되었습니다.');
      })
      .catch(err => {
        alert(err.response?.data?.message);
        setIsSelecting(false);
      });


  };

  return (
    <Card {...rest}>
      <Stack justifyContent={"space-between"} alignItems={"center"} direction={"row"} width={"100%"} paddingLeft={3} marginTop={3} marginBottom={4} color={"#4d5cab"} fontWeight={"bolder"}>
        <Typography variant="h3" id="tableTitle" component="div">
          관리자 리스트
        </Typography>
      </Stack>
      <Box sx={{ minWidth: 1000 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>승인여부</TableCell>
              <TableCell>계정권한</TableCell>
              <TableCell>닉네임</TableCell>
              <TableCell>아이디</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>연락처</TableCell>
              <TableCell>생년월일</TableCell>
              <TableCell>가입날짜</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!isEmpty(admins) &&
              admins.map((admin: any, index: number) => (
                <TableRow hover key={admin.admin_number}>
                  <TableCell>
                    {admin.admin_number}
                  </TableCell>
                  <TableCell>
                    <Switch
                      disabled={isChecking || me?.data?.admin_number === admin.admin_number || false}
                      checked={admin.auth_status || false}
                      onChange={(e) => handleChangeStatusSwitch(e, index, admin.admin_number)}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                  </TableCell>
                  <TableCell>
                    {/* {admin.auth_grade} */}
                    <Select
                      disabled={isSelecting || me?.data?.admin_number === admin.admin_number || false}
                      labelId="auth_grade"
                      id="auth_grade-box"
                      value={admin.auth_grade || ''}
                      onChange={(e) => { handleChangeGrade(e, index, admin.admin_number) }}
                      label="계정 권한"
                      size="small"
                      style={{ fontSize: 12, fontWeight: 'bolder', color: admin?.auth_grade === 9 ? '#4d5cab' : "#777", height: 37, marginTop: 3 }}
                    >
                      <MenuItem value={1} style={{ fontSize: 12, fontWeight: 'bolder', color: '#777' }}>{'일반'}</MenuItem>
                      <MenuItem value={9} style={{ fontSize: 12, fontWeight: 'bolder', color: '#4d5cab' }}>{'관리자'}</MenuItem>
                    </Select>
                  </TableCell>
                  <SmallCell><Box sx={{ alignItems: 'center', display: 'flex' }}>
                    <Avatar src={admin.profile_img_url} sx={{ mr: 2 }}>
                      {admin?.nickname?.slice(0, 1) || '?'}
                    </Avatar>
                    <Typography color="textPrimary" variant="subtitle2">
                      {admin.nickname}
                    </Typography>
                  </Box>
                  </SmallCell>
                  <SmallCell>{admin.admin_id}</SmallCell>
                  <SmallCell>{admin.name}</SmallCell>
                  <SmallCell>{admin.phone}</SmallCell>
                  <SmallCell>{admin.birth}</SmallCell>
                  <SmallCell>{moment(admin.createdAt).format('YYYY-MM-DD')}</SmallCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Box>
    </Card>
  );
};

export default AdminListResults;