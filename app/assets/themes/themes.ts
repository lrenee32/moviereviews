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
      MuiAppBar: {
        styleOverrides: {
          positionAbsolute: {
            boxShadow: 'none',
          },
        },
      },
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
      MuiToolbar: {
        styleOverrides: {
          root: {
            backgroundColor: 'inherit',
          },
        },
      },
      MuiTable: {
        styleOverrides: {
          root: {
            '.MuiTableBody-root > .MuiTableRow-root': {
              '&:nth-of-type(odd)': {
                backgroundColor: '#303030',
              },
            },
            '.MuiTableRow-root': {
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