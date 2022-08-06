import { FunctionComponent } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { VARIABLES } from 'assets/themes/themes';

interface Props {
  text: string,
};

export const SectionDivider: FunctionComponent<Props> = (props: Props) => {
  const { text } = props;

  return (
    <Box position="relative" display="flex" justifyContent="center" mb="20px">
      <Divider
        variant="middle"
        sx={{
          mb: '20px',
          position: 'absolute',
          width: '100%',
          top: '50%',
          transform: 'translate(0, -50%)'
        }}
      />
      <Typography
        variant="h5"
        sx={{
          backgroundColor: VARIABLES.primaryColor,
          padding: '2.5px 10px',
          transform: 'skewX(-15deg)',
        }}
      >
        {text}
      </Typography>
    </Box>
  )
};