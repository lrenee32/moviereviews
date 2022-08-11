import { FunctionComponent } from 'react';
import { RenderElementProps } from 'slate-react';
import LinkMUI from '@mui/material/Link';

export const Link: FunctionComponent<RenderElementProps> = ({ element, attributes, children }) => {
  return (
    <LinkMUI href={element.url} {...attributes} underline="none">
      {children}
    </LinkMUI>
  );
}