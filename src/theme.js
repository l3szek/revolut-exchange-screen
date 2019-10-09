export const THEME_CONSTANTS = {
  media: {
    xxs: 500,
    xs: 767,
    sm: 985,
    m: 1023,
    lg: 1440,
  },
};

const { media } = THEME_CONSTANTS;

export const theme = {
  colors: {
    white: '#ffffff',
    black: '#000000',
    lightBlue: '#05d2f5',
    darkBlue: '#0d6fcd',
  },
  fonts: {
    weight: { light: 300, bold: 500, normal: 'normal' },
    sizes: {
      normal: '14px',
      subTitle: '16px',
      title: '18px',
      large: '28px',
      xlarge: '50px',
    },
    family: 'sans-serif',
  },
  media: {
    xs: {
      only: `@media (min-width: 0px) and (max-width: ${media.xs}px)`,
      andUp: `@media (min-width: 0px)`,
      andDown: `@media (max-width: ${media.xs}px)`,
    },
    m: {
      only: `@media (min-width: ${media.xs + 1}px) and (max-width: ${media.m}px)`,
      andUp: `@media (min-width: ${media.xs + 1}px)`,
      andDown: `@media (max-width: ${media.m}px)`,
    },
    sm: { andDown: `@media (max-width: ${media.sm}px)` },
    lg: {
      andUp: `@media (min-width: ${media.lg}px)`,
      andDown: `@media (max-width: ${media.lg - 1}px)`,
    },
    sizes: { xxs: `${media.xxs}px`, xs: `${media.xs + 1}px`, sm: `${media.sm}px`, m: `${media.m}px`, lg: `${media.lg}px` },
  },
};