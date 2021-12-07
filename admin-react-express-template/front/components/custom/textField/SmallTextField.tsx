import React, {memo, useEffect} from 'react';
import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';

const CssTextField = styled(TextField)({
    '& .MuiInputLabel-root': {
        fontSize: 14,
    },
    '& .MuiInputBase-input': {
        fontSize: 14,
    },
});

type Props = {
    title: string,
    id: string,
    name: string,
    type: string,
    value: string | number,
    error: boolean,
    helperText: string | false | undefined,
    handleChange: (e: React.ChangeEvent<any>) => void,
    handleBlur: (e: any) => void,
    disabled: boolean,
    required? : boolean, // Optional Property(선택적 프로퍼티)
    [key: string]: any; // ...rest 처리
}

const SmallTextField = ({ title, id, name, type, value, handleBlur, handleChange, error, helperText, disabled, required, ...rest }: Props) => {

    return (
        <CssTextField
            disabled={disabled}
            size="small"
            error={error}
            fullWidth
            helperText={helperText}
            label={title}
            margin="dense"
            name={name}
            id={id}
            onBlur={handleBlur}
            onChange={handleChange}
            type={type}
            value={value}
            variant="outlined"
            required={required}
            {...rest}
        />
    );
}

export default memo(SmallTextField);
