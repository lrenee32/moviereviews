// @ts-nocheck

import { FunctionComponent } from 'react';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';

interface Props {};

export const Video: FunctionComponent<Props> = ({ element, attributes, children }) => {
  return (
    <Box position="relative" pb="56.25%" height="0">
      <CardMedia
        component="iframe"
        image={`https://www.youtube.com/embed/${element.videoId}`}
        frameBorder="0"
        sx={{ position: 'absolute', top: '0', left: '0' }}
        height="100%"
        width="100%"
        {...attributes}
      />
      {children}
    </Box>
  );
}