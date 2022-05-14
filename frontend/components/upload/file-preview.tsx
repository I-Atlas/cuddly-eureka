import { FC } from "react";
import { Icon, Text, Flex } from "@chakra-ui/react";
import { RiFileExcel2Line } from "react-icons/ri";

interface FilePreviewProps {
  name: string;
}

export const FilePreview: FC<FilePreviewProps> = ({ name }) => {
  return (
    <Flex direction="column" align="center" m={4}>
      <Icon as={RiFileExcel2Line} w={8} h={8} />
      <Text maxW={20} noOfLines={1}>
        {name}
      </Text>
    </Flex>
  );
};
