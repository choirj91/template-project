import React, { useCallback, memo } from 'react';
import { magazineEditStore, magazineRegisterStore, useTrackedEditStore, useTrackedRegisterStore } from '@zustand/MagazineStore';
import ContentsForm from './ContentsForm';

// import materail
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { isEmpty } from '@utils/string';

type PropsTypes = {
    isEdit: boolean;
}

const ContentsContainer = ({ isEdit }: PropsTypes) => {
    const magazineStore = isEdit ? useTrackedEditStore() : useTrackedRegisterStore();

    const contentsLists = isEdit
        ? magazineEditStore(useCallback(state => state.magazine.magazine_contents, []))
        : magazineRegisterStore(useCallback(state => state.magazine.magazine_contents, []));

    /* 매거진 콘텐츠 추가 */
    const handleClickAddMagazines = useCallback(() => {
        magazineStore.addMagazineContents();
    }, []);

    return (
        <>
            {!isEmpty(contentsLists) && contentsLists.map((contents, index) => {
                return <ContentsForm key={`contents-${index}`} isEdit={isEdit} index={index} />
            })}
            <Stack height={'100%'} width={'100%'} padding={'30px'}>
                <button type="button" onClick={handleClickAddMagazines}
                    style={{
                        background: "#fff",
                        height: '100%',
                        width: '100%',
                        border: '1px dashed #4d5cab',
                        borderRadius: 5,
                        padding: 50
                    }}
                >
                    <Typography
                        color="#4d5cab"
                        variant="h2"
                        style={{
                            fontWeight: 'bolder',
                            textAlign: "center",
                            backgroundColor: "#fff",
                            marginTop: 5
                        }}>
                        {"콘텐츠 추가"}
                    </Typography>
                </button>
            </Stack>
        </>
    );
}

export default memo(ContentsContainer);