import { FunctionComponent, useState, forwardRef, useImperativeHandle, Ref } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

interface Props {
  header: string,
  contentText: string,
  confirmation: {
    text: string,
    action?: () => void,
  },
}

const GenericModal: FunctionComponent<Props> = forwardRef<Props, Ref>((props: Props, ref: Ref) => {
  const { header, contentText, confirmation } = props;
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
    >
      <DialogTitle id="alert-dialog-title">
        {header}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {contentText}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => toggleModal(false)}>Cancel</Button>
        <Button onClick={() => confirmation.action} autoFocus>
          {confirmation.text}
        </Button>
      </DialogActions>
    </Dialog>
  );
});
GenericModal.displayName = "GenericModal";

export default GenericModal;