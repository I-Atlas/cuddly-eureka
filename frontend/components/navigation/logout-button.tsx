import { FC, useContext } from "react";

import type { IconButtonProps } from "@chakra-ui/react";
import { IconButton, Tooltip } from "@chakra-ui/react";

import { FiLogOut } from "react-icons/fi";
import { observer } from "mobx-react-lite";
import { context } from "store/root-store";
import { useRouter } from "next/router";

type LogoutButtonProps = Omit<IconButtonProps, "aria-label">;

export const LogoutButton: FC<LogoutButtonProps> = observer(({ ...props }) => {
  const { authStore } = useContext(context);
  const router = useRouter();
  return (
    <Tooltip label={"Выйти из аккаунта"} aria-label="A tooltip">
      <IconButton
        size="md"
        fontSize="md"
        variant="ghost"
        color="current"
        onClick={() => {
          authStore.logout();
          router.push("/login");
        }}
        icon={<FiLogOut />}
        aria-label={"Logout"}
        {...props}
      />
    </Tooltip>
  );
});
