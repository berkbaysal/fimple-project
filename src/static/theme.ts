import { createTheme } from '@mui/material/styles';

export const appTheme = createTheme({
  palette: {
    primary: {
      main: '#145CC6',
    },
    error: {
      main: '#E30713',
    },
  },
  components: {
    MuiTextField: {},
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontFamily: 'inherit',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { fontFamily: 'inherit' },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: { fontFamily: 'inherit' },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: { fontFamily: 'inherit' },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontFamily: 'inherit',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: 'inherit',
          fontSize: '0.9rem',
        },
      },
    },
  },
});
