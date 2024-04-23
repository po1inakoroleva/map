import { FC } from 'react';

import {
  List, ListItemButton, ListItemText, Typography,
} from '@mui/material';

import { useAppSelector, useAppDispatch } from '../hooks';
import { markersSelectors } from '../slices/markersSlice';
import { mapActions } from '../slices/mapSlice';

const MarkersList: FC = () => {
  const dispatch = useAppDispatch();
  const markers = useAppSelector(markersSelectors.getMarkers);

  const handleClick = (markerCoordinates: [number, number]) => {
    dispatch(mapActions.setMapCenter(markerCoordinates));
  };

  return (
    <List className="list-container markers-list">
      {markers.map((marker, index) => (
        <ListItemButton key={index} onClick={() => handleClick(marker.coordinates)}>
          <ListItemText>
            <Typography variant="body1">
              {marker.name}
            </Typography>
            <Typography variant="body2">
              {marker.address}
            </Typography>
            <Typography variant="body2">
              {marker.coordinates.join(', ')}
            </Typography>
          </ListItemText>
        </ListItemButton>
      ))}
    </List>
  );
};

export default MarkersList;
