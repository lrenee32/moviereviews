import { FunctionComponent, useRef } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { Button } from './button';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import CodeIcon from '@mui/icons-material/Code';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import LinkIcon from '@mui/icons-material/Link';
import ImageIcon from '@mui/icons-material/Image';
import { useSlate } from 'slate-react';
import { insertImage } from "./utils";

export const Toolbar: FunctionComponent = () => {
  const editor = useSlate();
  const imageUpload = useRef(null);

  const onChange = (e) => {
    if (e.target.files) {
      const file = URL.createObjectURL(e.target.files[0]);
      insertImage(editor, file, e.target.files[0].name);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <Button type="mark" format="bold">
          <FormatBoldIcon />
        </Button>
        <Button type="mark" format="italic">
          <FormatItalicIcon />
        </Button>
        <Button type="mark" format="underline">
          <FormatUnderlinedIcon />
        </Button>
        <Button type="mark" format="code">
          <CodeIcon />
        </Button>
        <Button type="block" format="heading-one">
          <LooksOneIcon />
        </Button>
        <Button type="block" format="heading-two">
          <LooksTwoIcon />
        </Button>
        <Button type="block" format="block-quote">
          <FormatQuoteIcon />
        </Button>
        <Button type="block" format="numbered-list">
          <FormatListNumberedIcon />
        </Button>
        <Button type="block" format="bulleted-list">
          <FormatListBulletedIcon />
        </Button>
        <Button type="mark" format="link">
          <LinkIcon />
        </Button>
        <Button type="block" format="image" imageUpload={imageUpload}>
          <input ref={imageUpload} hidden accept="image/*" type="file" onChange={onChange} />
          <ImageIcon />
        </Button>
      </Box>
      <Divider />
    </>
  );
};
