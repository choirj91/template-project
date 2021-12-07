import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import { successToast } from '@components/custom/toast/toast';
import { isEmpty } from '@utils/string';
import fetcher from '@utils/fetcher';
import useSWR from 'swr';
import moment from 'moment';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

/* 삭제 버튼 */
const SmallButton = styled('button')(
  ({ theme }) => ({
    padding: "3px 10px",
    backgroundColor: "#4d5cab",
    color: "#fff",
    display: "inline-block",
    border: "1px solid #fff",
    fontSize: "12",
    borderRadius: "5px",
    cursor: 'pointer'
  })
);

type CafesListTableProps = {
  cafesList: any,
  totalCount: any,
  dpYnOrder: any,
  page: any,
  rowsPerPage: any,
  setDpYnOrder: any,
  setPage: any,
  setRowsPerPage: any,
  revalidate: any
}

const CafesListTable = (props: CafesListTableProps) => {
  const navigate = useNavigate();
  const { data: me, error: meError, revalidate: meRevalidate, mutate: meMutate } = useSWR('/api/admins', fetcher);

  const {
    cafesList,
    totalCount,
    dpYnOrder,
    page,
    rowsPerPage,
    setDpYnOrder,
    setPage,
    setRowsPerPage,
    revalidate
  } = props;

  const [dense, setDense] = useState(false);
  const [isDisplaying, setIsDisplaying] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [cafes, setCafes] = useState(cafesList);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [openDialogCafeNumber, setOpenDialogCafeNumber] = useState<number | null | undefined>(null);

  useEffect(() => { setCafes(cafesList) }, [cafesList]);

  /* 노출 order 기능 */
  const handleRequestSort = () => {
    const isAsc = dpYnOrder === 'asc';
    setDpYnOrder(isAsc ? 'desc' : 'asc');
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  /* 리스트 세로 폭 제어 */
  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(!event.target.checked);
  };

  /* 표시 여부 스위치 버튼 */
  const handleChangeDisplay = (e: React.ChangeEvent<HTMLInputElement>, index: number, cafeNumber: number) => {
    if (me?.data?.auth_grade !== 9) {
      return alert('권한이 없습니다.');
    }
    const { target: { checked } } = e;
    setIsDisplaying(true);

    return axios.post('/api/cafes/display', { display: checked, cafeNumber }, { withCredentials: true })
      .then(result => {
        const newCafes = [...cafes];
        const chnageCafe = cafes[index];
        chnageCafe.dp_yn = checked ? 1 : 0;
        newCafes[index] = chnageCafe;
        setCafes(newCafes);
        setIsDisplaying(false);
        successToast('정상 처리되었습니다.');
      })
      .catch(err => {
        alert(!isEmpty(err.response?.data?.message) ? err.response?.data?.message : err);
        setIsDisplaying(false);
      });
  };

  /* 삭제 팝업 창 오픈 */
  const handleOpenDialog = useCallback((e, cafeNumber: number) => {
    setDialogOpen(true);
    setOpenDialogCafeNumber(cafeNumber);
  }, []);

  /* 삭제 팝업 창 닫기 */
  const handleCloseDialog = useCallback(() => {
    setOpenDialogCafeNumber(null);
    setDialogOpen(false);
  }, []);

  /*  삭제 버튼 */
  const handleClickDeleteButton = useCallback(() => {
    setIsDeleting(true);
    return axios.delete(`/api/cafes/${openDialogCafeNumber}`, { withCredentials: true })
      .then(result => {
        revalidate();
        setIsDeleting(false);
        setOpenDialogCafeNumber(null);
        setDialogOpen(false);
      })
      .catch(err => {
        alert(!isEmpty(err.response?.data?.message) ? err.response?.data?.message : err);
        setIsDeleting(false);
        setOpenDialogCafeNumber(null);
        setDialogOpen(false);
      });
  }, [openDialogCafeNumber]);

  /*  수정 페이지로 이동 */
  const handleClickCafeEditPage = useCallback((cafeNumber) => {
    return navigate({ pathname: `/app/cafes/edit/${cafeNumber}` })
  }, []);

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <TableHead>
              <TableRow>
                <TableCell padding="none" align="center">No.</TableCell>
                <TableCell align={'left'} padding={'normal'}>명</TableCell>
                <TableCell align={'left'} padding={'normal'}>도로명 주소</TableCell>
                <TableCell align={'center'} padding={'none'}>지역</TableCell>
                <TableCell align={'center'} padding={'none'}>
                  <TableSortLabel active={true} direction={dpYnOrder} onClick={handleRequestSort}>
                    {"노출"}
                  </TableSortLabel>
                </TableCell>
                <TableCell align={'center'} padding={'none'}>등록 날짜</TableCell>
                {me?.data?.auth_grade === 9 && <TableCell align={'center'} padding={'none'}>삭제</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {cafes && cafes.map((row: any, index: number) => {
                return (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={row.cafe_number}
                  >
                    <TableCell padding="normal" align="center" onClick={() => handleClickCafeEditPage(row.cafe_number)} sx={{ cursor: 'pointer' }}>{row.cafe_number}</TableCell>
                    <TableCell padding="normal" align="left" onClick={() => handleClickCafeEditPage(row.cafe_number)} sx={{ cursor: 'pointer' }}>
                      <Box sx={{ alignItems: 'center', display: 'flex' }}>
                        {/* <Avatar src={row.profile_img_url} sx={{ mr: 2 }}> */}
                        <Avatar src={"https://picsum.photos/250/250"} sx={{ mr: 2 }}>
                          {row.cafe_title?.slice(0, 1) || '?'}
                        </Avatar>
                        {row.cafe_title}
                      </Box>
                    </TableCell>
                    <TableCell align="left" onClick={() => handleClickCafeEditPage(row.cafe_number)} sx={{ cursor: 'pointer' }}>{row.cafe_road_address}</TableCell>
                    <TableCell align="center" onClick={() => handleClickCafeEditPage(row.cafe_number)} sx={{ cursor: 'pointer' }}>{row.address_signgu + ' ' + row.address_emd}</TableCell>
                    <TableCell align="center">
                      <Switch
                        disabled={isDisplaying || false}
                        checked={row.dp_yn === 1 ? true : false}
                        onChange={(e) => handleChangeDisplay(e, index, row.cafe_number)}
                        inputProps={{ 'aria-label': 'controlled' }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      {moment(row.created_at).format('YYYY-MM-DD HH:mm')}
                    </TableCell>
                    {me?.data?.auth_grade === 9 &&
                      <TableCell align="center">
                        <SmallButton
                          disabled={isDeleting}
                          onClick={(e) => handleOpenDialog(e, row.cafe_number)}
                          style={{ backgroundColor: isDeleting ? "#777" : "#4d5cab" }}
                        >
                          삭제
                        </SmallButton>
                      </TableCell>
                    }
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[30, 50, 100]}
          component="div"
          count={totalCount || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage={"페이지당 표시 개수"}
        />
      </Paper>
      {/* 간격 조절 기능 */}
      <FormControlLabel
        control={<Switch checked={!dense} onChange={handleChangeDense} />}
        label="간격 넓게"
      />
      {/*  삭제 팝업 창 */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        aria-labelledby="alert-delete-dialog-title"
        aria-describedby="alert-delete-dialog-description"
      >
        <DialogTitle id="alert-delete-dialog-title">{" 삭제"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-delete-dialog-description">
            {"삭제 버튼을 클릭하면 와 관련된 모든 데이터가 삭제되며,"}
            <br />
            {"삭제 된  데이터는 복구할 수 없습니다."}
            <br />
            {"를 정말 삭제하시겠습니까?"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>취소</Button>
          <Button onClick={handleClickDeleteButton} autoFocus>삭제</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default CafesListTable;