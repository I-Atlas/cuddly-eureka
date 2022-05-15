import type { NextPage } from "next";

import { FileForm } from "components/upload/file-form";
import { Provider } from "use-http";
import InnerPageLayout from "layout/inner-page";
import { useLocalStorage } from "helpers/use-local-storage";

export default function Home({}: NextPage) {
  const [token, setToken] = useLocalStorage<string>("token", "");

  const options = {
    interceptors: {
      // @ts-ignore
      request: async ({ options }) => {
        options.headers = {
          Authorization: `Bearer ${token}`,
        };
        return options;
      },
    },
  };
  return (
    <InnerPageLayout>
      <Provider url="http://localhost:9000" options={options}>
        <FileForm />
      </Provider>
    </InnerPageLayout>
  );
}
