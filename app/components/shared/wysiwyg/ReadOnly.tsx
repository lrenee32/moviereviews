import { FunctionComponent } from 'react';
import { Descendant } from 'slate';
import { serializeToJSX } from 'utils/utils';

import Box from '@mui/material/Box';

interface Props {
  value: Descendant[],
}

export const ReadOnly: FunctionComponent<Props> = ({ value }) => {
  return (
    <Box mb="30px">
      {value.map((i, index) => serializeToJSX(i, index))}
    </Box>
  );
};
