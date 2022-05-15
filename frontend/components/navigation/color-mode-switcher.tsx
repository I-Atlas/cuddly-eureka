import type { FC } from "react";

import type { IconButtonProps } from "@chakra-ui/react";
import { IconButton, Tooltip } from "@chakra-ui/react";
import { useColorMode, useColorModeValue } from "@chakra-ui/react";

import { FaMoon, FaSun } from "react-icons/fa";
import { AnimatePresence } from "framer-motion";
import { MotionBox } from "styles/motion";

type ColorModeSwitcherProps = Omit<IconButtonProps, "aria-label">;

export const ColorModeSwitcher: FC<ColorModeSwitcherProps> = ({
  ...props
}) => {
  const { toggleColorMode } = useColorMode();
  const mode = useColorModeValue("dark", "light");
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <MotionBox
        key={mode === "dark" ? "dark-icon" : "light-icon"}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        // ts throw error here, but transition works very fine
        //@ts-ignore
        transition={{ duration: 0.3 }}
        cursor="pointer"
      >
        <Tooltip
          label={mode === "dark" ? "Dark mode" : "Light mode"}
          aria-label="A tooltip"
        >
          <IconButton
            size="md"
            fontSize="md"
            variant="ghost"
            color="current"
            onClick={toggleColorMode}
            icon={<SwitchIcon />}
            aria-label={`Switch to ${mode} mode`}
            {...props}
          />
        </Tooltip>
      </MotionBox>
    </AnimatePresence>
  );
};
