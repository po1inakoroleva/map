import { FC } from 'react';

import { Modal, Box } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { modalActions, modalSelectors } from '../../slices/modalSlice';
import AddMarkerForm from './AddMarkerForm';
import EditMarkerForm from './EditMarkerForm';
import RemoveMarkerModal from './RemoveMarkerModal';

const ModalWindow: FC = () => {
  const dispatch = useAppDispatch();
  const isOpened = useAppSelector(modalSelectors.isModalOpened);
  const context = useAppSelector(modalSelectors.getModalContext);
  const modalType = useAppSelector(modalSelectors.getModalType);

  const handleClose = () => dispatch(modalActions.close());

  let modalContent = null;
  if (context) {
    switch (modalType) {
      case 'ADD':
        modalContent = <AddMarkerForm
          id={context.id}
          address={context.address}
          coordinates={context.coordinates}
        />;
        break;
      case 'EDIT':
        modalContent = <EditMarkerForm
          id={context.id}
          address={context.address}
          coordinates={context.coordinates}
          name={context.name}
          description={context.description}
        />;
        break;
      case 'REMOVE':
        modalContent = <RemoveMarkerModal
          id={context.id}
          name={context.name}
          address={context.address}
        />;
        break;
      default:
        modalContent = null;
        break;
    }
  }

  return (
    <Modal
      open={isOpened}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="modal-window">
        {context ? modalContent : null}
      </Box>
    </Modal>
  );
};

export default ModalWindow;
