import type { ReactNode, FC } from "react";

import type {
  StyleProps,
  HTMLChakraProps,
  ThemingProps,
} from "@chakra-ui/react";
import { Container } from "@chakra-ui/layout";
import { cx } from "@chakra-ui/utils";
import { chakra, useStyleConfig, omitThemingProps } from "@chakra-ui/react";

export interface SectionProps
  extends HTMLChakraProps<"div">,
    ThemingProps<"Section"> {
  children: ReactNode;
  innerWidth?: StyleProps["width"];
}

export const Section: FC<SectionProps> = ({
  children,
  innerWidth = 1280,
  className,
  ...props
}) => {
  const styles = useStyleConfig("Section", props);

  const ownProps = omitThemingProps(props);

  return (
    <chakra.div
      __css={styles}
      className={cx("section", className)}
      {...ownProps}
    >
      <Container py={12} height="full" maxW={innerWidth}>
        {children}
      </Container>
    </chakra.div>
  );
};
