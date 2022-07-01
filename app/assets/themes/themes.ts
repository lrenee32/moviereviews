const VARIABLES = {
  bgColor: '#0E0E0E',
  primaryColor: '#E91E63',
  primaryTextColor: '#FFFFFF',
}

export const global = {
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
  },
};