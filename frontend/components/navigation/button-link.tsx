import type { FC } from "react";

import type { LinkProps as NextLinkProps } from "next/link";
import NextLink from "next/link";

import type {
  LinkProps as ChakraLinkProps,
  ButtonProps,
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";

export type LinkProps = NextLinkProps & ChakraLinkProps;

export type ButtonLinkProps = LinkProps & ButtonProps;

export const ButtonLink: FC<ButtonLinkProps> = ({
  href,
  children,
  ...props
}) => {
  return (
    <NextLink href={href} passHref>
      <Button {...props}>{children}</Button>
    </NextLink>
  );
};
