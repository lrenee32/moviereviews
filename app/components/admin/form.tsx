import { Dispatch, FunctionComponent, SetStateAction } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { RichTextEditor } from '../shared/rich-text-editor/rich-text-editor';
import { Descendant } from 'slate';

interface Props {
  values: {
    title?: string,
    input?: Descendant[],
  },
  actions: {
    titleAction: Dispatch<SetStateAction<string>>,
    inputAction: Dispatch<SetStateAction<Descendant[]>>,
    formAction: () => void,
  },
};

export const ReviewForm: FunctionComponent<Props> = (props: Props) => {
  const { title, input } = props.values;
  const { titleAction, inputAction, formAction } = props.actions;

  return (
    <>
      <TextField fullWidth label="Title" id="title" sx={{ marginBottom: '30px' }} value={title} onChange={(e) => titleAction(e.target.value)} />
      <RichTextEditor value={input} setValue={inputAction} />
      <Box>
        <Button sx={{ backgroundColor: 'grey' }} variant="contained">Cancel</Button>
        <Button onClick={formAction} variant="outlined">Confirm</Button>
      </Box>
    </>
  )
};