import type { NextPage } from "next";

import ExternalPageLayout from "layout/external-page";
import { LoginForm } from "components/auth/login-form";

export default function Login({}: NextPage) {
  return (
    <ExternalPageLayout title="Вход">
      <LoginForm />
    </ExternalPageLayout>
  );
}
