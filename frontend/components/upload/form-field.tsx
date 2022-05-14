import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
} from "@chakra-ui/react";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { FiFile } from "react-icons/fi";
import { FilePreview } from "./file-preview";
import { FileUpload } from "./file-upload";

type FormValues = {
  file_: FileList;
};

interface FormField {
  title: string;
}

export const FormField: FC<FormField> = ({ title }) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const files = watch("file_");

  const validateFiles = (value: FileList) => {
    if (value.length < 1) {
      return "Пожалуйста, загрузите файлы";
    }
    for (const file of Array.from(value)) {
      const fsMb = file.size / (1024 * 1024);
      const MAX_FILE_SIZE = 10;
      if (fsMb > MAX_FILE_SIZE) {
        return "Максимальный размер файла 10 Мб";
      }
    }
    return true;
  };

  return (
    <FormControl mb={8} p={16} isInvalid={!!errors.file_} isRequired>
      <FormLabel>{`Загрузить ${title}`}</FormLabel>

      <FileUpload
        accept={
          ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        }
        multiple
        register={register("file_", { validate: validateFiles })}
      >
        <Button w={"full"} leftIcon={<Icon as={FiFile} />}>
          Загрузить
        </Button>
      </FileUpload>

      {files && (
        <Flex direction="row" flexWrap="wrap" maxWidth="full">
          {Array.from(files).map((file, index) => (
            <FilePreview key={index} name={file.name} />
          ))}
        </Flex>
      )}

      <FormErrorMessage>
        {errors.file_ && errors?.file_.message}
      </FormErrorMessage>
    </FormControl>
  );
};
