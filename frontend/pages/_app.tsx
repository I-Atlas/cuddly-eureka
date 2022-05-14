import type { AppProps } from "next/app";
import { useRouter } from "next/router";

import { Box, ChakraProvider } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";

import AppLayout from "layout/app";
import { FontsGlobal } from "styles/fonts";
import { theme } from "styles/theme";
import RouteGuard from "components/route-guard";

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
            {/* <RouteGuard>
              <Component {...pageProps} />
            </RouteGuard> */}
          </AnimatePresence>
        </AppLayout>
      </ChakraProvider>
  );
}
