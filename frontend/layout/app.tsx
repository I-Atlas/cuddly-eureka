import type { PropsWithChildren } from "react";

import { Box } from "@chakra-ui/react";

export default function AppLayout({ children }: PropsWithChildren<{}>) {
  return (
    <Box textAlign="center" fontSize="lg" mx="auto">
      {children}
    </Box>
  );
}
