import { FunctionComponent, ReactNode } from 'react';
import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';

export type Type = 'block' | 'mark';
export type Format = ''

interface Props {
  type: Type,
  children: ReactNode,
  format: 
}

export const Button: FunctionComponent<Props> = (props: Props) => {
  const { type, children } = props;

  const isActive = () => {
    return false;
  };

  const toggle = () => {
    console.log('toggle');
  };

  return (
    <Box ml={1} mt={1}>
      <ToggleButton
        value={format}
        selected={isActive()}
        onMouseDown={event => {
          event.preventDefault();
          toggle();
        }}
        sx={{ border: 'none', padding: '0' }}
      >
        {children}
      </ToggleButton>
    </Box>
  );
};