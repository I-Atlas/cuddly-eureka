import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { Section } from "components/section";
import { useForm } from "react-hook-form";
import { FiFile } from "react-icons/fi";
import useFetch from "use-http";
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
    setError,
    formState: { errors },
  } = useForm<FormValues>();
  const { post, response, loading, error } = useFetch("https://localhost:3001");

  const files = watch("file_");

  const onSubmit = handleSubmit(async (data) => {
    await post("/docs", { docs: data });
    if (!response.ok || error) {
      return setError("file_", {
        message:
          "Ой, что-то пошло не так! Попробуйте еще раз или повторите попытку позднее",
      });
    }
    console.log("On Submit: ", data);
  });

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
    <Section innerWidth={800} id="upload-docs" position="relative">
      <form onSubmit={onSubmit}>
        <FormControl mb={32} p={16} isInvalid={!!errors.file_} isRequired>
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

        <Button isLoading={loading} type="submit" colorScheme={"green"} m={8}>
          Продолжить
        </Button>
        <Button colorScheme={"red"} m={8} onClick={() => reset()}>
          Очистить
        </Button>
      </form>
    </Section>
  );
};
