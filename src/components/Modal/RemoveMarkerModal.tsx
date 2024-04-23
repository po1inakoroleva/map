import { FC } from 'react';

import { Grid, Button, Typography } from '@mui/material';

import { useAppDispatch } from '../../hooks';
import { modalActions } from '../../slices/modalSlice';
import { markersActions } from '../../slices/markersSlice';

interface RemoveModalProps {
  id: string;
  name: string,
  address: string;
}

const RemoveModal: FC<RemoveModalProps> = ({ id, name, address }) => {
  const dispatch = useAppDispatch();

  const handleRemove = () => {
    dispatch(markersActions.removeMarker(id));
    dispatch(modalActions.close());
  };

  const handleClose = () => {
    dispatch(modalActions.close());
  };

  return (
    <>
    <Typography id="modal-modal-title" className="modal-title">
      Удалить маркер?
    </Typography>
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Typography variant="subtitle1">
        Наименование: {name}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="subtitle1" gutterBottom>
        Адрес: {address}
        </Typography>
      </Grid>
    </Grid>
    <Grid container spacing={2} className="buttons-container">
      <Grid item>
        <Button onClick={() => handleRemove()} variant="outlined" color="error" type="button">
          Удалить
        </Button>
      </Grid>
      <Grid item>
        <Button onClick={() => handleClose()} variant="outlined" type="button">
          Отменить
        </Button>
      </Grid>
    </Grid>
    </>
  );
};

export default RemoveModal;
