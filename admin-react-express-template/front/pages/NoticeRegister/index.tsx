import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import NoticeForm from '@components/notice/NoticeForm';

const NoticeRegister = () => {
    return (
        <Box sx={{ backgroundColor: 'background.default', minHeight: '100%', py: 2 }}>
            <Container maxWidth={false}>
                <NoticeForm />
            </Container>
        </Box>
    );
}

export default NoticeRegister;