import create from 'zustand';
import axios from 'axios';
import { createTrackedSelector } from 'react-tracked';
import { isEmpty } from '@utils/string';
import update from 'immutability-helper';
import moment from 'moment';

type cafeInfoType = {
    cafe_address: string;
    cafe_number: number;
    cafe_title: string;
    profile_img_url: string;
};

type MagazineWriterTypes = {
    user_nickname: string;
    user_profile_img_url: string;
};

type MagazineContentsTypes = {
    contents_number: number | null;
    contents_tags: { tag_name: string; id: number; }[] | [];
    contents_subtitle: string | null;
    contents_title: string | null;
    contents_images: {
        image_ref: string | null;
        image_url: string | ArrayBuffer | null;
        image_file: File | null;
        image_size: number | null;
        image_name: string | null;
    }[] | [];
    contents_text: string | null;
    cafe: cafeInfoType | null;
}

type MagazineTypes = {
    image_url: string | ArrayBuffer | null;
    image_file: File | null;
    image_size: number | null;
    image_name: string | null;
    magazine_content: string | null;
    magazine_contents: MagazineContentsTypes[] | [];
    magazine_number: number | null;
    magazine_subtitle: string | null;
    magazine_title: string | null;
    writer: MagazineWriterTypes | null;
    created_at: string | null;
}

interface MagazineStoreType {
    magazine: MagazineTypes,
    getMagazineData: (magazineNumber: number) => void;
    getMagazineError: string;
    addMagazineContents: () => void;
    setMagazineImageFile: (file: File, url: string | ArrayBuffer | null) => void;
    setMagazineValue: (name: string, value: string) => void;
    addContentsTag: (index: number, tag: string) => void;
    removeAllContentsTag: (index: number) => void;
    removeContentsTag: (index: number, tagIndex: number) => void;
    setContentsValue: (contentsIndex: number, name: string, value: string) => void;
    setContentsImageRef: (contentsIndex: number, imgIndex: number, value: string) => void;
    removeContentsImage: (contentsIndex: number, imgIndex: number) => void;
    addContentsImage: (contentsIndex: number, file: File, imageUrl: string | ArrayBuffer | null) => void;
    setContentsCafe: (contentsIndex: number, cafeInfo: cafeInfoType) => void;
    removeContentsCafe: (contentsIndex: number) => void;
    removeContent: (contentsIndex: number) => void;
    resetMagazine: () => void;
}

const magazineEmpty = {
    image_url: null,
    image_file: null,
    image_size: null,
    image_name: null,
    magazine_content: null,
    magazine_contents: [],
    magazine_number: null,
    magazine_subtitle: null,
    magazine_title: null,
    writer: null,
    created_at: null,
};

export const magazineEditStore = create<MagazineStoreType>((set) => ({
    magazine: magazineEmpty,
    resetMagazine: () => set({magazine: magazineEmpty}),
    addMagazineContents: () => set(state => {
        const newMagazine = update(state.magazine, {
            magazine_contents: {
                $push: [{
                    contents_number: null,
                    contents_tags: [],
                    contents_subtitle: null,
                    contents_title: null,
                    contents_images: [],
                    contents_text: null,
                    cafe: null,
                }]
            }
        });
        set({ magazine: newMagazine });
    }),
    getMagazineError: '',
    getMagazineData: async (magazineNumber: number) => {
        return await axios.get(`/api/magazines/${magazineNumber}`, { withCredentials: true })
            .then(response => {
                set({ magazine: response.data?.data || {} });
                return response.data;
            }).catch(err => {
                console.error('getMagazineData err:', err);
                set({ getMagazineError: err?.response?.data?.message });
            });
    },
    setMagazineImageFile: (file, url) => set(state => {
        const newMagazine = update(state.magazine, {
            image_url: { $set: url },
            image_file: { $set: file },
        })
        set({ magazine: newMagazine });
    }),
    setMagazineValue: (name, value) => set(state => {
        const newMagazine = update(state.magazine, {
            [name]: { $set: value }
        })
        set({ magazine: newMagazine });
    }),
    addContentsTag: (index, tag) => set(state => {
        const maxTagId = isEmpty(state.magazine.magazine_contents[index].contents_tags) ? 1 : Math.max(...state.magazine.magazine_contents[index].contents_tags.map(v => v.id)) + 1;

        const newMagazine = update(state.magazine, {
            magazine_contents: {
                [index]: {
                    contents_tags: {
                        $push: [
                            { tag_name: tag, id: maxTagId }
                        ]
                    }
                }
            }
        })
        set({ magazine: newMagazine });
    }),
    removeAllContentsTag: (index) => set(state => {
        const newMagazine = update(state.magazine, {
            magazine_contents: {
                [index]: {
                    contents_tags: {$set: []}
                }
            }
        })
        set({ magazine: newMagazine });
    }),
    removeContentsTag: (index, tagIndex) => set(state => {
        const newMagazine = update(state.magazine, {
            magazine_contents: {
                [index]: {
                    contents_tags: { $splice: [[tagIndex, 1]] }
                }
            }
        })
        set({ magazine: newMagazine });
    }),
    setContentsValue: (contentsIndex, name, value) => set(state => {
        const newMagazine = update(state.magazine, {
            magazine_contents: {
                [contentsIndex]: {
                    [name]: { $set: value }
                }
            }
        })
        set({ magazine: newMagazine });
    }),
    setContentsImageRef: (contentsIndex, imgIndex, value) => set(state => {
        const newMagazine = update(state.magazine, {
            magazine_contents: {
                [contentsIndex]: {
                    contents_images: {
                        [imgIndex]: { image_ref: { $set: value } }
                    }
                }
            }
        })
        set({ magazine: newMagazine });
    }),
    removeContentsImage: (contentsIndex, imgIndex) => set(state => {
        const newMagazine = update(state.magazine, {
            magazine_contents: {
                [contentsIndex]: {
                    contents_images: {
                        $splice: [[imgIndex, 1]]
                    }
                }
            }
        });
        set({ magazine: newMagazine });
    }),
    addContentsImage: (contentsIndex, file, imageUrl) => set(state => {
        const newMagazine = update(state.magazine, {
            magazine_contents: {
                [contentsIndex]: {
                    contents_images: {
                        $push: [{
                            image_ref: null,
                            image_url: imageUrl,
                            image_file: file,
                            image_size: file.size,
                            image_name: file.name
                        }]
                    }
                }
            }
        });
        set({ magazine: newMagazine });
    }),
    setContentsCafe: (contentsIndex, cafe) => set(state => {
        const newMagazine = update(state.magazine, {
            magazine_contents: {
                [contentsIndex]: {
                    cafe: { $set: cafe }
                }
            }
        });
        set({ magazine: newMagazine });
    }),
    removeContentsCafe: (contentsIndex) => set(state => {
        const newMagazine = update(state.magazine, {
            magazine_contents: {
                [contentsIndex]: {
                    cafe: { $set: null }
                }
            }
        });
        set({ magazine: newMagazine });
    }),
    removeContent: (contentsIndex) => set(state => {
        const newMagazine = update(state.magazine, {
            magazine_contents: {
                $splice: [[contentsIndex, 1]]
            }
        });
        set({ magazine: newMagazine });
    }),
}));

export const useTrackedEditStore = createTrackedSelector(magazineEditStore);

export const magazineRegisterStore = create<MagazineStoreType>((set) => ({
    magazine: magazineEmpty,
    resetMagazine: () => set({magazine: magazineEmpty}),
    getMagazineError: '',
    getMagazineData: async (magazineNumber: number) => {
        return await axios.get(`/api/magazines/${magazineNumber}`, { withCredentials: true })
            .then(response => {
                set({ magazine: response.data?.data || {} });
                return response.data;
            }).catch(err => {
                console.error('getMagazineData err:', err);
                set({ getMagazineError: err?.response?.data?.message });
            });
    },
    setMagazineImageFile: (file, url) => set(state => {
        const newMagazine = update(state.magazine, {
            image_url: { $set: url },
            image_file: { $set: file },
        })
        set({ magazine: newMagazine });
    }),
    setMagazineValue: (name, value) => set(state => {
        const newMagazine = update(state.magazine, {
            [name]: { $set: value }
        })
        set({ magazine: newMagazine });
    }),
    addContentsTag: (index, tag) => set(state => {
        const maxTagId = isEmpty(state.magazine.magazine_contents[index].contents_tags) ? 1 : Math.max(...state.magazine.magazine_contents[index].contents_tags.map(v => v.id)) + 1;

        const newMagazine = update(state.magazine, {
            magazine_contents: {
                [index]: {
                    contents_tags: {
                        $push: [
                            { tag_name: tag, id: maxTagId }
                        ]
                    }
                }
            }
        })
        set({ magazine: newMagazine });
    }),
    removeAllContentsTag: (index) => set(state => {
        const newMagazine = update(state.magazine, {
            magazine_contents: {
                [index]: {
                    contents_tags: {$set: []}
                }
            }
        })
        set({ magazine: newMagazine });
    }),
    removeContentsTag: (index, tagIndex) => set(state => {
        const newMagazine = update(state.magazine, {
            magazine_contents: {
                [index]: {
                    contents_tags: { $splice: [[tagIndex, 1]] }
                }
            }
        })
        set({ magazine: newMagazine });
    }),
    setContentsValue: (contentsIndex, name, value) => set(state => {
        const newMagazine = update(state.magazine, {
            magazine_contents: {
                [contentsIndex]: {
                    [name]: { $set: value }
                }
            }
        })
        set({ magazine: newMagazine });
    }),
    addMagazineContents: () => set(state => {
        const newMagazine = update(state.magazine, {
            magazine_contents: {
                $push: [{
                    contents_number: null,
                    contents_tags: [],
                    contents_subtitle: null,
                    contents_title: null,
                    contents_images: [],
                    contents_text: null,
                    cafe: null,
                }]
            }
        });
        set({ magazine: newMagazine });
    }),
    setContentsImageRef: (contentsIndex, imgIndex, value) => set(state => {
        const newMagazine = update(state.magazine, {
            magazine_contents: {
                [contentsIndex]: {
                    contents_images: {
                        [imgIndex]: { image_ref: { $set: value } }
                    }
                }
            }
        })
        set({ magazine: newMagazine });
    }),
    removeContentsImage: (contentsIndex, imgIndex) => set(state => {
        const newMagazine = update(state.magazine, {
            magazine_contents: {
                [contentsIndex]: {
                    contents_images: {
                        $splice: [[imgIndex, 1]]
                    }
                }
            }
        })
        set({ magazine: newMagazine });
    }),
    addContentsImage: (contentsIndex, file, imageUrl) => set(state => {
        const newMagazine = update(state.magazine, {
            magazine_contents: {
                [contentsIndex]: {
                    contents_images: {
                        $push: [{
                            image_ref: null,
                            image_url: imageUrl,
                            image_file: file,
                            image_size: file.size,
                            image_name: file.name
                        }]
                    }
                }
            }
        })
        set({ magazine: newMagazine });
    }),
    setContentsCafe: (contentsIndex, cafe) => set(state => {
        const newMagazine = update(state.magazine, {
            magazine_contents: {
                [contentsIndex]: {
                    cafe: { $set: cafe }
                }
            }
        });
        set({ magazine: newMagazine });
    }),
    removeContentsCafe: (contentsIndex) => set(state => {
        const newMagazine = update(state.magazine, {
            magazine_contents: {
                [contentsIndex]: {
                    cafe: { $set: null }
                }
            }
        });
        set({ magazine: newMagazine });
    }),
    removeContent: (contentsIndex) => set(state => {
        const newMagazine = update(state.magazine, {
            magazine_contents: {
                $splice: [[contentsIndex, 1]]
            }
        });
        set({ magazine: newMagazine });
    }),
}));

export const useTrackedRegisterStore = createTrackedSelector(magazineRegisterStore);
