// @ts-nocheck

import { FunctionComponent, useState } from 'react';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';

interface Props {
  tags: string[],
  selectionEvent: (e) => void,
  max: number,
};

export const Tags: FunctionComponent<Props> = (props: Props) => {
  const { tags, selectionEvent, max } = props;
  const [input, setInput] = useState<string>('');
  const [isKeyReleased, setIsKeyReleased] = useState<boolean>(false);

  const onKeyDown = (e) => {
    const { key } = e;
    const trimmedInput = input.trim();

    if ((key === ',' || key === 'Enter') && trimmedInput.length && !tags.includes(trimmedInput)) {
      e.preventDefault();
      selectionEvent(prevState => [...prevState, trimmedInput]);
      setInput('');
    }

    if (key === 'Backspace' && !input.length && tags.length && isKeyReleased) {
      const tagsCopy = [...tags];
      const poppedTag = tagsCopy.pop();
      e.preventDefault();
      selectionEvent(tagsCopy);
      setInput(poppedTag);
    }

    setIsKeyReleased(false);
  };

  const onKeyUp = () => {
    setIsKeyReleased(true);
  };

  return (
    <TextField
      value={input}
      disabled={tags.length >= max}
      fullWidth
      variant="outlined"
      multiline
      sx={{
        marginBottom: '30px',
        '& .MuiOutlinedInput-root': {
          display: 'flex',
          flexWrap: 'wrap',
        },
        '& .MuiOutlinedInput-root > .MuiButtonBase-root': {
          marginRight: '2.5px',
          marginBottom: '2.5px',
          '&:last-of-type': {
            marginRight: '7.5px'
          }
        }
      }}
      placeholder={tags.length < max ? 'Enter tags here' : ''}
      InputProps={{
        startAdornment: tags.map((item, index) => (
          <Chip
            key={item}
            label={item}
            onDelete={() => selectionEvent(tags.filter((_tag, i) => index !== i))}
          />
        )),
        onChange: (e) => setInput(e.target.value),
        onKeyDown: onKeyDown,
        onKeyUp: onKeyUp,
      }}
    />
  );
};
