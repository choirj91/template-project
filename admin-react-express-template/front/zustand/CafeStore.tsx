import create from 'zustand';
import axios from 'axios';
import { createTrackedSelector } from 'react-tracked';
import update from 'immutability-helper';
import { isEmpty } from '@utils/string';

type menuItemFilterTypes = {
  code: string;
  code_title: string;
  group_code: string;
  group_title: string;
}[];

type menuItemTypes = {
  menuNumber: number;
  repYn: boolean;
  repRank: number | null;
  repImgUrl: string | null;
  repImgInfo: {};
  menuTitle: string;
  defaultPrice: number | null;
  optionPrice: number | null;
  menuOption: string;
  menuFilter: menuItemFilterTypes | [];
};

type menuGroupTypes = {
  id: number;
  categoryTitle: string;
  categoryOption: string;
  menuList: menuItemTypes[];
};

type cafeInfoTypes = {
  cafeTitle: string;
  cafeTel: string;
  cafeIntro: string;
  cafeContents: string;
  openMonHours: string;
  closeMonHours: string;
  openTuesHours: string;
  closeTuesHours: string;
  openWednesHours: string;
  closeWednesHours: string;
  openThursHours: string;
  closeThursHours: string;
  openFriHours: string;
  closeFriHours: string;
  openSaturHours: string;
  closeSaturHours: string;
  openSunHours: string;
  closeSunHours: string;
  cafeOffday: string;
  cafeOldAddress: string;
  cafeRoadAddress: string;
  cafeSido: string;
  cafeSiGnGu: string;
  cafeEMD: string;
  cafeLatitude: string;
  cafeLongitude: string;
  profileImgUrl: string;
  imgRef: string;
  imgRefPath: string;
};

type cafeProfileType = {
  bucket: string | null;
  encoding: string | null;
  key: string | null;
  location: string | null;
  mimetype: string | null;
  originalname: string | null;
  size: number | null;
  type: string | null;
  profileRef: string | null;
  profileRefPath: string | null;
}

type cafeState = {
  cafeInfo: cafeInfoTypes;
  profileImg: cafeProfileType | null;
  setProfileImg: (newProfileImg: cafeProfileType) => void;
  setProfileImgValue: (valueName: string, value: string) => void;
  removeProfileImg: () => void;
  resetCafeState: () => void;
  menuGroupList: menuGroupTypes[];
  setMenuGroupList: (menuGroupValue: menuGroupTypes, index: number) => void;
  setMenuGroupValue: (valueTitle: string, value: string, index: number) => void;
  addMenuGroupList: (index: number) => void;
  removeMenuGroup: (index: number) => void;
  getCafeData: (responseData: any) => void;
  errorCafeData: string;
  themeLists: string[];
  setThemeLists: (themeLists: string[]) => void;
  categoryLists: { id: number; categoryName: string; categoryCode: string; typeRank: number; displayYn: boolean; }[];
  setCategoryLists: (newCategoryList: { id: number; categoryName: string; categoryCode: string; typeRank: number; displayYn: boolean; }[]) => void;
  addCategoryLists: (id: number, typeRank: number) => void;
  removeCategoryLists: (index: number) => void;
  serviceLists: { id: number; serviceName: string; serviceCode: string; serviceContents: string; }[];
  addServiceLists: (id: number) => void;
  setServiceLists: (newServiceLists: { id: number; serviceName: string; serviceCode: string; serviceContents: string; }[]) => void;
  setServiceValue: (index: number, name: string, value: string) => void;
  setServiceName: (index: number, value: string, code: string) => void;
  removeService: (index: number) => void;
  setMenuItemList: (newMenuItemList: menuItemTypes[], groupIndex: number) => void;
  addMenuItem: (newMenuItem: menuItemTypes, groupIndex: number) => void;
  setMenuItem: (newMenuItem: menuItemTypes, groupIndex: number, menuIndex: number) => void;
  setMenuFilter: (newMenuFilter: menuItemFilterTypes, groupIndex: number, menuIndex: number) => void;
  removeMenuItem: (groupIndex: number, menuIndex: number) => void;
  setCafeDataError: (msg: string) => void;
  resetCafeData: () => void;
}

const defaultCafeInfo = {
  cafeTitle: '',
  cafeTel: '',
  cafeIntro: '',
  cafeContents: '',
  openMonHours: '',
  closeMonHours: '',
  openTuesHours: '',
  closeTuesHours: '',
  openWednesHours: '',
  closeWednesHours: '',
  openThursHours: '',
  closeThursHours: '',
  openFriHours: '',
  closeFriHours: '',
  openSaturHours: '',
  closeSaturHours: '',
  openSunHours: '',
  closeSunHours: '',
  cafeOffday: '',
  cafeOldAddress: '',
  cafeRoadAddress: '',
  cafeSido: '',
  cafeSiGnGu: '',
  cafeEMD: '',
  cafeLatitude: '',
  cafeLongitude: '',
  profileImgUrl: '',
  imgRef: '',
  imgRefPath: '',
};

type cafeImages = {
  images: { index: number; dataURL: string; file: File | undefined; rank: number; fileName: string; }[];
  setImages: (newList: any) => void;
  moveImages: (dragIndex: number, hoverIndex: number) => void;
  resetImages: () => void;
  getImages: (newImages: any) => void;
}

export const cafeImagesStore = create<cafeImages>(set => ({
  images: [],
  setImages: (newList) => set({ images: newList }),
  moveImages: (dragIndex, hoverIndex) => set(state => {
    const dragImage = state.images[dragIndex];
    const changeImges = update(state.images, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, dragImage],
      ],
    });
    const newImages = changeImges.map((img, index) => { return { ...img, rank: index } });
    set({ images: newImages });
  }),
  resetImages: () => set({images: []}),
  getImages: (newImages) => set({ images: newImages})
}));


export const EditCafeStore = create<cafeState>(set => ({
  cafeInfo: defaultCafeInfo,
  profileImg: null,
  setProfileImg: (newProfileImg) => set({ profileImg: newProfileImg }),
  setProfileImgValue: (valueName, value) => set(state => {
    if (isEmpty(state.profileImg)) {
      const defaultValue = {
        bucket: null,
        encoding: null,
        key: null,
        location: null,
        mimetype: null,
        originalname: null,
        size: null,
        type: 'default',
        profileRef: null,
        profileRefPath: null,
      };
      return ({ profileImg: update(defaultValue, { [valueName]: { $set: value } }) });
    } else return ({ profileImg: update(state.profileImg, { [valueName]: { $set: value } }) });
  }),
  removeProfileImg: () => set(state => {
    const defaultValue = {
      bucket: null,
      encoding: null,
      key: null,
      location: null,
      mimetype: null,
      originalname: null,
      size: null,
      type: 'default',
      profileRef: null,
      profileRefPath: null,
    };
    return ({ profileImg: defaultValue });
  }),
  resetCafeState: () => {
    set({ cafeInfo: defaultCafeInfo });
    // set({ images: [] });
    set({ categoryLists: [] });
    set({ themeLists: [] });
    set({ serviceLists: [] });
    set({ menuGroupList: [] });
    set({ profileImg: null });
  },
  menuGroupList: [],
  setMenuGroupList: (menuGroupValue, index) => set(state => ({ menuGroupList: update(state.menuGroupList, { [index]: { $set: menuGroupValue } }) })),
  setMenuGroupValue: (valueTitle, value, index) => set(state => {
    const newGroupList = update(state.menuGroupList, {
      [index]: {
        [valueTitle]: { $set: value }
      }
    });
    return ({ menuGroupList: newGroupList });
  }),
  addMenuGroupList: (index) => set(state => ({ menuGroupList: update(state.menuGroupList, { $push: [{ id: index, categoryTitle: '', categoryOption: 'default', menuList: [] }] }) })),
  removeMenuGroup: (index) => set(state => ({ menuGroupList: update(state.menuGroupList, { $splice: [[index, 1]] }) })),
  setMenuItemList: (newMenuItemList, groupIndex) => set(state => ({ menuGroupList: update(state.menuGroupList, { [groupIndex]: { menuList: { $set: newMenuItemList } } }) })),
  addMenuItem: (newMenuItem, groupIndex) => set(state => ({ menuGroupList: update(state.menuGroupList, { [groupIndex]: { menuList: { $push: [newMenuItem] } } }) })),
  setMenuItem: (newMenuItem, groupIndex, menuIndex) => set(state => ({ menuGroupList: update(state.menuGroupList, { [groupIndex]: { menuList: { [menuIndex]: { $set: newMenuItem } } } }) })),
  setMenuFilter: (newMenuFilter, groupIndex, menuIndex) => set(state => ({ menuGroupList: update(state.menuGroupList, { [groupIndex]: { menuList: { [menuIndex]: { menuFilter: { $set: newMenuFilter } } } } }) })),
  removeMenuItem: (groupIndex, menuIndex) => set(state => ({ menuGroupList: update(state.menuGroupList, { [groupIndex]: { menuList: { $splice: [[menuIndex, 1]] } } }) })),
  errorCafeData: '',
  categoryLists: [],
  setCategoryLists: (newCategoryList) => set({ categoryLists: newCategoryList }),
  removeCategoryLists: (index) => set(state => ({ categoryLists: update(state.categoryLists, { $splice: [[index, 1]] }) })),
  addCategoryLists: (id, typeRank) => set(state => ({ categoryLists: update(state.categoryLists, { $push: [{ id: id, categoryName: '', categoryCode: '', typeRank: typeRank, displayYn: true }] }) })),
  themeLists: [],
  setThemeLists: (themeLists) => set({ themeLists: themeLists }),
  serviceLists: [],
  setServiceLists: (newServiceLists) => set({ serviceLists: newServiceLists }),
  setServiceValue: (index, name, value) => set(state => {
    const newServiceLists = update(state.serviceLists, {
      [index]: {
        [name]: { $set: value }
      }
    });
    set({ serviceLists: newServiceLists });
  }),
  setServiceName: (index, value, code) => set(state => {
    const newServiceLists = update(state.serviceLists, {
      [index]: {
        serviceName: { $set: value },
        serviceCode: { $set: code }
      }
    });
    set({ serviceLists: newServiceLists });
  }),
  removeService: (index) => set(state => {
    const newServiceLists = update(state.serviceLists, {
      $splice: [[index, 1]]
    });
    set({ serviceLists: newServiceLists });
  }),
  addServiceLists: (id) => set(state => ({ serviceLists: update(state.serviceLists, { $push: [{ id: id, serviceName: '', serviceCode: '', serviceContents: '' }] }) })),
  getCafeData: async (responseData) => {
    set({ cafeInfo: responseData || {} });
    set({ categoryLists: responseData?.categoryLists || [] });
    set({ themeLists: responseData?.themeLists || [] });
    set({ serviceLists: responseData?.serviceLists || [] });
    set({ menuGroupList: responseData?.menuCategoryList || [] });
    // set({ images: responseData?.cafeImages || [] });
    set({
      profileImg: isEmpty(responseData?.profileImgUrl) ? null
        : {
          bucket: null,
          encoding: null,
          key: null,
          location: responseData?.profileImgUrl,
          mimetype: null,
          originalname: null,
          size: null,
          type: 'default',
          profileRef: responseData?.imgRef,
          profileRefPath: responseData?.imgRefPath,
        }
    });
  },
  setCafeDataError: (msg) => set({ errorCafeData: msg }),
  resetCafeData: () => { set({ cafeInfo: defaultCafeInfo }) },
}));

export const useTrackedEditCafeStore = createTrackedSelector(EditCafeStore);

export const RegisterCafeStore = create<cafeState>(set => ({
  cafeInfo: defaultCafeInfo,
  profileImg: null,
  setProfileImg: (newProfileImg) => set({ profileImg: newProfileImg }),
  setProfileImgValue: (valueName, value) => set(state => {
    if (isEmpty(state.profileImg)) {
      const defaultValue = {
        bucket: null,
        encoding: null,
        key: null,
        location: null,
        mimetype: null,
        originalname: null,
        type: 'add',
        size: null,
        profileRef: null,
        profileRefPath: null,
      };
      return ({ profileImg: update(defaultValue, { [valueName]: { $set: value } }) });
    } else return ({ profileImg: update(state.profileImg, { [valueName]: { $set: value } }) });
  }),
  removeProfileImg: () => set(state => {
    const defaultValue = {
      bucket: null,
      encoding: null,
      key: null,
      location: null,
      mimetype: null,
      originalname: null,
      size: null,
      type: 'delete',
      profileRef: null,
      profileRefPath: null,
    };
    return ({ profileImg: defaultValue });
  }),
  resetCafeState: () => {
    set({ cafeInfo: defaultCafeInfo });
    // set({ images: [] });
    set({ categoryLists: [] });
    set({ themeLists: [] });
    set({ serviceLists: [] });
    set({ menuGroupList: [] });
    set({ profileImg: null });
  },
  menuGroupList: [],
  setMenuGroupList: (menuGroupValue, index) => set(state => ({ menuGroupList: update(state.menuGroupList, { [index]: { $set: menuGroupValue } }) })),
  setMenuGroupValue: (valueTitle, value, index) => set(state => {
    const newGroupList = update(state.menuGroupList, {
      [index]: {
        [valueTitle]: { $set: value }
      }
    });
    return ({ menuGroupList: newGroupList });
  }),
  addMenuGroupList: (index) => set(state => ({ menuGroupList: update(state.menuGroupList, { $push: [{ id: index, categoryTitle: '', categoryOption: 'default', menuList: [] }] }) })),
  removeMenuGroup: (index) => set(state => ({ menuGroupList: update(state.menuGroupList, { $splice: [[index, 1]] }) })),
  setMenuItemList: (newMenuItemList, groupIndex) => set(state => ({ menuGroupList: update(state.menuGroupList, { [groupIndex]: { menuList: { $set: newMenuItemList } } }) })),
  addMenuItem: (newMenuItem, groupIndex) => set(state => ({ menuGroupList: update(state.menuGroupList, { [groupIndex]: { menuList: { $push: [newMenuItem] } } }) })),
  setMenuItem: (newMenuItem, groupIndex, menuIndex) => set(state => ({ menuGroupList: update(state.menuGroupList, { [groupIndex]: { menuList: { [menuIndex]: { $set: newMenuItem } } } }) })),
  setMenuFilter: (newMenuFilter, groupIndex, menuIndex) => set(state => ({ menuGroupList: update(state.menuGroupList, { [groupIndex]: { menuList: { [menuIndex]: { menuFilter: { $set: newMenuFilter } } } } }) })),
  removeMenuItem: (groupIndex, menuIndex) => set(state => ({ menuGroupList: update(state.menuGroupList, { [groupIndex]: { menuList: { $splice: [[menuIndex, 1]] } } }) })),
  errorCafeData: '',
  categoryLists: [],
  setCategoryLists: (newCategoryList) => set({ categoryLists: newCategoryList }),
  removeCategoryLists: (index) => set(state => ({ categoryLists: update(state.categoryLists, { $splice: [[index, 1]] }) })),
  addCategoryLists: (id, typeRank) => set(state => ({ categoryLists: update(state.categoryLists, { $push: [{ id: id, categoryName: '', categoryCode: '', typeRank: typeRank, displayYn: true }] }) })),
  themeLists: [],
  setThemeLists: (themeLists) => set({ themeLists: themeLists }),
  serviceLists: [],
  setServiceLists: (newServiceLists) => set({ serviceLists: newServiceLists }),
  setServiceValue: (index, name, value) => set(state => {
    const newServiceLists = update(state.serviceLists, {
      [index]: {
        [name]: { $set: value }
      }
    });
    set({ serviceLists: newServiceLists });
  }),
  setServiceName: (index, value, code) => set(state => {
    const newServiceLists = update(state.serviceLists, {
      [index]: {
        serviceName: { $set: value },
        serviceCode: { $set: code }
      }
    });
    set({ serviceLists: newServiceLists });
  }),
  removeService: (index) => set(state => {
    const newServiceLists = update(state.serviceLists, {
      $splice: [[index, 1]]
    });
    set({ serviceLists: newServiceLists });
  }),
  addServiceLists: (id) => set(state => ({ serviceLists: update(state.serviceLists, { $push: [{ id: id, serviceName: '', serviceCode: '', serviceContents: '' }] }) })),
  getCafeData: async (responseData) => {
    set({ cafeInfo: responseData || {} });
    set({ categoryLists: responseData?.categoryLists || [] });
    set({ themeLists: responseData?.themeLists || [] });
    set({ serviceLists: responseData?.serviceLists || [] });
    set({ menuGroupList: responseData?.menuCategoryList || [] });
    // set({ images: responseData?.cafeImages || [] });
    set({
      profileImg: isEmpty(responseData?.profileImgUrl) ? null
        : {
          bucket: null,
          encoding: null,
          key: null,
          location: responseData?.profileImgUrl,
          mimetype: null,
          originalname: null,
          size: null,
          type: 'default',
          profileRef: responseData?.imgRef,
          profileRefPath: responseData?.imgRefPath,
        }
    });
  },
  setCafeDataError: (msg) => set({ errorCafeData: msg }),
  resetCafeData: () => { set({ cafeInfo: defaultCafeInfo }) },
}));

export const useTrackedCafeRegisterStore = createTrackedSelector(RegisterCafeStore);