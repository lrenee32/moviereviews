import { FunctionComponent } from 'react';
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

export const Toolbar: FunctionComponent = () => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <Button format="bold">
          <FormatBoldIcon />
        </Button>
        <Button format="italic">
          <FormatItalicIcon />
        </Button>
        <Button format="underline">
          <FormatUnderlinedIcon />
        </Button>
        <Button format="code">
          <CodeIcon />
        </Button>
        <Button format="heading-one">
          <LooksOneIcon />
        </Button>
        <Button format="heading-two">
          <LooksTwoIcon />
        </Button>
        <Button format="block-quote">
          <FormatQuoteIcon />
        </Button>
        <Button format="numbered-list">
          <FormatListNumberedIcon />
        </Button>
        <Button format="bulleted-list">
          <FormatListBulletedIcon />
        </Button>
      </Box>
      <Box pt={2}>
        <Divider />
      </Box>
    </>
  );
};
