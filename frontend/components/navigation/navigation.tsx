import NextLink from "next/link";
import {
  Flex,
  useDisclosure,
  IconButton,
  Container,
  Icon,
  Box,
  useBreakpointValue,
  HStack,
} from "@chakra-ui/react";

import { CgClose, CgMenu } from "react-icons/cg";
import { VscTerminalBash } from "react-icons/vsc";
import MobileNavigation from "components/navigation/mobile-navigation";
import { ButtonLink } from "./button-link";
import { ColorModeSwitcher } from "components/navigation/color-mode-switcher";
import { LogoutButton } from "./logout-button";
import { routerLinks } from "helpers/router-links";
import { NavigationLink } from "./navigation-link";

export default function Navigation() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Container py={4} maxW={1280} mx="auto" w={["90%", "85%", "80%"]}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <NextLink href="/" passHref>
          <Flex align="center">
            <Icon as={VscTerminalBash} w={8} h={8} mr={4} /> Кейс №8
          </Flex>
        </NextLink>
        <HStack
          as="nav"
          alignItems="center"
          spacing={{ md: 4, xl: 16 }}
          display={{ base: "none", md: "flex" }}
        >
          {routerLinks.map((link, index) => (
            <NavigationLink
              key={index}
              name={link.name}
              path={link.path}
              onClose={onClose}
            />
          ))}
        </HStack>
        <HStack
          alignItems="center"
          spacing={{ md: 4, xl: 16 }}
          display={{ base: "none", md: "flex" }}
        >
          <ColorModeSwitcher />
          <LogoutButton />
        </HStack>
        <IconButton
          variant="ghost"
          color="current"
          size={"md"}
          icon={isOpen ? <CgClose /> : <CgMenu />}
          aria-label={"Open Menu"}
          display={["inherit", "inherit", "none"]}
          onClick={isOpen ? onClose : onOpen}
        />
      </Flex>
      <MobileNavigation isOpen={isOpen} onClose={onClose} />
    </Container>
  );
}
