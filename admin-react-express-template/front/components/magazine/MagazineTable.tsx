import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import MagazineTableTitle from '@components/magazine/MagazineTableTitle';
import { successToast } from '@components/custom/toast/toast';

// import utils
import { isEmpty } from '@utils/string';
import fetcher from '@utils/fetcher';

// import material
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

moment.locale('ko');

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

interface MagazineTypes {
    magazine_number: number;
    magazine_title: string;
    magazine_subtitle: string;
    dp_yn: number;
    created_at: string;
    admin_number: number;
    admin_nickname: string;
}

type MagazineTableProps = {
    magazineLists: any;
    totalCount: any;
    page: any;
    rowsPerPage: any;
    setPage: any;
    setRowsPerPage: any;
    revalidate: any;
}

const MagazineTable = (props: MagazineTableProps) => {
    const navigate = useNavigate();
    const [isDisplaying, setIsDisplaying] = useState(false);
    const { data: me, error: meError, revalidate: meRevalidate, mutate: meMutate } = useSWR('/api/admins', fetcher);

    const {
        magazineLists,
        totalCount,
        page,
        rowsPerPage,
        setPage,
        setRowsPerPage,
        revalidate,
    } = props;

    const [magazines, setMagazines] = useState(magazineLists);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [openDialogMagazineNumber, setOpenDialogMagazineNumber] = useState<number | null | undefined>(null);

    useEffect(() => { setMagazines(magazineLists) }, [magazineLists]);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    /* 삭제 팝업 창 오픈 */
    const handleOpenDialog = useCallback((e, magazineNumber: number) => {
        setOpenDialogMagazineNumber(magazineNumber);
        setDialogOpen(true);
    }, []);

    /* 삭제 팝업 창 닫기 */
    const handleCloseDialog = useCallback(() => {
        setOpenDialogMagazineNumber(null);
        setDialogOpen(false);
    }, []);

    /* 매거진 삭제 버튼 */
    const handleClickDeleteButton = useCallback(() => {
        setIsDeleting(true);
        return axios.delete(`/api/magazines/${openDialogMagazineNumber}`, { withCredentials: true })
            .then(result => {
                revalidate();
                setIsDeleting(false);
                setOpenDialogMagazineNumber(null);
                setDialogOpen(false);
            })
            .catch(err => {
                alert(!isEmpty(err.response?.data?.message) ? err.response?.data?.message : err);
                setIsDeleting(false);
                setOpenDialogMagazineNumber(null);
                setDialogOpen(false);
            });
    }, [openDialogMagazineNumber]);

    /* 매거진 수정 페이지로 이동 */
    const handleClickMagazineEditPage = useCallback((magazineNumber) => {
        return navigate({ pathname: `/app/magazines/edit/${magazineNumber}` })
    }, []);

      /* 표시 여부 스위치 버튼 */
  const handleChangeDisplay = useCallback((e: React.ChangeEvent<HTMLInputElement>, index: number, magazineNumber: number) => {
    if (me?.data?.auth_grade !== 9) {
      return alert('권한이 없습니다.');
    }
    if(!isDisplaying) {
        const { target: { checked } } = e;
        setIsDisplaying(true);
    
        return axios.post(`/api/magazines/${magazineNumber}/display`, { display: checked }, { withCredentials: true })
          .then(result => {
            revalidate();
            successToast('정상 처리되었습니다.');
            setIsDisplaying(false);
          })
          .catch(err => {
            alert(!isEmpty(err.response?.data?.message) ? err.response?.data?.message : err);
            setIsDisplaying(false);
          });
    }
  }, [isDisplaying]);

    return (
        <Paper sx={{ width: '100%', mb: 2 }}>
            <MagazineTableTitle />
            <TableContainer>
                <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="medium">
                    <TableHead>
                        <TableRow>
                            <TableCell padding="normal" align="center">No.</TableCell>
                            <TableCell padding="normal">제목</TableCell>
                            <TableCell padding="normal" align="center">작성자</TableCell>
                            <TableCell padding="normal" align="center">작성날짜</TableCell>
                            <TableCell padding="normal" align="center">노출</TableCell>
                            {me?.data?.auth_grade === 9 && <TableCell padding="normal" align="center">삭제</TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {magazines && magazines?.map((magazine: MagazineTypes, index: number) => (
                            <TableRow
                                hover
                                onClick={(event) => { }}
                                key={'magazine-' + magazine.magazine_number}
                            >
                                <TableCell padding="normal" align="center" onClick={() => handleClickMagazineEditPage(magazine.magazine_number)} sx={{cursor: 'pointer' }}>{magazine.magazine_number}</TableCell>
                                <TableCell padding="normal" align="left" onClick={() => handleClickMagazineEditPage(magazine.magazine_number)} sx={{cursor: 'pointer',maxWidth: "400px" }}>
                                    <Stack flexDirection={"column"}>
                                    <p style={{fontSize: "11px", color: "gray"}}>{magazine.magazine_subtitle}</p>
                                    <p>{magazine.magazine_title}</p>
                                        </Stack>
                                    </TableCell>
                                <TableCell padding="normal" align="center" onClick={() => handleClickMagazineEditPage(magazine.magazine_number)} sx={{cursor: 'pointer' }}>{magazine.admin_nickname}</TableCell>
                                <TableCell padding="normal" align="center" onClick={() => handleClickMagazineEditPage(magazine.magazine_number)} sx={{cursor: 'pointer' }}>
                                    {moment(magazine.created_at).format('YYYY-MM-DD HH:mm')}
                                </TableCell>
                                <TableCell align="center">
                      <Switch
                        disabled={isDisplaying || false}
                        checked={magazine.dp_yn === 1 ? true : false}
                        onChange={(e) => handleChangeDisplay(e, index, magazine.magazine_number)}
                        inputProps={{ 'aria-label': 'controlled' }}
                      />
                    </TableCell>
                                {me?.data?.auth_grade === 9 &&
                                    <TableCell padding="none" align="center">
                                        <SmallButton
                                            disabled={isDeleting}
                                            onClick={(e) => handleOpenDialog(e, magazine.magazine_number)}
                                            style={{ backgroundColor: isDeleting ? "#777" : "#4d5cab" }}
                                        >
                                            삭제
                                        </SmallButton>
                                    </TableCell>
                                }
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 30, 50]}
                component="div"
                count={totalCount || 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage={"페이지당 표시 개수"}
            />
            {/* 삭제 팝업 창 */}
            <Dialog
                open={dialogOpen}
                onClose={handleCloseDialog}
                aria-labelledby="alert-delete-magazine"
                aria-describedby="alert-delete-magazine-description"
            >
                <DialogTitle id="alert-delete-magazine-title">{"매거진 삭제"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-delete-magazine-description">
                        {"삭제 버튼을 클릭하면 매거진와 관련된 모든 데이터가 삭제되며,"}
                        <br />
                        {"삭제 된 매거진 데이터는 복구할 수 없습니다."}
                        <br />
                        {"매거진를 정말 삭제하시겠습니까?"}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>취소</Button>
                    <Button onClick={handleClickDeleteButton} autoFocus>삭제</Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
}

export default MagazineTable;