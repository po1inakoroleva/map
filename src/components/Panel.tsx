import { FC } from 'react';
import { Grid, Paper, Typography } from '@mui/material';

import SearchForm from './SearchForm';
import MarkersList from './MarkersList';

const Panel: FC = () => (
  <Grid item className='panel'>
    <Grid container direction="column" spacing={2}>
      <Grid item>
    <Paper elevation={3} style={{ padding: 20 }}>
      <SearchForm />
    </Paper>
    </Grid>
    <Grid item>
    <Typography className="markers-list-title" gutterBottom>
      Список маркеров
    </Typography>
    <Paper elevation={3} style={{ padding: 20 }}>
      <MarkersList />
    </Paper>
    </Grid>
    </Grid>
  </Grid>
);

export default Panel;
