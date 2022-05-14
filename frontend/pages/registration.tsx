import type { NextPage } from "next";

import ExternalPageLayout from "layout/external-page";
import RegistrationForm from "components/auth/registration-form";

export default function Login({}: NextPage) {
  return (
    <ExternalPageLayout title="Регистрация">
      <RegistrationForm />
    </ExternalPageLayout>
  );
}
