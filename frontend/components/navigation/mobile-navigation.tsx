import { Box, Stack, useBreakpointValue } from "@chakra-ui/react";
import { RemoveScroll } from "react-remove-scroll";
import { MotionBox } from "styles/motion";
import { AnimatePresence } from "framer-motion";
import { ButtonLink } from "./button-link";
import { ColorModeSwitcher } from "components/color-mode-switcher";

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
              {/* {routerLinks.map((link, index) => (
                <NavigationLink
                  key={index}
                  name={link.name}
                  path={link.path}
                  onClose={onClose}
                  fontSize={"3xl"}
                />
              ))} */}
              <Box w="full" pt={24}>
                {/* <ButtonLink
                  href="/login"
                  onClick={onClose}
                  w="full"
                  rounded="full"
                  fontWeight={500}
                >
                  Начать
                </ButtonLink> */}
                <ColorModeSwitcher />
              </Box>
            </Stack>
          </MotionBox>
        </RemoveScroll>
      )}
    </AnimatePresence>
  );
}
