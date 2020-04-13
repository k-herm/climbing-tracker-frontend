import { createMuiTheme } from '@material-ui/core/styles';
import { teal, deepPurple } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: deepPurple
  },
  typography: {
    useNextVariants: true,
  },
  page: {
    minHeight: '1500px',
    maxWidth: '1000px',
    navHeight: '80px'
  },
  chart: {
    colors: {
      yellow: '#ffcd38',
      blue: '#6573c3',
      red: '#f6685e'
    }
  }
})

export default theme;