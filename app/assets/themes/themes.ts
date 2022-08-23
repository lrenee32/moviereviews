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
        '@media only screen and (max-width: 479px)': {
          fontSize: '1rem',
        },
        '@media only screen and (min-width: 480px) and (max-width: 599px)': {
          fontSize: '1.1rem',
        },
        '@media only screen and (min-width: 600px) and (max-width: 767px)': {
          fontSize: '1.4rem',
        },
        '@media only screen and (min-width: 768px) and (max-width: 899px)': {
          fontSize: '1.5rem',
        },
        [theme.breakpoints.up('md')]: {
          fontSize: '1.4rem',
        },
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
          root: ({ ownerState }: any) => ({
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
          root: ({ ownerState }: any) => ({
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