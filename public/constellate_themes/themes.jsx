const themes = {
  default: {
    HEAD: <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro&family=Source+Sans+Pro:ital,wght@0,300;0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
    </>,
    GLOBAL: {
      '#essay-title': {
        fontSize: '1.563rem',
        fontWeight: 700,
      },
    },
    EUI: {
      font: {
        family: "'Source Sans Pro', sans-serif",
        familyCode: "'Source Code Pro', monospace",
      },
    }
  },
  rho: {
    HEAD: <>
      <link rel="stylesheet" href="https://use.typekit.net/ywt8hoe.css" />
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@xz/fonts@1/serve/cascadia-code.min.css" />
    </>,
    GLOBAL: {
      '#essay-title': {
        fontSize: '1.563rem',
        fontWeight: 700,
      },
    },
    EUI: {
      colors: {
        LIGHT: {
          primary: '#634DBF',
          accent: '#7C327C',
        },
        DARK: {
          primary: '#9881F3',
          accent: '#BD6BBD',
        },
      },
      font: {
        family: "'myriad-pro', sans-serif",
        familyCode: "'Cascadia Code', monospace",
      },
    }
  }
};

export default themes;
