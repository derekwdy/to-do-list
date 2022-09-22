import { lightBlue, lightGreen, red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: lightBlue[500],
    },
    secondary: {
      main: lightGreen[500],
    },
    error: {
      main: red[500],
    },
  },
});

export default theme;