import { FC } from 'react';
import { useFormik } from 'formik';

import {
  Grid, TextField, Button, List, ListItemButton, ListItemText, CircularProgress,
  Alert,
} from '@mui/material';

import { useAppDispatch, useAppSelector } from '../hooks';
import { searchingResultsSelectors } from '../slices/searchingResultsSlice';
import { geocodeAddress } from '../slices/actions';
import { modalActions } from '../slices/modalSlice';
import { ModalPayload } from '../types';

interface FormValues {
  address: string;
}

const SearchForm: FC = () => {
  const dispatch = useAppDispatch();
  const searchingResults = useAppSelector(searchingResultsSelectors.selectSearchingResults);
  const loadingStatus = useAppSelector(searchingResultsSelectors.selectLoadingStatus);
  const error = useAppSelector(searchingResultsSelectors.selectError);

  const initialValues: FormValues = {
    address: '',
  };

  const formik = useFormik<FormValues>({
    initialValues,
    onSubmit: ({ address }) => {
      dispatch(geocodeAddress(address));
      formik.resetForm();
    },
  });

  const handleAdd = (id: string, address: string, coordinates: [number, number]) => {
    const context: ModalPayload = {
      marker: {
        id,
        address,
        coordinates,
        name: '',
        description: '',
      },
      type: 'ADD',
    };

    dispatch(modalActions.open(context));
  };

  return (
    <form className="search-form" onSubmit={formik.handleSubmit}>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs>
              <TextField
                id="address"
                name="address"
                variant="outlined"
                fullWidth
                label="Поиск"
                placeholder="Введите адрес или название места"
                value={formik.values.address}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item>
              <Button type="submit">
                {loadingStatus === true ? (<CircularProgress />) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
                )}
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <List className='list-container'>
            {searchingResults.map((result, index) => (
              <ListItemButton
                key={index}
                onClick={() => handleAdd(result.id, result.place_name, result.geometry.coordinates)}
              >
                <ListItemText primary={result.place_name} />
              </ListItemButton>
            ))}
          </List>
        </Grid>
        {error ? (
          <Grid item>
            <Alert severity="error">Произошла ошибка. Попробуйте еще раз.</Alert>
          </Grid>
        ) : null}
      </Grid>
    </form>
  );
};

export default SearchForm;
