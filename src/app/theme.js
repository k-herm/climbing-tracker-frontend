import { createMuiTheme } from '@material-ui/core/styles';
import { teal, deepPurple } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: deepPurple,
  },
  custom: {
    error: '#fdecea',
    warning: '#fff4e5',
    info: '#e8f4fd',
    success: '#edf7ed',
    creme: '#faf4ed'
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
  },
  buttonGroup: {
    '& button': {
      margin: '1rem 0',
      height: '40px',
      lineHeight: 1.2
    }
  },
  button: {
    maxWidth: '200px'
  },
  transition: {
    duration: 200
  },
  noDataBox: {
    textAlign: 'center',
    fontSize: '1.2rem',
    fontStyle: 'italic',
    border: '1.5px solid lightgrey',
    borderRadius: '1rem',
    margin: '1rem',
    padding: '2rem'
  }
})

export default theme;