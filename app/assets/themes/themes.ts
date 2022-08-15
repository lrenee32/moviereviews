import { Theme } from "@mui/material";

export const VARIABLES = {
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
      background: {
        default: '#0D090A'
      }
    },
    typography: {
      h5: {
        fontSize: '27px',
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
      MuiChip: {
        styleOverrides: {
          root: ({ ownerState }) => ({
            ...(ownerState.size === 'large' && {
              height: 'auto',
              borderRadius: '40px',
              '& .MuiChip-label': {
                fontSize: '16px',
                padding: '11px 30px'
              },
            }),
            ...(ownerState.variant === 'outlined' && {
              color: 'rgba(255, 255, 255, 0.16)',
              '&:hover': {
                color: '#FFFFFF',
              },
            }),
          }),
        },
      },
    },
  };
};

declare module '@mui/material/Chip' {
  interface ChipPropsSizeOverrides {
    large: true;
  }
}