import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CafesEditContainer from './CafesEditContainer';
import { isEmpty } from '@utils/string';
import { useTrackedEditCafeStore, cafeImagesStore } from '@zustand/CafeStore';
import { useTrackedFilterStore } from '@zustand/FilterStore';
import axios from 'axios';

// import materail
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';


const CafesEdit = () => {
  const { id } = useParams();
  const filterState = useTrackedFilterStore();
  const cafeState = useTrackedEditCafeStore();
  const cafeImageState = cafeImagesStore();

  useEffect(() => {
    filterState.getFilterLists();
    axios.get(`/api/cafes/${id}`, { withCredentials: true })
    .then(response => {
      cafeState.getCafeData(response.data?.data);
      cafeImageState.getImages(response.data?.data?.cafeImages || []);

      return response.data;
    }).catch(err => {
      console.error('cafeInfo err:', err);
      if(!isEmpty(err?.response?.data?.message)) {
        cafeState.setCafeDataError(err?.response?.data?.message);
      }
      // set({ errorCafeData: err?.response?.data?.message });
    });
  }, [id]);

  useEffect(() => {
    return () => {
      cafeState.resetCafeState();
      cafeImageState.resetImages();
    }
  }, []);

  return (isEmpty(cafeState?.cafeInfo || isEmpty(filterState?.filterLists) || isEmpty(cafeState?.cafeInfo?.cafeTitle)) ?
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      style={{ height: '100%' }}
    >
      {!isEmpty(cafeState.errorCafeData) ?
        <p className={'cafeError-text'} style={{ textAlign: 'center', fontWeight: 'bolder', fontSize: 15, color: 'red' }}>{cafeState.errorCafeData}</p>
        : <CircularProgress />}
    </Grid>
    :
    <CafesEditContainer cafeNumber={id} />
  );
}

export default CafesEdit;
