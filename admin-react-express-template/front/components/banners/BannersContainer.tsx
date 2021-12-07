import React, { FC, memo, useCallback } from 'react';
import { useTrackedBannerStore } from '@zustand/BannersStore';
import { useDrop } from 'react-dnd';
import { Card } from './Card'
import TableBody from '@mui/material/TableBody';

export const BannersContainer: FC = memo(function Container() {
  const bannersStore = useTrackedBannerStore();

  const moveCard = useCallback((id: string, atIndex: number) => {
    bannersStore.moveBanners(id, atIndex);
  }, [bannersStore.bannersLists]);

  const [, drop] = useDrop(() => ({ accept: 'card' }))
  return (
    <TableBody ref={drop}>
      {bannersStore.bannersLists.map((card) => (
        <Card
          key={'banner-card-' + card.id}
          id={`${card.id}`}
          moveCard={moveCard}
        />
      ))}
    </TableBody>
  )
});
