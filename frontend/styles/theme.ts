import { extendTheme, ThemeOverride } from "@chakra-ui/react";
import { mergeWith } from "@chakra-ui/utils";
import { mode } from "@chakra-ui/theme-tools";

import { colors } from "styles/colors";

export function makeTheme(overrides: ThemeOverride = {}) {
  const theme = extendTheme({
    ...extendedTheme,
    colors,
  });
  return mergeWith(theme, overrides);
}

export const extendedTheme = extendTheme({
  config: {
    useSystemColorMode: true,
  },
  fonts: {
    heading: 'Lexend, sans-serif',
    body: 'Inter, sans-serif',
  },
  styles: {
    global: <T>(props: T) => ({
      body: {
        color: mode("#0a0a0a", "#FCFCFD")(props),
        bg: mode("#FCFCFD", "#161A1E")(props),
        fontSize: "1.2em",
        ".deleted": {
          color: "#ff8383 !important",
          fontStyle: "normal !important",
        },
        ".inserted": {
          color: "#b5f4a5 !important",
          fontStyle: "normal !important",
        },
        "-webkit-tap-highlight-color": "transparent",
      },
    }),
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "500",
        rounded: "xl",
      },
    },
    Tag: {
      baseStyle: {
        rounded: "lg",
      },
    },
    Link: {
      baseStyle: {
        fontWeight: "500",
        rounded: "xl",
        _hover: {
          textDecoration: "none",
        },
        _focus: {
          boxShadow: "none",
        },
      },
    },
  },
});

export const theme = makeTheme();
