import { FunctionComponent } from 'react';
import { useSlate } from 'slate-react';
import {
  getActiveStyles,
  toggleStyle,
} from './utils/EditorUtils';

import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import Divider from '@mui/material/Divider';
import { DropdownButton } from '../dropdown-button';

import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import CodeIcon from '@mui/icons-material/Code';

import styles from './Toolbar.module.scss';

const PARAGRAPH_STYLES = ['paragraph', 'h1', 'h2', 'h3', 'h4', 'multiple'];
const CHARACTER_STYLES = ['bold', 'italic', 'underline', 'code'];

export const Toolbar: FunctionComponent = () => {
  const editor = useSlate();

  const getIconForButton = (style: string) => {
    switch (style) {
      case 'bold':
        return <FormatBoldIcon />;
      case 'italic':
        return <FormatItalicIcon />;
      case 'code':
        return <CodeIcon />;
      case 'underline':
        return <FormatUnderlinedIcon />;
      default:
        throw new Error(`Unhandled style in getIconForButton: ${style}`);
    }
  };
  
  const getLabelForBlockStyle = (style: string) => {
    switch (style) {
      case 'h1':
        return 'Heading 1';
      case 'h2':
        return 'Heading 2';
      case 'h3':
        return 'Heading 3';
      case 'h4':
        return 'Heading 4';
      case 'paragraph':
        return 'Paragraph';
      case 'multiple':
        return 'Multiple';
      default:
        throw new Error(`Unhandled style in getLabelForBlockStyle: ${style}`);
    }
  };

  return (
    <>
      <Box className={styles["toolbar-container"]}>
        <DropdownButton
          buttonText={PARAGRAPH_STYLES[0]}
          items={PARAGRAPH_STYLES.map(item => getLabelForBlockStyle(item))}
        />
        {CHARACTER_STYLES.map((style) => (
          <Box key={style} m="10px">
            <ToggleButton
              value={style}
              selected={getActiveStyles(editor).has(style)}
              onMouseDown={event => {
                event.preventDefault();
                toggleStyle(editor, style);
              }}
            >
              {getIconForButton(style)}
            </ToggleButton>
          </Box>
        ))}
      </Box>
      <Divider />
    </>
  );
};
