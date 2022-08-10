import { FunctionComponent, ReactNode } from 'react';
import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';

interface Props {
  icon: ReactNode,
  type: string,
  isActive: boolean,
  onMouseDown: (event: any) => void,
};

export const ToolbarButton: FunctionComponent<Props> = ({ icon, type, isActive, onMouseDown }: Props) => {
  return (
    <Box m="10px">
      <ToggleButton
        value={type}
        selected={isActive}
        onMouseDown={onMouseDown}
      >
        {icon}
      </ToggleButton>
    </Box>
  );
};
