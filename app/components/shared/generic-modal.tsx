import { FunctionComponent, useState } from 'react';
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

export const GenericModal: FunctionComponent<Props> = (props: Props) => {
  const { header, contentText, confirmation } = props;
  const [open, setOpen] = useState(false);

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
        <Button>Cancel</Button>
        <Button autoFocus>
          {confirmation.text}
        </Button>
      </DialogActions>
    </Dialog>
  );
};