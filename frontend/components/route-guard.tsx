import { useEffect, ReactNode, useContext, FC } from "react";
import { useRouter } from "next/router";
import { observer } from "mobx-react-lite";
import { context } from "store/root-store";
import { useLocalStorage } from "helpers/use-local-storage";

function RouteGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { authStore } = useContext(context);
  const [token, setToken] = useLocalStorage<string>("token", "");

  useEffect(() => {
    // on initial load - run auth check
    authCheck(router.asPath);

    // on route change start - hide page content by setting authorized to false
    const hideContent = () => authStore.setAuth(false);
    router.events.on("routeChangeStart", hideContent);

    // on route change complete - run auth check
    router.events.on("routeChangeComplete", authCheck);

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", authCheck);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function authCheck(url: string) {
    // redirect to login page if accessing a private page and not logged in
    const publicPaths = ["/login", "/registration"];
    const path = url.split("?")[0];
    if (!authStore.isAuth && !token && !publicPaths.includes(path)) {
      authStore.setAuth(false);
      router.push({
        pathname: "/login",
        query: { returnUrl: router.asPath },
      });
    } else {
      authStore.setAuth(true);
    }
  }

  return <>{authStore.isAuth && children}</>;
}

export default observer(RouteGuard);
