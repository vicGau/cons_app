import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

const defaultTheme = createMuiTheme({
  direction: 'ltr',
  spacing: 4,
  typography: {
    useNextVariants: true,
    fontFamily: ['Josefin Sans'].join(','),
    h1: {
      fontFamily: 'Josefin Sans',
      fontWeight: 400,
      fontSize: '38px',
      letterSpacing: '-0.12px',
    },
    h2: {
      fontFamily: 'Josefin Sans',
      fontWeight: 400,
      fontSize: '26px',
      lineHeight: '1.38',
      letterSpacing: '1',
    },
    h3: {
      fontFamily: 'Josefin Sans',
      fontWeight: 400,
      fontSize: '20px',
      lineHeight: '1.5',
    },
    h3bold: {
      fontFamily: 'EY Interstate',
      fontWeight: 700,
      fontSize: '20px',
      lineHeight: '1.5',
    },
    h4: {
      fontFamily: 'Josefin Sans',
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: '1.17',
    },
    h5: {
      fontFamily: 'Josefin Sans',
      fontWeight: 400,
      fontSize: '12px',
      lineHeight: '1.92',
    },
    subtitle1: {
      fontFamily: 'Josefin Sans',
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: '1.54',
    },
    subtitle2: {
      fontFamily: 'Josefin Sans',
      fontWeight: 400,
      fontSize: '10px',
      lineHeight: '1.6',
    },
    body1: {
      fontFamily: 'Josefin Sans',
      fontWeight: 400,
      fontSize: '15px',
      lineHeight: '1.62',
    },
    body2: {
      fontFamily: 'Josefin Sans',
      fontWeight: 400,
      fontSize: '15px',
      lineHeight: '1.6',
    },
  },
  palette: {
    primary: {
      main: '#1f2c60',
    },
    secondary: {
      main: '#85abb4',
    },
    error: {
      light: '#ff9933',
      main: '#ff3d33',
      dark: '#e60000',
      contrastText: '#fff',
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': 'Josefin Sans',
      },
    },
    MuiAppBar: {
      root: {
        color: '#0000',
      },
    },
    MuiChip: {
      root: {
        marginRight: '4px',
      },
    },
    MuiListItemSecondaryAction: {
      root: {
        fontFamily: 'Josefin Sans',
      },
    },
    MuiCard: {
      root: {
        padding: 12,
      },
    },
    MuiCardHeader: {
      root: {
        paddingTop: 8,
        paddingLeft: 0,
      },
    },
  },
});

export default responsiveFontSizes(defaultTheme);
