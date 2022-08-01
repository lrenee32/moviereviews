import { Dispatch, FunctionComponent, SetStateAction } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { RichTextEditor } from '../shared/rich-text-editor/rich-text-editor';
import { Descendant } from 'slate';
import { AutocompleteSearch } from 'components/shared/autocomplete-search';

interface Props {
  values: {
    title?: string,
    input?: Descendant[],
  },
  actions: {
    titleAction: Dispatch<SetStateAction<string>>,
    autocompleteAction?: Dispatch<SetStateAction<any>>
    inputAction: Dispatch<SetStateAction<Descendant[]>>,
    cancelAction: () => void,
    formAction: () => void,
  },
};

export const ReviewForm: FunctionComponent<Props> = (props: Props) => {
  const { title, input } = props.values;
  const { titleAction, autocompleteAction, inputAction, cancelAction, formAction } = props.actions;

  return (
    <>
      <TextField fullWidth label="Title" id="title" sx={{ marginBottom: '30px' }} value={title} onChange={(e) => titleAction(e.target.value)} />
      {autocompleteAction && 
        <AutocompleteSearch
          url="https://api.themoviedb.org/3/search/movie"
          onChangeAction={() => {}}
        />
      }
      <RichTextEditor value={input} setValue={inputAction} />
      <Box>
        <Button onClick={cancelAction} sx={{ backgroundColor: 'grey' }} variant="contained">Cancel</Button>
        <Button onClick={formAction} variant="outlined">Confirm</Button>
      </Box>
    </>
  )
};