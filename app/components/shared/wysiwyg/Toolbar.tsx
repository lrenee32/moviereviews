// @ts-nocheck

import { FunctionComponent, useCallback, useRef } from 'react';
import { useSlate } from 'slate-react';
import {
  getActiveStyles,
  getTextBlockStyle,
  hasActiveLinkAtSelection,
  insertImageFile,
  insertLink,
  insertVideo,
  toggleBlockType,
  toggleStyle,
} from './utils/EditorUtils';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { DropdownButton } from '../dropdown-button';
import { ToolbarButton } from './ToolbarButton';

import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import CodeIcon from '@mui/icons-material/Code';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import LinkIcon from '@mui/icons-material/Link';
import ImageIcon from '@mui/icons-material/Image';
import VideocamIcon from '@mui/icons-material/Videocam';

import styles from './Toolbar.module.scss';

const PARAGRAPH_STYLES = ['paragraph', 'h1', 'h2', 'h3', 'h4', 'multiple'];
const CHARACTER_STYLES = ['bold', 'italic', 'underline', 'code'];
const MISC_STYLES = ['bulleted-list', 'numbered-list', 'block-quote'];


export const Toolbar: FunctionComponent = ({ previousSelection }) => {
  const editor = useSlate();
  const imageInput = useRef(null);

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
      case 'numbered-list':
        return <FormatListNumberedIcon />;
      case 'bulleted-list':
        return <FormatListBulletedIcon />;
      case 'block-quote':
        return <FormatQuoteIcon />;
      case 'link':
        return <LinkIcon />;
      case 'image':
        return <ImageIcon key={style} />;
      case 'video':
        return <VideocamIcon key={style} />
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
      case 'bulleted-list':
        return 'Bulleted List';
      case 'numbered-list':
        return 'Numbered List';
      case 'block-quote':
        return 'Block Quote';
      case 'multiple':
        return 'Multiple';
      default:
        throw new Error(`Unhandled style in getLabelForBlockStyle: ${style}`);
    }
  };

  const onBlockTypeChange = useCallback(
    (targetType: string) => {
      if (targetType === 'multiple') {
        return;
      }
      toggleBlockType(editor, targetType);
    },
    [editor]
  );

  const onImageSelected = (e) => insertImageFile(editor, e.target.files, previousSelection);

  const blockType = getTextBlockStyle(editor);

  return (
    <>
      <Box className={styles["toolbar-container"]}>
        <DropdownButton
          buttonText={getLabelForBlockStyle(blockType ?? "paragraph")}
          items={PARAGRAPH_STYLES.map(item => ({
            value: item,
            text: getLabelForBlockStyle(item),
            action: onBlockTypeChange,
          }))}
        />
        {CHARACTER_STYLES.map((style) => (
          <ToolbarButton
            key={style}
            icon={getIconForButton(style)}
            type={style}
            isActive={getActiveStyles(editor).has(style)}
            onMouseDown={event => {
              event.preventDefault();
              toggleStyle(editor, style);
            }}
          />
        ))}
        <Divider orientation="vertical" variant="middle" flexItem />
        {MISC_STYLES.map((style) => (
          <ToolbarButton
            key={style}
            icon={getIconForButton(style)}
            type={style}
            isActive={blockType === style}
            onMouseDown={event => {
              event.preventDefault();
              onBlockTypeChange(style);
            }}
          />
        ))}
        <Divider orientation="vertical" variant="middle" flexItem />
        <ToolbarButton
          icon={getIconForButton("link")}
          type="link"
          isActive={hasActiveLinkAtSelection(editor)}
          onMouseDown={event => {
            event.preventDefault();
            const url = prompt('Enter a URL');
            insertLink(editor, url);
          }}
        />
        <ToolbarButton
          icon={[
            getIconForButton("image"),
            <input
              ref={imageInput}
              hidden
              key="image-upload"
              type="file"
              id="image-upload"
              accept="image/png, image/jpeg"
              onChange={onImageSelected}
            />
          ]}
          type="image"
          isActive={false}
          onMouseDown={event => {
            event.preventDefault();
            imageInput?.current?.click();
          }}
        />
        <ToolbarButton
          icon={getIconForButton("video")}
          type="video"
          isActive={false}
          onMouseDown={event => {
            event.preventDefault();
            const url = prompt('Enter a Youtube video ID');
            insertVideo(editor, url);
          }}
        />
      </Box>
      <Divider />
    </>
  );
};
