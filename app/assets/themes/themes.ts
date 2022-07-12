import { Theme } from "@mui/material";

const VARIABLES = {
  bgColor: '#0E0E0E',
  primaryColor: '#E91E63',
  primaryTextColor: '#FFFFFF',
}

export const global = (theme: Theme) => {
  return {
    palette: {
      mode: 'dark',
      primary: {
        main: VARIABLES.primaryColor,
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
            border: '1px solid #696969',
            borderCollapse: 'separate',
            '.MuiTableBody-root > .MuiTableRow-root': {
              '&:nth-of-type(odd)': {
                backgroundColor: '#303030',
              },
            },
            '.MuiTableRow-root': {
              '> .MuiTableCell-head, > .MuiTableCell-body': {
                borderBottom: '1px solid #696969',
              },
              '&:last-child': {
                '> .MuiTableCell-body': {
                  borderBottom: 'none',
                },
              },
            },
          },
        },
      },
    },
  };
};