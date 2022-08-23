import { FunctionComponent, useState, MouseEvent } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface Props {
  buttonText: string,
  items: { value: string, text: string, action: (arg0: string) => void }[],
};

export const DropdownButton: FunctionComponent<Props> = ({ buttonText, items }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (e: MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const eventHandler = ({ action, value }: { action: (arg0: string) => void, value: string }) => {
    action(value);
    handleClose();
  }

  return (
    <Box>
      <Button
        variant="contained"
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        {buttonText}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {items.map(item => (
          <MenuItem key={item.text} onClick={() => eventHandler(item)}>{item.text}</MenuItem>
        ))}
      </Menu>
    </Box>
  );
};
