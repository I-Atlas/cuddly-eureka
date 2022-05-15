import { Box, HStack, Stack, useBreakpointValue } from "@chakra-ui/react";
import { RemoveScroll } from "react-remove-scroll";
import { MotionBox } from "styles/motion";
import { AnimatePresence } from "framer-motion";
import { ButtonLink } from "./button-link";
import { ColorModeSwitcher } from "components/navigation/color-mode-switcher";
import { LogoutButton } from "./logout-button";
import { routerLinks } from "helpers/router-links";
import { NavigationLink } from "./navigation-link";

interface MobileNavigationProps {
  onClose: () => void;
  isOpen: boolean;
}

export default function MobileNavigation({
  onClose,
  isOpen,
}: MobileNavigationProps) {
  const showOnBreakpoint = useBreakpointValue({ base: true, md: false });
  return (
    <AnimatePresence exitBeforeEnter>
      {showOnBreakpoint && isOpen && (
        <RemoveScroll>
          <MotionBox
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            h="calc(100vh - 80px)"
            w="full"
          >
            <Stack
              w="full"
              h="full"
              bg={"transparent"}
              align={"center"}
              justifyContent={"center"}
              spacing={6}
            >
              {routerLinks.map((link, index) => (
                <NavigationLink
                  key={index}
                  name={link.name}
                  path={link.path}
                  onClose={onClose}
                  fontSize={"3xl"}
                />
              ))}
              <HStack
                pt={24}
                alignItems="center"
                spacing={12}
              >
                <ColorModeSwitcher />
                <LogoutButton />
              </HStack>
            </Stack>
          </MotionBox>
        </RemoveScroll>
      )}
    </AnimatePresence>
  );
}
