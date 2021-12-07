import create from 'zustand';
import axios from 'axios';
import { createTrackedSelector } from 'react-tracked';
import { isEmpty } from '@utils/string';


interface NoticeType {
    setNoticeType: (value: string) => void;
    setNoticeTitle: (value: string) => void;
    setNoticeContents: (value: string) => void;
    noticeType: string;
    noticeTitle: string;
    noticeTitleError: string;
    noticeContents: string;
    errorNoticeData: string;
    editCheck: boolean;
    registerSubmit?: (noticeValue: {
        type: string, title: string, contents: string
    }) => void;
    editSubmit?: (id: number, noticeValue: {
        type: string, title: string, contents: string
    }) => void;
    resetNotice: () => void;
}

export const registerStore = create<NoticeType>((set) => ({
    noticeType: 'N',
    setNoticeType: (value) => set(state => {
        set({noticeType: value});
    }),
    noticeTitle: '',
    noticeTitleError: '',
    setNoticeTitle: (value) => set(state => {
        if(value.length >= 255) set({noticeTitleError: "공지 제목이 최대길이를 초과합니다."});
        else set({noticeTitleError: ''});
        set({noticeTitle: value});
    }),
    noticeContents: '',
    setNoticeContents: (value) => set(state => {
        set({noticeContents: value});
    }),
    errorNoticeData: '',
    editCheck: false,
    registerSubmit: async (noticeValue) => {
        set({errorNoticeData: ''});
        return await axios.post(`/api/notices`, noticeValue, { withCredentials: true })
            .then(response => {
                set({noticeType: 'N'});
                set({noticeTitle: ''});
                set({noticeContents: ''});
                set({editCheck: false});
                return 'ok';
            }).catch(err => {
                console.error('cafeInfo err:', err?.response);
                set({ errorNoticeData: err?.response?.data?.message });
                return 'fail';
            });
    },
    resetNotice: () => {
        set({noticeType: 'N'});
        set({noticeTitle: ''});
        set({noticeContents: ''});
        set({editCheck: false});
    }
}));

export const useTrackedRegisterStore = createTrackedSelector(registerStore);

interface EditNoticeType extends NoticeType{
    getNoticeData: (id: number) => void;
}

export const editStore = create<EditNoticeType>(set => ({
    noticeType: '',
    setNoticeType: (value) => set(state => {
        set({noticeType: value});
    }),
    noticeTitle: '',
    noticeTitleError: '',
    setNoticeTitle: (value) => set(state => {
        if(value.length >= 255) set({noticeTitleError: "공지 제목이 최대길이를 초과합니다."});
        else set({noticeTitleError: ''});
        set({noticeTitle: value});
    }),
    noticeContents: '',
    setNoticeContents: (value) => set(state => {
        set({noticeContents: value});
    }),
    errorNoticeData: '',
    editCheck: false,
    getNoticeData: async (id: number) => {
        return await axios.get(`/api/notices/${id}`, { withCredentials: true })
            .then(response => {
                set({ noticeType: response.data?.data?.notice_type || 'N' });
                set({ noticeTitle: response.data?.data?.notice_title || '' });
                set({ noticeContents: response.data?.data?.notice_content || '' });
                set({ editCheck: true });
                return response.data;
            }).catch(err => {
                console.error('cafeInfo err:', err);
                set({ errorNoticeData: err?.response?.data?.message });
            });
    },
    editSubmit: async (id, noticeValue ) => {
        return await axios.post(`/api/notices/${id}`, noticeValue, { withCredentials: true })
            .then(response => {
                set({noticeType: 'N'});
                set({noticeTitle: ''});
                set({noticeContents: ''});
                set({editCheck: false});
                return 'ok';
            }).catch(err => {
                console.error('cafeInfo err:', err);
                set({ errorNoticeData: err?.response?.data?.message });
                return 'fail';
            });
    },
    resetNotice: () => {
        set({noticeType: 'N'});
        set({noticeTitle: ''});
        set({noticeContents: ''});
    }
}));

export const useTrackedEditStore = createTrackedSelector(editStore);
