import { Container, Grid } from '@mui/material';
import Map from './components/Map';
import Panel from './components/Panel';
import Modal from './components/Modal/Modal';

const App = () => (
  <>
  <Container>
    <Grid container spacing={3}>
      <Panel />
      <Map />
    </Grid>
  </Container>
  <Modal />
  </>
);

export default App;
