import create from 'zustand';
import axios from 'axios';
import { createTrackedSelector } from 'react-tracked';

type filterState = {
    filterLists: any;
    getFilterLists: () => void;
    errorFilter: string;
  }
  
  export const filterStore = create<filterState>(set => ({
    filterLists: [],
    errorFilter: '',
    getFilterLists: async () => {
      return await axios.get('/api/filters/all', {withCredentials: true})
      .then( response => {
        set({ filterLists: response.data });
        return response.data;
      }).catch(err => {
        console.error('filterStore err:', err);
        set({ errorFilter: err?.response?.data?.message});
      });
    }
  }));
  
  export const useTrackedFilterStore = createTrackedSelector(filterStore);