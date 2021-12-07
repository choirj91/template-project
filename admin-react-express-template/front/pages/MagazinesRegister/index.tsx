import React, {useEffect} from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import MagazineContainer from '@components/magazine/MagazineContainer';
import { useTrackedRegisterStore } from '@zustand/MagazineStore';

const NoticeRegister = () => {
    const magazineState = useTrackedRegisterStore();

    useEffect(() => {
        return () => {
            magazineState.resetMagazine();
        }
    }, []);

    return (
        <Box sx={{ backgroundColor: 'background.default', minHeight: '100%', py: 2 }}>
            <Container maxWidth={false}>
                <MagazineContainer />
            </Container>
        </Box>
    );
}

export default NoticeRegister;