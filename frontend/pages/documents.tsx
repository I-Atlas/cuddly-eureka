import type { NextPage } from "next";

import { FileForm } from "components/upload/file-form";
import { Provider } from "use-http";
import InnerPageLayout from "layout/inner-page";
import { useLocalStorage } from "helpers/use-local-storage";

export default function Documents({}: NextPage) {
  const [token, setToken] = useLocalStorage<string>("token", "");
  
  const options = {
    interceptors: {
      // every time we make an http request, this will run 1st before the request is made
      // url, path and route are supplied to the interceptor
      // request options can be modified and must be returned
      // @ts-ignore
      request: async ({ options }) => {
        options.headers.Authorization = `Bearer ${token}`;
        return options;
      },
    },
  };
  return (
    <InnerPageLayout>
      <Provider url="http://localhost:9000" options={options}>
        {/* <FileForm /> */}
      </Provider>
    </InnerPageLayout>
  );
}
