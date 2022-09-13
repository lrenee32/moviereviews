// @ts-nocheck

import { FunctionComponent } from 'react';
import { RenderElementProps } from 'slate-react';
import CardMedia from '@mui/material/CardMedia';

interface Props extends RenderElementProps {
  isEditing: boolean,
}

export const VideoPlayer: FunctionComponent<Props> = ({ element, attributes }) => {
  return (
    <CardMedia component="iframe" image={`https://www.youtube.com/embed/${element.videoId}`} {...attributes} frameBorder="0" />
  );
}