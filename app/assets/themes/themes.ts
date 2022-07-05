import { Theme } from "@mui/material";

const VARIABLES = {
  bgColor: '#0E0E0E',
  primaryColor: '#E91E63',
  primaryTextColor: '#FFFFFF',
}

export const global = (theme: Theme) => {
  return {
    palette: {
      primary: {
        main: VARIABLES.primaryColor,
      },
      background: {
        default: VARIABLES.bgColor,
        paper: VARIABLES.bgColor,
      },
      text: {
        primary: VARIABLES.primaryTextColor,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: ({ ownerState }) => ({
            ...(ownerState.variant === 'outlined' && {
              '&:hover': {
                backgroundColor: VARIABLES.primaryColor,
                color: VARIABLES.primaryTextColor,
              },
            }),
          }),
        },
      },
      MuiTable: {
        styleOverrides: {
          root: {
            backgroundColor: '#242424',
            borderRadius: '10px',
            '.MuiTableRow-root .MuiTableCell-head, .MuiTableRow-root .MuiTableCell-body': {
              borderBottom: 'none',
            },
            '.MuiTableBody-root .MuiTableRow-root': {
              '&:nth-child(odd)': {
                backgroundColor: '#303030',
              },
            },
          },
        },
      },
    },
  };
};