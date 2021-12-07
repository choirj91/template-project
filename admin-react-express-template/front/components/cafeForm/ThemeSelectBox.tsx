import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles';
import { useTrackedFilterStore } from '@zustand/FilterStore';
import { EditCafeStore, RegisterCafeStore } from '@zustand/CafeStore';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 2;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const CustomInputLabel = styled(InputLabel)(({ theme }) => ({
  fontSize: 13,
  fontWeight: 'bolder',
  color: "#4d5cab",
  marginTop: -5,
  '& .Mui-focused': {
    marginTop: 10,
    color: "#000",
  },
  '&:focus': {
    marginTop: 10,
    color: "#000",
  },
}));

type ThemeSelectBoxProps = {
  type: string;
}

export default function ThemeSelectBox({ type }: ThemeSelectBoxProps) {
  const isEdit = type === 'edit' ? true : false;
  const cafeState = isEdit ? EditCafeStore() : RegisterCafeStore();
  const filterState = useTrackedFilterStore();
  const allThemeLists = filterState.filterLists?.data?.theme_lists;

  const handleChange = (event: SelectChangeEvent<typeof cafeState.themeLists>) => {
    const {
      target: { value },
    } = event;
    cafeState.setThemeLists(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <FormControl sx={{ width: "100%" }} style={{ marginTop: 8 }}>
      <CustomInputLabel id="theme-label"> 테마</CustomInputLabel>
      <Select
        labelId="theme-label"
        id="theme-select-box"
        multiple
        value={cafeState.themeLists || []}
        onChange={handleChange}
        input={<OutlinedInput label=" 테마" />}
        renderValue={(selected) => selected.join(', ')}
        MenuProps={MenuProps}
        size="small"
        style={{ fontSize: 12, fontWeight: 'bolder', color: "#828282", height: 37 }}
      >
        {allThemeLists && allThemeLists.map((obj: { code_title: string; code: string; }) => (
          <MenuItem key={obj.code_title} value={obj.code_title} id={obj.code}>
            <Checkbox checked={cafeState.themeLists?.indexOf(obj.code_title) > -1} />
            <ListItemText primary={obj.code_title} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}