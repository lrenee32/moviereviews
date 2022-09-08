// @ts-nocheck

import { FunctionComponent, useState, forwardRef, useImperativeHandle, Ref, ReactNode } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
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
  submitting: boolean,
}

const GenericModal: FunctionComponent<Props> = forwardRef<Props, Ref>((props: Props, ref: Ref) => {
  const { header, content, cancel, confirmation, submitting } = props;
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
        <CloseIcon
          onClick={() => {
            if (!submitting) {
              cancel.action();
            }
          }}
          sx={{
            '&:hover': {
              color: VARIABLES.primaryColor,
              cursor: 'pointer'
            }
          }}
        />
      </DialogTitle>
      <DialogContent>
        {content}
      </DialogContent>
      <DialogActions sx={{ p: '16px 24px' }}>
        <Button variant="contained" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.16)' }} onClick={() => cancel.action()} disabled={submitting}>{cancel.text}</Button>
        {submitting ? (
          <LoadingButton variant="contained" loading sx={{ minHeight: '36.5px' }} />
        ) : (
          <Button variant="contained" onClick={() => confirmation.action()} autoFocus>{confirmation.text}</Button>
        )}
      </DialogActions>
    </Dialog>
  );
});
GenericModal.displayName = "GenericModal";

export default GenericModal;