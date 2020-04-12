import { createMuiTheme } from '@material-ui/core/styles';
import { teal, deepPurple } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: deepPurple,
    // error: {
    //   main: red.A400,
    // },
    // background: {
    //   default: '#fff',
    // },
  },
  typography: {
    useNextVariants: true,
  },
  page: {
    minHeight: '1500px',
    maxWidth: '1000px',
    navHeight: '80px'
  }
})

export default theme;