import { FunctionComponent, useState } from 'react';
import { useSelected, useFocused, useSlate, RenderElementProps } from 'slate-react';
import LinkMUI from '@mui/material/Link';
import Box from '@mui/material/Box';
import Popover from '@mui/material/Popover';
import IconButton from '@mui/material/IconButton';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import LinkOffIcon from '@mui/icons-material/LinkOff';
import { removeLink } from './utils/EditorUtils';

interface Props extends RenderElementProps {
  isEditing: boolean,
}

export const Link: FunctionComponent<Props> = ({ element, attributes, children, isEditing }) => {
  const editor = useSlate();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const popoverClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const popoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      {isEditing ? (
        <Box component="span">
          <Box component="span" onClick={(e) => popoverClick(e)}>
            <LinkMUI href={element.url} {...attributes} underline="none">
              {children}
            </LinkMUI>
          </Box>
          <Popover
            contentEditable={false}
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={popoverClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            sx={{ padding: '15px' }}
            PaperProps={{ sx: { display: 'flex' }}}
          >
            <LinkMUI href={element.url} target="_blank" sx={{ display: 'flex', alignItems: 'center', mr: '5px' }}>
              <OpenInNewIcon sx={{ mr: '5px' }} />
              {element.url}
            </LinkMUI>
            <IconButton onClick={() => removeLink(editor)} sx={{ borderRadius: '0', borderLeft: '1px solid rgba(255, 255, 255, 0.12)' }}>
              <LinkOffIcon />
            </IconButton>
          </Popover>
        </Box>
      ) : (
        <LinkMUI href={element.url} target="_blank" underline="none">{children}</LinkMUI>
      )}
    </>
  );
}