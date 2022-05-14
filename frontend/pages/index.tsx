import type { NextPage } from "next";

import { FileForm } from "components/upload/file-form";
import { Provider, Options } from "use-http";
import InnerPageLayout from "layout/inner-page";
import { useLocalStorage } from "helpers/use-local-storage";

export default function Home({}: NextPage) {
  const [token, setToken] = useLocalStorage<string>("token", "");
  const options = {
    interceptors: {
      // every time we make an http request, this will run 1st before the request is made
      // url, path and route are supplied to the interceptor
      // request options can be modified and must be returned
      // @ts-ignore
      request: async ({ options }) => {
        // if (isExpired(token)) {
        //   token = await getNewToken();
        //   setToken(token);
        // }
        options.headers.Authorization = `Bearer ${token}`;
        return options;
      },
    },
  };
  return (
    <InnerPageLayout>
      <Provider url="http://localhost:3001" options={options}>
        <FileForm />
      </Provider>
    </InnerPageLayout>
  );
}
