import { createTheme } from '@mui/material/styles';

export const appTheme = createTheme({
  palette: {},
  components: {
    MuiTextField: {},
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: { backgroundColor: '#fff' },
      },
    },
  },
});
