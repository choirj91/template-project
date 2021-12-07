import React, {useEffect} from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import NoticeForm from '@components/notice/NoticeForm';
import { useParams } from 'react-router-dom';
import { isEmpty } from '@utils/string';
import { useTrackedEditStore } from '@zustand/NoticeStore';

const NoticeEdit = () => {
    const { id } = useParams();
    const noticeState = useTrackedEditStore();
    const noticeNumber:number = parseInt(isEmpty(id) ? '-1' : id);

    useEffect(() => {
        noticeState.getNoticeData(noticeNumber);
      }, []);

    return (
        <Box sx={{ backgroundColor: 'background.default', minHeight: '100%', py: 2 }}>
            <Container maxWidth={false}>
                {isEmpty(id) ? 
                <p className={'error-text'} style={{ textAlign: 'center' }}>{"잘못된 요청입니다."}</p>
                :<NoticeForm noticeNumber={parseInt(id)}/>}
            </Container>
        </Box>
    );
}

export default NoticeEdit;