import { FunctionComponent, useState, useEffect, useMemo } from 'react';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import { Review } from 'utils/types';
import throttle from 'lodash/throttle';

interface Props {
  optionsSearch: (searchTerm: string) => Promise<any>,
  selectionEvent: (e) => void,
};

export const AutocompleteSearch: FunctionComponent<Props> = (props: Props) => {
  const { optionsSearch, selectionEvent } = props;
  const [value, setValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);

  const fetchOptions = useMemo(
    () => {
      return throttle(
        async () => {
          const res = await optionsSearch(inputValue);
          setOptions(res);
        },
        2000,
      );
    },
    [inputValue],
  );

  useEffect(() => {
    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetchOptions();
  }, [inputValue]);

  return (
    <Stack>
      <Autocomplete
        sx={{ marginBottom: '30px'}}
        getOptionLabel={(results: Review["Details"]) => results.title}
        filterOptions={(x) => x}
        options={options}
        noOptionsText="No title found"
        onChange={(event, newValue) => {
          setOptions(newValue ? [newValue, ...options] : options);
          if (newValue) {
            selectionEvent(newValue);
          }
        }}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        renderInput={(props) => (
          <TextField {...props} label="Search for a film title" />
        )}
        renderOption={(props, results) => (
          <Box component="li" {...props} key={results.id}>
            <Avatar
              src={`https://image.tmdb.org/t/p/w300${results.poster_path}`}
              variant="square"
              sx={{ height: '75px', width: '50px', marginRight: '15px' }}
            />
            <Box>
              <Box>{results.title}</Box>
              <Box>{new Date(results.release_date).getFullYear()}</Box>
            </Box>
          </Box>
        )}
      />
    </Stack>
  );
};