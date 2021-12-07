import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import NoticeTableTitle from '@components/notice/NoticeTableTitle';

// import utils
import { isEmpty } from '@utils/string';
import fetcher from '@utils/fetcher';

// import material
import { styled } from '@mui/material/styles';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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

interface NoticeTypes {
    created_at: string;
    id: number;
    notice_title: string;
    notice_type: string;
}

type NoticeTableProps = {
    noticeLists: any;
    totalCount: any;
    page: any;
    rowsPerPage: any;
    setPage: any;
    setRowsPerPage: any;
    revalidate: any;
}

const NoticeTable = (props: NoticeTableProps) => {
    const navigate = useNavigate();
    const { data: me, error: meError, revalidate: meRevalidate, mutate: meMutate } = useSWR('/api/admins', fetcher);

    const {
        noticeLists,
        totalCount,
        page,
        rowsPerPage,
        setPage,
        setRowsPerPage,
        revalidate,
    } = props;

    const [notices, setNotices] = useState(noticeLists);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [openDialogNoticeNumber, setOpenDialogNoticeNumber] = useState<number | null | undefined>(null);

    useEffect(() => { setNotices(noticeLists) }, [noticeLists]);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    /* 삭제 팝업 창 오픈 */
    const handleOpenDialog = useCallback((e, noticeNumber: number) => {
        setOpenDialogNoticeNumber(noticeNumber);
        setDialogOpen(true);
    }, []);

    /* 삭제 팝업 창 닫기 */
    const handleCloseDialog = useCallback(() => {
        setOpenDialogNoticeNumber(null);
        setDialogOpen(false);
    }, []);

    /* 공지 삭제 버튼 */
    const handleClickDeleteButton = useCallback(() => {
        setIsDeleting(true);
        return axios.delete(`/api/notices/${openDialogNoticeNumber}`, { withCredentials: true })
            .then(result => {
                revalidate();
                setIsDeleting(false);
                setOpenDialogNoticeNumber(null);
                setDialogOpen(false);
            })
            .catch(err => {
                alert(!isEmpty(err.response?.data?.message) ? err.response?.data?.message : err);
                setIsDeleting(false);
                setOpenDialogNoticeNumber(null);
                setDialogOpen(false);
            });
    }, [openDialogNoticeNumber]);

    /* 공지 수정 페이지로 이동 */
    const handleClickNoticeEditPage = useCallback((cafeNumber) => {
        return navigate({ pathname: `/app/notices/edit/${cafeNumber}` })
    }, []);

    return (
        <Paper sx={{ width: '100%', mb: 2 }}>
            <NoticeTableTitle />
            <TableContainer>
                <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="medium">
                    <TableHead>
                        <TableRow>
                            <TableCell padding="none" align="center">No.</TableCell>
                            <TableCell padding="normal">제목</TableCell>
                            <TableCell padding="none" align="center">작성날짜</TableCell>
                            {me?.data?.auth_grade === 9 && <TableCell padding="none" align="center">삭제</TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {notices && notices?.map((notice: NoticeTypes) => (
                            <TableRow
                                hover
                                onClick={(event) => { }}
                                key={'notice-' + notice.id}
                            >
                                <TableCell padding="none" align="center" onClick={() => handleClickNoticeEditPage(notice.id)} sx={{cursor: 'pointer' }}>{notice.id}</TableCell>
                                <TableCell align="left" onClick={() => handleClickNoticeEditPage(notice.id)} sx={{cursor: 'pointer' }}>{notice.notice_title}</TableCell>
                                <TableCell padding="none" align="center" onClick={() => handleClickNoticeEditPage(notice.id)} sx={{cursor: 'pointer' }}>
                                    {moment(notice.created_at).format('YYYY-MM-DD HH:mm')}
                                </TableCell>
                                {me?.data?.auth_grade === 9 &&
                                    <TableCell padding="none" align="center">
                                        <SmallButton
                                            disabled={isDeleting}
                                            onClick={(e) => handleOpenDialog(e, notice.id)}
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
                aria-labelledby="alert-delete-notice"
                aria-describedby="alert-delete-notice-description"
            >
                <DialogTitle id="alert-delete-notice-title">{"공지 삭제"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-delete-notice-description">
                        {"삭제 버튼을 클릭하면 공지와 관련된 모든 데이터가 삭제되며,"}
                        <br />
                        {"삭제 된 공지 데이터는 복구할 수 없습니다."}
                        <br />
                        {"공지를 정말 삭제하시겠습니까?"}
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

export default NoticeTable;