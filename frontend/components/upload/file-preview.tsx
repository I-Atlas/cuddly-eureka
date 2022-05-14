import { FC } from "react";
import { Icon, Text, VStack } from "@chakra-ui/react";
import { RiFileExcel2Line } from "react-icons/ri";

interface FilePreviewProps {
  name: string;
}

export const FilePreview: FC<FilePreviewProps> = ({ name }) => {
  return (
    <VStack m={8}>
      <Icon as={RiFileExcel2Line} w={8} h={8} />
      <Text noOfLines={1}>{name}</Text>
    </VStack>
  );
};
