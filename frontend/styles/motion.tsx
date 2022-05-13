import type { FC } from "react";
import type {
  ImageProps as ChakraImageProps,
  FlexProps,
  BoxProps,
} from "@chakra-ui/react";
import { Box, Flex, Image } from "@chakra-ui/react";
import { forwardRef } from "@chakra-ui/react";
import type { HTMLMotionProps } from "framer-motion";
import { motion, isValidMotionProp } from "framer-motion";

export const MotionBox = motion<BoxProps>(
  forwardRef((props, ref) => {
    const chakraProps = Object.fromEntries(
      // do not pass framer props to DOM element
      Object.entries(props).filter(([key]) => !isValidMotionProp(key))
    );
    return <Box ref={ref} {...chakraProps} />;
  })
);

export const MotionFlex = motion<FlexProps>(
  forwardRef((props, ref) => {
    const chakraProps = Object.fromEntries(
      // do not pass framer props to DOM element
      Object.entries(props).filter(([key]) => !isValidMotionProp(key))
    );
    return <Flex ref={ref} {...chakraProps} />;
  })
);

export const MotionImage = motion<ChakraImageProps>(
  forwardRef((props, ref) => {
    const chakraProps = Object.fromEntries(
      // do not pass framer props to DOM element
      Object.entries(props).filter(([key]) => !isValidMotionProp(key))
    );
    return (
      <Image ref={ref} {...chakraProps} alt="placeholder" userSelect="none" />
    );
  })
);

type FloatingBoxProps = BoxProps & HTMLMotionProps<"div">;

export const FloatingBox: FC<
  FloatingBoxProps & { delay?: number; steps?: number[] }
> = ({ children, delay = 0.2, steps = [10, -10, 10], ...props }) => {
  return (
    <MotionBox
      animate={{ translateY: steps }}
      // ts throw error here, but transition works very fine
      //@ts-ignore
      transition={{
        delay,
        duration: 5,
        ease: "easeInOut",
        times: [0, 0.2, 0.5, 0.8, 1],
        repeat: Infinity,
        repeatDelay: 0,
        repeatType: "reverse",
      }}
      {...props}
    >
      {children}
    </MotionBox>
  );
};
