import { theme as defaultTheme } from '@chakra-ui/react'

export const colors = {
  ...defaultTheme.colors,
  gray: {
    ...defaultTheme.colors.gray,
    1000: '#121721'
  },
  orange: {
    400: '#FF592C',
    500: '#FF4A19'
  },
  purple: {
    300: "#917ff0",
    200: "#8a76f5",
    500: "#7059EB"
  },
  accent: {
    50: 'var(--colors-accent-50)',
    100: 'var(--colors-accent-100)',
    200: 'var(--colors-accent-200)',
    300: 'var(--colors-accent-300)',
    400: 'var(--colors-accent-400)',
    500: 'var(--colors-accent-500)',
    600: 'var(--colors-accent-600)',
    700: 'var(--colors-accent-700)',
    800: 'var(--colors-accent-800)',
    900: 'var(--colors-accent-900)'
  }
}

export type ColorKeys = keyof typeof colors

export const accentKeys: ColorKeys[] = [
  'green',
  'cyan',
  'orange',
  'blue',
  'pink',
  'teal',
  'purple',
  'red'
]
