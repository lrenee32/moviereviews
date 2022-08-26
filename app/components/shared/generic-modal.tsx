// @ts-nocheck

import { FunctionComponent, useState, forwardRef, useImperativeHandle, Ref, ReactNode } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { VARIABLES } from 'assets/themes/themes';

interface Props {
  header: string,
  content: ReactNode,
  cancel: {
    text: string,
    action: () => void,
  },
  confirmation: {
    text: string,
    action: () => void,
  },
}

const GenericModal: FunctionComponent<Props> = forwardRef<Props, Ref>((props: Props, ref: Ref) => {
  const { header, content, cancel, confirmation } = props;
  const [open, setOpen] = useState(false);

  const toggleModal = (state: boolean) => {
    return setOpen(state);
  };

  useImperativeHandle(ref, () => ({
    toggleModal: toggleModal,
  }));

  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth="md"
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {header}
        <CloseIcon onClick={() => cancel.action()} sx={{ '&:hover': { color: VARIABLES.primaryColor, cursor: 'pointer' } }} />
      </DialogTitle>
      <DialogContent>
        {content}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => cancel.action()}>{cancel.text}</Button>
        <Button onClick={() => confirmation.action()} autoFocus>
          {confirmation.text}
        </Button>
      </DialogActions>
    </Dialog>
  );
});
GenericModal.displayName = "GenericModal";

export default GenericModal;