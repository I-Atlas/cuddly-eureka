import type { AppProps } from "next/app";
import { useRouter } from "next/router";

import { Box, ChakraProvider } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";

import { Provider } from "use-http";
import { useLocalStorage } from "helpers/use-local-storage";

import AppLayout from "layout/app";
import { FontsGlobal } from "styles/fonts";
import { theme } from "styles/theme";
import { isExpired } from "helpers/token-expired";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
      <ChakraProvider theme={theme}>
        <FontsGlobal />
        <AppLayout>
          <AnimatePresence
            exitBeforeEnter
            initial={false}
            onExitComplete={() => window.scrollTo(0, 0)}
          >
            <Box key={router.route}>
              <Component {...pageProps} />
            </Box>
          </AnimatePresence>
        </AppLayout>
      </ChakraProvider>
  );
}
