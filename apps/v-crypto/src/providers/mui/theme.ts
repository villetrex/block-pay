import { createTheme, responsiveFontSizes, ThemeOptions } from '@villetrex/ui';

export { useTheme } from '@villetrex/ui';

type StyleVariant = {
  borderColor: string;
  backgroundColor: string;
  iconColor: 'secondary' | 'warning' | 'inherit' | 'disabled' | 'action' | 'primary' | 'error' | 'info' | 'success';
  textColor: string;
};

declare module '@mui/material/Button' {
  // eslint-disable-next-line
  interface ButtonPropsVariantOverrides {
    link: true;
  }
  // eslint-disable-next-line
  interface ButtonPropsColorOverrides {
    bright: true;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  // eslint-disable-next-line
  interface TypographyPropsVariantOverrides {
    alertTitle: true;
    avatarTitle: true;
  }
}

// eslint-disable-next-line
interface Scrollable {
  position: string;
  width: string;
  zIndex: number;
  top: number;
}

// Update the Typography's variant prop options
declare module '@mui/material/styles/createMixins' {
  // eslint-disable-next-line
  interface MixinsOptions {
    secondary?: StyleVariant;
    warning?: StyleVariant;
    info?: StyleVariant;
    success?: StyleVariant;
    scrollable?: Scrollable;
  }
  // eslint-disable-next-line
  interface Mixins {
    secondary?: StyleVariant;
    warning?: StyleVariant;
    info?: StyleVariant;
    success?: StyleVariant;
    scrollable?: Scrollable;
  }
}

declare module '@mui/material/styles' {
  // eslint-disable-next-line
  interface Palette {
    neutral?: Palette['primary'];
    shade?: Palette['primary'];
    bright?: Palette['primary'];
    secondaryShade?: Palette['primary'];
    space?: Palette['primary'];
  }
  // eslint-disable-next-line
  interface TypographyVariants {
    alertTitle: React.CSSProperties;
    avatarTitle: React.CSSProperties;
  }
  // eslint-disable-next-line
  interface TypographyVariantsOptions {
    alertTitle?: React.CSSProperties;
    avatarTitle?: React.CSSProperties;
  }

  // eslint-disable-next-line
  interface PaletteOptions {
    neutral?: PaletteOptions['primary'];
    shade?: Palette['primary'];
    bright?: PaletteOptions['primary'];
    secondaryShade?: Palette['primary'];
    space?: Palette['primary'];
  }

  // eslint-disable-next-line
  interface Theme {
    customIcons?: {
      colors: {
        main: React.CSSProperties['color'];
        light: React.CSSProperties['color'];
        dark: React.CSSProperties['color'];
      };

      size: {
        small: number;
        medium: number;
        large: string;
        big: number;
        extraLarge: number;
      };
    };
    customShadows?: {
      header?: string;
      listItem?: string;
      prizePill?: string;
    };
    fixedHeader?: {
      position: string;
      width: string;
      zIndex: number;
      top: number;
    };
    fixedTab?: {
      position: string;
      width: string;
      zIndex: number;
      top: number;
    };
    scrollableContent?: {
      position: string;
      width: string;
      zIndex: number;
      top: number;
    };
    customBorders?: {
      tab?: string;
    };
    gradient?: {
      main: string;
      light: string;
      dark?: string;
    };
    odds?: {
      bglight?: string;
      bgdark?: string;
      textlight?: string;
      textdark?: string;
    };
  }
  // eslint-disable-next-line
  interface Mixins {
    secondary?: StyleVariant;
    warning?: StyleVariant;
    info?: StyleVariant;
    success?: StyleVariant;
    scrollable?: Scrollable;
  }

  // eslint-disable-next-line
  interface ThemeOptions {
    customIcons?: {
      colors: {
        main: React.CSSProperties['color'];
        light: React.CSSProperties['color'];
        dark: React.CSSProperties['color'];
      };

      size: {
        small: number;
        medium: number;
        large: string;
        big: number;
        extraLarge: number;
      };
    };
    customShadows?: {
      header?: string;
      listItem?: string;
      prizePill?: string;
    };
    fixedHeader?: {
      position: string;
      width: string;
      zIndex: number;
      top: number;
    };
    fixedTab?: {
      position: string;
      width: string;
      zIndex: number;
      top: number;
    };
    scrollableContent?: {
      position: string;
      width: string;
      zIndex: number;
      top: number;
    };
    customBorders?: {
      tab?: string;
    };
    gradient?: {
      main: string;
      light: string;
      dark?: string;
    };
    odds?: {
      bglight?: string;
      bgdark?: string;
      textlight?: string;
      textdark?: string;
    };
  }
}

const themeConfig: ThemeOptions = {
  mixins: {
    secondary: {
      borderColor: 'secondary.main',
      backgroundColor: 'secondaryShade.main',
      iconColor: 'secondary',
      textColor: 'secondary.dark',
    },
    warning: {
      borderColor: 'warning.main',
      backgroundColor: 'warning.light',
      iconColor: 'warning',
      textColor: 'warning.dark',
    },
    info: {
      borderColor: 'info.main',
      backgroundColor: 'info.light',
      iconColor: 'info',
      textColor: 'shade.dark',
    },
    success: {
      borderColor: 'success.main',
      backgroundColor: 'success.light',
      iconColor: 'success',
      textColor: 'success.dark',
    },
    scrollable: {
      position: 'relative',
      width: '100%',
      zIndex: 50,
      top: 95,
    },
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#2E098E',
      light: '#5183D5',
      dark: '#0F3363',
      contrastText: '#FFFFFF',
    },
    bright: {
      main: '#FFFFFF',
      light: '#FFFFFF',
      contrastText: '#000000',
    },
    secondary: {
      main: '#EADDFF',
      light: '#FFF64F',
      dark: '#C79400',
      contrastText: '#000000',
    },
    warning: {
      main: '#e65100',
      dark: '#E30512',
      light: 'rgba(252, 230, 231, 1)',
    },
    info: {
      main: '#27a1f8',
      light: '#E9F6FE',
      dark: '#8D8A8A',
      contrastText: '#6750A4',
    },
    neutral: {
      main: 'rgba(15, 51, 99, 0.3)',
      light: '#B0BEC5',
      contrastText: '#FFFFFF',
    },
    shade: {
      main: 'rgba(255, 255, 255, 0.3)',
      light: 'rgba(0, 0, 0, 0.3)',
      dark: 'rgba(0, 0, 0, 0.5)',
      contrastText: 'rgba(255, 255, 255, 0.6)',
    },
    secondaryShade: {
      main: 'rgba(255, 196, 0, 0.12)',
      light: 'rgba(0, 0, 0, 0)',
      dark: 'rgba(0, 0, 0, 0.12)',
      contrastText: 'rgba(0, 0, 0, 0)',
    },
    space: {
      main: 'lightGray',
      light: '#445C91',
      dark: 'rgba(15, 51, 99, 0.3)',
      contrastText: '#B0BEC5',
    },
    success: {
      main: '#4DCB62',
      light: '#ecfaef',
      dark: '#009934',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#EADDFF',
      paper: '#FFFFFF',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 360,
      md: 696,
      lg: 1024,
      xl: 1920,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          minHeight: '100vh',
        },
        '#__next': {
          minHeight: 'inherit',
        },
        '& input[type=number]': {
          MozAppearance: 'textfield',
        },
        '& input[type=number]::-webkit-outer-spin-button': {
          WebkitAppearance: 'none',
          margin: 0,
        },
        '& input[type=number]::-webkit-inner-spin-button': {
          WebkitAppearance: 'none',
          margin: 0,
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.variant === 'contained' && {
            borderRadius: 30,
          }),
          ...(ownerState.variant === 'outlined' && {
            borderRadius: 30,
            ...(ownerState.size !== 'small' && {
              minWidth: 160,
            }),
          }),
        }),
      },
      variants: [
        {
          props: { variant: 'link' },
          style: {
            textTransform: 'lowercase',
            margin: 0,
            padding: 0,
          },
        },
      ],
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: 'rgb(239, 239, 241)',
          minWidth: 360,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          minWidth: 328,
        },
      },
    },
  },
  typography: {
    h4: { fontWeight: 800, fontSize: '20px', letterSpacing: '0.1px' },
    h5: { fontWeight: 500, fontSize: '14px', letterSpacing: '0.1px' },
    h6: { fontWeight: 500, fontSize: '12px', letterSpacing: '0.1px' },
  },
  fixedHeader: {
    position: 'fixed',
    width: '100%',
    zIndex: 100,
    top: 0,
  },
  fixedTab: {
    position: 'fixed',
    width: '100%',
    zIndex: 100,
    top: 50,
  },
  scrollableContent: {
    position: 'relative',
    width: '100%',
    zIndex: 50,
    top: 95,
  },
  customShadows: {
    header: '0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12)',
    prizePill: 'inset 0px -1px 0px rgba(0, 0, 0, 0.12)',
  },
  customIcons: {
    colors: {
      main: 'rgba(15, 51, 99, 0.3)',
      light: '#FFFFFF',
      dark: '#000000',
    },
    size: {
      small: 14,
      medium: 16,
      large: '18px',
      big: 20,
      extraLarge: 26,
    },
  },
  customBorders: {
    tab: '2px solid #FFC400',
  },
  gradient: {
    main: 'linear-gradient(180deg, #0F3363 0%, #000C38 100%)',
    light: 'linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), #4DCB62',
    dark: 'linear-gradient(180deg, #0057A3 0%, #0F3363 100%)',
  },
  odds: {
    bglight: '#E3F1FD',
    bgdark: '#001041',
    textlight: '#33FFFF',
    textdark: '#0057A3',
  },
  spacing: 8,
};

const theme = createTheme(themeConfig);

export const badgeTheme = createTheme({
  ...theme,
  palette: {
    ...theme.palette,
    primary: {
      main: '#FFFFFF',
      light: '#FFF64F',
      dark: '#C79400',
      contrastText: '#000000',
    },
  },
});

export const goboldTheme = responsiveFontSizes(
  createTheme(
    {
      typography: {
        fontFamily: 'Gobold',
        h1: { textTransform: 'uppercase' },
        h2: { textTransform: 'uppercase' },
        h3: { textTransform: 'uppercase' },
        h4: { textTransform: 'uppercase' },
        h5: { textTransform: 'uppercase' },
        h6: { textTransform: 'uppercase' },
        body1: { textTransform: 'uppercase' },
        body2: { textTransform: 'uppercase' },
        caption: { textTransform: 'uppercase' },
        subtitle1: { textTransform: 'uppercase' },
        subtitle2: { textTransform: 'uppercase' },
      },
    },
    themeConfig,
  ),
);

export default responsiveFontSizes(theme);
