import type { AppProps } from "next/app";
import { useRouter } from "next/router";

import { Box, ChakraProvider } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";

import AppLayout from "layout/app";
import { FontsGlobal } from "styles/fonts";
import { theme } from "styles/theme";
import RouteGuard from "components/route-guard";
import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { context } from "store/root-store";
import { isExpired } from "helpers/token-expired";
import { useLocalStorage } from "helpers/use-local-storage";

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { authStore } = useContext(context);
  const [token, setToken] = useLocalStorage<string>("token", "");
  useEffect(() => {
    const publicPaths = ["/login", "/registration"];
    if (!authStore.isAuth && !token && !publicPaths.includes(router.route)) {
      router.push("/login");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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

export default observer(App);
