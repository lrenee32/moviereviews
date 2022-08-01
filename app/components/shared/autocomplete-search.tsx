import { FunctionComponent, useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Review } from 'utils/types';

interface Props {
  url: string,
  onChangeAction: () => void,
};

export const AutocompleteSearch: FunctionComponent<Props> = (props: Props) => {
  const { url, onChangeAction } = props;
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch(url)
    .then(res => res.json())
    .then(json => setResults(json.data));
  }, []);

  return (
    <Stack>
      <Autocomplete
        onChange={onChangeAction}
        getOptionLabel={(results: Review["Details"]) => results.title}
        options={results}
        isOptionEqualToValue={(option, value) => option.title === value.title}
        noOptionsText="No title found"
        renderOption={(props, results) => (
          <Box component="li" {...props} key={results.id}>
            {results.title}
          </Box>
        )}
        renderInput={(props) => (
          <TextField {...props} label="Search for a film title" />
        )}
      />
    </Stack>
  );
};