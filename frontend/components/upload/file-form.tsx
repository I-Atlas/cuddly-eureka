import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { Section } from "components/Section";
import { useForm } from "react-hook-form";
import { FiFile } from "react-icons/fi";
import { FilePreview } from "./file-preview";
import { FileUpload } from "./file-upload";

type FormValues = {
  file_: FileList;
};

export const FileForm = () => {
  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const files = watch("file_");

  const onSubmit = handleSubmit((data) => console.log("On Submit: ", data));

  const validateFiles = (value: FileList) => {
    if (value.length < 1) {
      return "Files is required";
    }
    for (const file of Array.from(value)) {
      const fsMb = file.size / (1024 * 1024);
      const MAX_FILE_SIZE = 10;
      if (fsMb > MAX_FILE_SIZE) {
        return "Максимальный размер файла 10 мб.";
      }
    }
    return true;
  };

  return (
    <Section innerWidth={600} id="upload-docs" position="relative">
      <form onSubmit={onSubmit}>
        <FormControl p={8} isInvalid={!!errors.file_} isRequired>
          <FormLabel>{"Загрузить отчеты"}</FormLabel>

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

        <Button colorScheme={"green"} m={8}>
          Продолжить
        </Button>
        <Button colorScheme={"red"} m={8} onClick={() => reset()}>
          Очистить
        </Button>
      </form>
    </Section>
  );
};
