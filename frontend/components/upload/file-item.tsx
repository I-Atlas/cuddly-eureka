import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  useToast,
} from "@chakra-ui/react";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { FiFile } from "react-icons/fi";
import useFetch from "use-http";
import { FilePreview } from "./file-preview";
import { FileUpload } from "./file-upload";

type FormValues = {
  file_: FileList;
};

interface FileItem {
  title: string;
}

export const FileItem: FC<FileItem> = ({ title }) => {
  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();
  const { post, response, loading, error } = useFetch();

  const toast = useToast();

  const files = watch("file_");

  const onSubmit = handleSubmit(async (data) => {
    console.log("On Submit: ", data);
    await post("/docs", { docs: data });
    if (!response.ok || error) {
      toast({
        title: "Ошибка",
        description:
          "Ой, что-то пошло не так! Попробуйте еще раз или повторите попытку позднее",
        status: "error",
        duration: 9000,
        isClosable: true,
        variant: "solid",
      });
    } else if (response.ok) {
      toast({
        title: "Файлы успешно загружены",
        description: "Вы успешно загрузили файлы",
        status: "success",
        duration: 9000,
        isClosable: true,
        variant: "solid",
      });
    }
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
    <form onSubmit={onSubmit}>
      <FormControl p={16} pb={4} isInvalid={!!errors.file_} isRequired>
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

      <Button isLoading={loading} type="submit" colorScheme={"green"} m={8}>
        Добавить
      </Button>
      <Button colorScheme={"red"} m={8} onClick={() => reset()}>
        Очистить
      </Button>
    </form>
  );
};
