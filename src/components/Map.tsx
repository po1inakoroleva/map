import {
  FC, useCallback, useMemo, useRef,
} from 'react';
import Map, { Marker, ViewStateChangeEvent } from 'react-map-gl';

import { Grid } from '@mui/material';

import { useAppSelector, useAppDispatch } from '../hooks';
import { selectViewState, mapActions } from '../slices/mapSlice';
import { markersSelectors } from '../slices/markersSlice';
import { modalActions } from '../slices/modalSlice';
import { MarkerData, ModalPayload } from '../types';

const MapComponent: FC = () => {
  const dispatch = useAppDispatch();
  const viewState = useAppSelector(selectViewState);
  const markers = useAppSelector(markersSelectors.getMarkers);

  const lastClickTimeRef = useRef(0);
  const lastMarkerRef = useRef<MarkerData | null>(null);
  const modalTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleEdit = (marker: MarkerData) => {
    const context: ModalPayload = {
      marker,
      type: 'EDIT',
    };

    dispatch(modalActions.open(context));
  };

  const handleRemove = (marker: MarkerData) => {
    const context: ModalPayload = {
      marker,
      type: 'REMOVE',
    };

    dispatch(modalActions.open(context));
  };

  const handleClick = useCallback((marker: MarkerData) => {
    const now = Date.now();

    if (now - lastClickTimeRef.current < 300 && lastMarkerRef.current === marker) {
      clearTimeout(modalTimeoutRef.current!);
      handleRemove(marker);
    } else {
      modalTimeoutRef.current = setTimeout(() => {
        handleEdit(marker);
      }, 300);
    }

    lastClickTimeRef.current = now;
    lastMarkerRef.current = marker;
  }, [handleEdit, handleRemove]);

  const markersList = useMemo(() => markers.map((marker, index) => (
    <Marker
      key={index}
      longitude={marker.coordinates[0]}
      latitude={marker.coordinates[1]}
      onClick={() => handleClick(marker)}
    />
  )), [markers]);

  const onMove = useCallback((evt: ViewStateChangeEvent) => {
    dispatch(mapActions.setViewState(evt.viewState));
  }, [dispatch]);

  return (
    <Grid item className="map-container">
      <Map
        {...viewState}
        onMove={onMove}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        {markersList}
      </Map>
    </Grid>
  );
};

export default MapComponent;
