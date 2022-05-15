import type { FC } from "react";

import NextLink from "next/link";
import { useRouter } from "next/router";

import type { LinkProps } from "@chakra-ui/react";
import { Link, useColorModeValue } from "@chakra-ui/react";

interface NavigationLinkProps extends LinkProps {
  name: string;
  path: string;
  onClose: () => void;
}

export const NavigationLink: FC<NavigationLinkProps> = ({
  name,
  path,
  onClose,
  ...props
}) => {
  const router = useRouter();
  const link = {
    color: useColorModeValue("#7059EB", "#7c6bdd"),
  };

  return (
    <NextLink href={path} passHref>
      <Link
        px={2}
        py={1}
        rounded={"md"}
        _hover={{
          textDecoration: "none",
          color: link.color
        }}
        color={router.pathname === path ? link.color : "inherit"}
        fontWeight="700"
        lineHeight={1.1}
        onClick={() => onClose()}
        {...props}
      >
        {name}
      </Link>
    </NextLink>
  );
};