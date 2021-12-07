import React, { FC, useRef, memo, useEffect } from 'react';
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd';
import { XYCoord } from 'dnd-core';
import { styled } from '@mui/material/styles';

const ImageDiv = styled('div')(
  ({ theme }) => ({
    padding: 5,
    display: "inline-block",
    marginBottom: '.5rem',
    backgroundColor: 'white',
    cursor: 'move',
    width: "auto",
    margin: 2
  })
);

/* 수정, 삭제 버튼 */
const SmallButton = styled('div')(
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

export interface CardProps {
  id: any,
  dataURL: string | null | undefined,
  index: number,
  moveCard: (dragIndex: number, hoverIndex: number) => void,
  onImageUpdate: (updateIndex: number) => void,
  onImageRemove: (updateIndex: number) => void,
}

interface DragItem {
  index: number
  id: string
  type: string
}

const DndCard: FC<CardProps> = ({ id, dataURL, index, moveCard, onImageUpdate, onImageRemove }) => {
  // useEffect( () => {console.log('id', id)} ,[]);
  // useEffect( () => {console.log('dataURL')} ,[]);
  // useEffect( () => {console.log('index', index)} ,[]);
  // useEffect( () => {console.log('moveCard')} ,[]);
  // useEffect( () => {console.log('onImageUpdate')} ,[]);
  // useEffect( () => {console.log('onImageRemove')} ,[]);
  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop({
    accept: 'card',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item: DragItem, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      // Determine mouse position
      const clientOffset = monitor.getClientOffset()

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex)

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: 'card',
    item: () => {
      return { id, index }
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));
  return (
    <ImageDiv ref={ref} data-handler-id={handlerId} key={index} style={{ opacity, border: index < 5 ? '1px dashed #4d5cab' : '1px dashed #d8d8d8', }}>
      <p style={{textAlign: "center", fontSize: "10", color: "#4d5cab"}}>{index < 5 ? "대표사진 - " + (index + 1) : (index + 1)}</p>
      <div style={{ backgroundImage: `url(${dataURL})`, height: 90, width: 90, backgroundSize: "cover", backgroundPosition: "center" }} />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <SmallButton onClick={() => onImageUpdate(index)}>수정</SmallButton>
        <SmallButton onClick={() => onImageRemove(index)}>삭제</SmallButton>
      </div>
    </ImageDiv>
  );
}


export default memo(DndCard);