import React, { CSSProperties, FC, memo, useCallback } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useTrackedBannerStore } from '@zustand/BannersStore';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Switch from '@mui/material/Switch';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import moment from 'moment';
import { isEmpty } from '@utils/string';
import SmallTextField from '@components/custom/textField/SmallTextField';

/* 삭제 버튼 */
const SmallButton = styled('button')(
  ({ theme }) => ({
    padding: "3px 10px",
    backgroundColor: "#4d5cab",
    color: "#fff",
    display: "inline-block",
    border: "1px solid #fff",
    fontSize: "12",
    borderRadius: "5px",
    cursor: 'pointer'
  })
);

interface CardProps {
  id: string
  moveCard: (id: string, to: number) => void
}

const linkType = [
  { type: 'empty', typeTitle: '링크X' },
  { type: 'notice', typeTitle: '공지사항' },
  { type: 'cafe', typeTitle: '' },
  { type: 'magazine', typeTitle: '매거진' },
  { type: 'view', typeTitle: '웹뷰' },
  { type: 'url', typeTitle: '외부연결' },
  { type: 'joincafe', typeTitle: '등록 페이지' },
]

export const Card: FC<CardProps> = memo(function Card({ id, moveCard, }) {
  const bannersStore = useTrackedBannerStore();

  const findBanner = useCallback((id: string) => {
    const banner = bannersStore.bannersLists.filter((c) => `${c.id}` === id)[0];
    return {
      banner,
      index: bannersStore.bannersLists.indexOf(banner),
    }
  }, [bannersStore.bannersLists]);

  const originalIndex = findBanner(id).index;
  const banner = bannersStore.bannersLists[originalIndex];

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'card',
    item: { id, originalIndex },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const { id: droppedId, originalIndex } = item
      const didDrop = monitor.didDrop()
      if (!didDrop) {
        moveCard(droppedId, originalIndex)
      }
    },
  }), [id, originalIndex, moveCard]);

  const [, drop] = useDrop(() => ({
    accept: 'card',
    canDrop: () => false,
    hover({ id: draggedId }: { id: string; }) {
      if (draggedId !== id) {
        const { index: overIndex } = findBanner(id)
        moveCard(draggedId, overIndex)
      }
    },
  }), [findBanner, moveCard]);

  // 노출 변경
  const handleChangeStatusSwitch = useCallback((e, index) => {
    const { target: { checked } } = e;
    bannersStore.setBannerDpYn(index, checked);
  }, []);

  // 삭제 버튼
  const handleClickDeleteButton = useCallback((e, index) => {
    bannersStore.removeBanner(index);
  }, []);

  // 링크 설정 변경
  const handleChangeType = useCallback((e, index) => {
    const { value } = e.target;
    bannersStore.setBannerType(index, value);
  }, []);

  // 링크 타겟 변경
  const handleChangeTarget = useCallback((e, index) => {
    const { value } = e.target;
    bannersStore.setBannerTarget(index, value);
  }, []);

  // 웹뷰 타이틀
  const handleChangeTitle = useCallback((e, index) => {
    const { value } = e.target;
    bannersStore.setBannerViewTitle(index, value);
  }, []);

  // 사진 변경
  const handleChangeImage = useCallback((e, index) => {

    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      bannersStore.setBannerImageFile(index, file, reader.result);
    };
    if(file) reader.readAsDataURL(file);
  }, []);

  return (
    <TableRow ref={(node) => drag(drop(node))} hover onClick={(event) => { }} key={'banner-' + banner.id}>
      <TableCell padding="none" align="center" onClick={() => { }} sx={{ cursor: 'pointer' }}>{banner.order_rank}</TableCell>
      <TableCell padding="none" align="center" onClick={() => { }} sx={{ cursor: 'pointer' }}>
        <Button component="label" onClick={() => { }}>
          <input
            accept="image/*"
            style={{ display: "none" }}
            id={"file-input"}
            name="imageFile"
            type="file"
            multiple={false}
            onChange={(e) => handleChangeImage(e, originalIndex)}
          />
          <div style={{
            display: "inline-flex",
            backgroundImage: `url(${banner.image_url})`,
            width: 200,
            height: 100,
            backgroundSize: "contain",
            border: isEmpty(banner.image_url) ? '1px dashed black' : 'none',
            justifyContent: "center",
            alignItems: "center",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center"
          }}>
            <span style={{ display: !isEmpty(banner.image_url) ? 'none' : "block" }}>이미지 추가</span>
          </div>
        </Button>

      </TableCell>
      <TableCell padding="none" align="center" onClick={() => { }} sx={{ cursor: 'pointer', width: 200 }}>
        <Stack flexDirection="column">
          <Select
            labelId="menu-category-option-label"
            id="menu-category-option-select-box"
            value={banner.link_type || 'empty'}
            onChange={(e) => handleChangeType(e, originalIndex)}
            size="medium"
            style={{ fontSize: 12, fontWeight: 'bolder', color: "#828282", height: 37, width: '100%', marginTop: 3 }}
          >
            {linkType.map((v, index) => (
              <MenuItem
                key={'banner-type-' + index + v.type}
                value={v.type}
              >{v.typeTitle}</MenuItem>
            ))}
          </Select>
          {!isEmpty(banner.link_type) &&
            banner.link_type !== 'empty' &&
            banner.link_type !== 'joincafe' &&
            <Stack>
              {banner.link_type === 'url' &&
                <SmallTextField
                  title="외부 연결 URL"
                  name={"banner"}
                  id={`banner-url-${banner.id}`}
                  type="text"
                  value={banner?.link_target || ''}
                  handleChange={(e) => handleChangeTarget(e, originalIndex)}
                  handleBlur={() => { }}
                  helperText={''}
                  error={false} disabled={false} />
              }
              {banner.link_type === 'view' &&
                <>
                  <SmallTextField
                    title="외부 연결 URL"
                    name={"view"}
                    id={`banner-view-${banner.id}`}
                    type="text"
                    value={banner?.link_target || ''}
                    handleChange={(e) => handleChangeTarget(e, originalIndex)}
                    handleBlur={() => { }}
                    helperText={''}
                    error={false} disabled={false} />
                  <SmallTextField
                    title="뷰 제목"
                    name={"banner"}
                    id={`banner-view-title${banner.id}`}
                    type="text"
                    value={banner?.title || ''}
                    handleChange={(e) => handleChangeTitle(e, originalIndex)}
                    handleBlur={() => { }}
                    helperText={''}
                    error={false} disabled={false} />
                </>
              }
              {banner.link_type !== 'url' && banner.link_type !== 'view' &&
                <SmallTextField
                  title="Target No"
                  name={"banner"}
                  id={`banner-url-${banner.id}`}
                  type="text"
                  value={banner?.link_target || ''}
                  handleChange={(e) => handleChangeTarget(e, originalIndex)}
                  handleBlur={() => { }}
                  helperText={''}
                  error={false} disabled={false} />
              }
            </Stack>
          }
        </Stack>
      </TableCell>
      <TableCell padding="none" align="center" onClick={() => { }} sx={{ cursor: 'pointer' }}>
        {banner.created_at === null ? moment().format('YYYY-MM-DD HH:mm') : moment(banner.created_at).format('YYYY-MM-DD HH:mm')}
      </TableCell>
      <TableCell padding="none" align="center" onClick={() => { }} sx={{ cursor: 'pointer' }}>
        <Switch
          checked={banner.dp_yn || false}
          onChange={(e) => handleChangeStatusSwitch(e, originalIndex)}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      </TableCell>
      <TableCell padding="none" align="center">
        <SmallButton
          onClick={(e) => handleClickDeleteButton(e, originalIndex)}
          style={{ backgroundColor: "#4d5cab" }}
        >
          삭제
        </SmallButton>
      </TableCell>
    </TableRow>
  )
});