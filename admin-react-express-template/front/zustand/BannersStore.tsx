import create from 'zustand';
import axios from 'axios';
import { createTrackedSelector } from 'react-tracked';
import update from 'immutability-helper';
import moment from 'moment';
import { isEmpty } from '@utils/string';

moment.locale('ko');

type bannerType = {
  id: number;
  created_at: string | null;
  dp_yn: boolean;
  image_ori_name: string | null;
  image_url: string | ArrayBuffer | null;
  image_size: number | null;
  image_file: File | null;
  link_target: string | null;
  title: string | null;
  link_type: string | null;
  order_rank: number;
}

interface BannerStoreType {
  bannersLists: bannerType[];
  bannersError: string;
  isLoading: boolean;
  getBannersLists: () => void;
  addBanners: () => void;
  moveBanners: (id: string, atIndex: number) => void;
  setBannerDpYn: (index: number, checked: boolean) => void;
  removeBanner: (index: number) => void;
  setBannerType: (index: number, value: string) => void;
  setBannerTarget: (index: number, value: string) => void;
  setBannerViewTitle: (index: number, value: string) => void;
  setBannerImageFile: (index: number, file: File, imageUrl: string | ArrayBuffer | null) => void;
  resetStore: () => void;
}

export const bannerStore = create<BannerStoreType>((set) => ({
  bannersLists: [],
  bannersError: '',
  isLoading: false,
  getBannersLists: async () => {
    set({ bannersError: '' });
    set({ isLoading: true });
    
    return await axios.get('/api/banners', { withCredentials: true })
      .then(response => {
        set({ bannersLists: response?.data?.data });
        set({ isLoading: false });
        return response.data;
      }).catch(err => {
        console.error('filterStore err:', err);
        set({ isLoading: false });
        set({ bannersError: err?.response?.data?.message });
      });
  },
  addBanners: () => set(state => {
    const maxId = isEmpty(state.bannersLists) ? 1 : Math.max(...state.bannersLists.map(v => v.id)) + 1;
    const maxRank = isEmpty(state.bannersLists) ? 1 : Math.max(...state.bannersLists.map(v => v.order_rank)) + 1;
    const newList = update(state.bannersLists, {
      $push: [{
        id: maxId,
        created_at: null,
        dp_yn: true,
        image_ori_name: null,
        image_url: null,
        image_size: null,
        image_file: null,
        link_target: null,
        link_type: null,
        title: null,
        order_rank: maxRank,
      }]
    });
    const banner = newList.filter((c) => `${c.id}` === maxId.toString())[0];

    const moveList = update(state.bannersLists, {
      $splice: [
        [maxRank, 1],
        [0, 0, banner],
      ],
    });

    const newBanners = moveList.map((banner, index) => {
      return { ...banner, order_rank: index + 1 }
    });

    set({
      bannersLists: newBanners
    });
  }),
  moveBanners: (id, atIndex) => set(state => {
    const banner = state.bannersLists.filter((c) => `${c.id}` === id)[0];
    const index = state.bannersLists.indexOf(banner);
    const moveBanners = update(state.bannersLists, {
      $splice: [
        [index, 1],
        [atIndex, 0, banner],
      ],
    });
    const newBanners = moveBanners.map((banner, index) => {
      return { ...banner, order_rank: index + 1 }
    });

    set({ bannersLists: newBanners });
  }),
  setBannerDpYn: (index, checked) => set(state => {
    set({
      bannersLists:
        update(state.bannersLists, {
          [index]: { dp_yn: { $set: checked } }
        })
    })
  }),
  removeBanner: (index) => set(state => {
    const removeList = update(state.bannersLists, {
      $splice: [[index, 1]]
    });
    const newList = removeList.map((v, index) => ({ ...v, order_rank: index + 1 }))
    set({ bannersLists: newList })
  }),
  setBannerType: (index, value) => set(state => {
    set({
      bannersLists:
        update(state.bannersLists, {
          [index]: {
            link_type: { $set: value },
            link_target: { $set: null },
            title: { $set: null },
          }
        })
    })
  }),
  setBannerTarget: (index, value) => set(state => {
    set({
      bannersLists:
        update(state.bannersLists, {
          [index]: { link_target: { $set: value } }
        })
    })
  }),
  setBannerViewTitle: (index, value) => set(state => {
    set({
      bannersLists: update(state.bannersLists, {
        [index]: { title: { $set: value } }
      })
    })
  }),
  setBannerImageFile: (index, file, imageUrl) => set(state => {
    set({
      bannersLists: update(state.bannersLists, {
        [index]: {
          image_file: { $set: file },
          image_url: { $set: imageUrl },
          image_size: { $set: file.size },
          image_ori_name: { $set: file.name },
        }
      })
    })
  }),
  resetStore: () => {
    set({ bannersLists: [] });
  }
}));

export const useTrackedBannerStore = createTrackedSelector(bannerStore);

