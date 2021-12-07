import React, { Dispatch, SetStateAction } from 'react';

interface CafeEditProps {
    onSubmit: (values: any, actions: any) => void;
    categoryError: string;
    setCategoryError: Dispatch<SetStateAction<string>>;
    serviceError: string;
    setServiceError: Dispatch<SetStateAction<string>>;
    submittedError: string;
    isMenuImgUploading: boolean;
    setIsMenuImgUploading: Dispatch<SetStateAction<boolean>>;
    type: string;
}

interface CafeFormProps {
    categoryError: string;
    setCategoryError: Dispatch<SetStateAction<string>>;
    serviceError: string;
    setServiceError: Dispatch<SetStateAction<string>>;
    values: { [field: string]: any };
    handleChange: (e: React.ChangeEvent<any>) => void;
    handleBlur: (e: any) => void;
    touched: { [field: string]: boolean };
    errors: { [field: string]: string };
    type: string;
}

type menuItemTypes = {
    repYn: boolean;
    repRank: number | null;
    repImgUrl: string | null;
    repImgInfo: {};
    menuTitle: string;
    defaultPrice: number | null;
    optionPrice: number | null;
    menuOption: string;
    menuFilter: { code_title: string; code: string; gorup_code: string; group_title: string }[];
}[];

type menuCategoryTypes = {
    id: number;
    categoryTitle: string;
    categoryOption: string;
    menuList: menuItemTypes;
}[];

type CafeMenuGroupFormProps = {
    index: number;
    isMenuImgUploading: boolean;
    setIsMenuImgUploading: Dispatch<SetStateAction<boolean>>;
    type: string;
}

type CafeMenuFormProps = {
    menuIndex: number;
    categoryIndex: number;
    isMenuImgUploading: boolean;
    setIsMenuImgUploading: Dispatch<SetStateAction<boolean>>;
    type: string;
}

type cafeProfileType = {
    bucket: string | null;
    encoding: string | null;
    key: string | null;
    location: string | null;
    mimetype: string | null;
    originalname: string | null;
    size: number | null;
    profileRef: string | null;
    profileRefPath: string | null;
  }

export {
    CafeEditProps,
    CafeFormProps,
    menuItemTypes,
    menuCategoryTypes,
    CafeMenuGroupFormProps,
    CafeMenuFormProps,
    cafeProfileType
}
