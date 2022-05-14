import { FC } from "react";
import { Icon, Text, Flex } from "@chakra-ui/react";
import { AiOutlineFileExcel } from "react-icons/ai";

interface FilePreviewProps {
  name: string;
}

export const FilePreview: FC<FilePreviewProps> = ({ name }) => {
  return (
    <Flex direction="column" align="center" m={6}>
      <Icon as={AiOutlineFileExcel} w={8} h={8} />
      <Text maxW={20} noOfLines={1}>
        {name}
      </Text>
    </Flex>
  );
};
