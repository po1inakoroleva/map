import { FC } from 'react';
import { useFormik } from 'formik';

import {
  Grid, TextField, Button, Typography,
} from '@mui/material';

import { useAppDispatch } from '../../hooks';
import { modalActions } from '../../slices/modalSlice';
import { markersActions } from '../../slices/markersSlice';
import { searchingResultsActions } from '../../slices/searchingResultsSlice';

interface AddMarkerFormProps {
  id: string;
  address: string;
  coordinates: [number, number];
}

interface FormValues {
  name: string;
  description: string;
}

const AddMarkerForm: FC<AddMarkerFormProps> = ({ id, address, coordinates }) => {
  const dispatch = useAppDispatch();

  const initialValues: FormValues = {
    name: '',
    description: '',
  };

  const formik = useFormik<FormValues>({
    initialValues,
    onSubmit: ({ name, description }) => {
      const marker = {
        id,
        address,
        coordinates,
        name,
        description,
      };

      dispatch(markersActions.addMarker(marker));
      dispatch(modalActions.close());
      dispatch(searchingResultsActions.clearSearchingResults());
    },
  });

  const handleClose = () => {
    dispatch(modalActions.close());
  };

  return (
    <>
    <Typography id="modal-modal-title" className="modal-title">
      Добавить маркер
    </Typography>
    <form onSubmit={formik.handleSubmit}>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Typography variant="subtitle1" gutterBottom>
            Адрес: {address}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle1" gutterBottom>
            Координаты: {coordinates.join(', ')}
          </Typography>
        </Grid>
        <Grid item>
        <TextField
            id="name"
            name="name"
            variant="outlined"
            fullWidth
            label="Наименование"
            placeholder="Введите наименование маркера"
            value={formik.values.name}
            onChange={formik.handleChange}
            required
          />
        </Grid>
        <Grid item>
          <TextField
            id="description"
            name="description"
            variant="outlined"
            fullWidth
            label="Описание"
            placeholder="Введите описание маркера"
            value={formik.values.description}
            onChange={formik.handleChange}
            required
          />
        </Grid>
        </Grid>
        <Grid container spacing={2} className="buttons-container">
        <Grid item>
          <Button variant="outlined" type="submit">
            Сохранить
          </Button>
        </Grid>
        <Grid item>
        <Button onClick={() => handleClose()} variant="outlined" color="error" type="button">
          Отменить
        </Button>
        </Grid>
      </Grid>
    </form>
    </>
  );
};

export default AddMarkerForm;
