import type { NextPage } from "next";

import { FileForm } from "components/upload/file-form";
import InnerPageLayout from "layout/inner-page";

export default function Home({}: NextPage) {
  return (
    <InnerPageLayout>
      <FileForm />
    </InnerPageLayout>
  );
}
