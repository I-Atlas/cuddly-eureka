import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  useToast,
} from "@chakra-ui/react";
import { Section } from "components/section";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { FiFile } from "react-icons/fi";
import useFetch from "use-http";
import { FilePreview } from "./file-preview";
import { FileUpload } from "./file-upload";

type FormValues = {
  payments: FileList;
  returnRequests: FileList;
};

export const FileForm: FC = () => {
  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();
  const { post, response, loading, error } = useFetch(`upload`);

  const toast = useToast();

  const paymentsFiles = watch("payments");
  const returnRequestsFiles = watch("returnRequests");

  const onSubmit = handleSubmit(async (data) => {
    const payments = Array.from(data.payments);
    const returnRequests = Array.from(data.returnRequests);
    const formData = new FormData();
    payments.forEach(async (file) => {
      formData.append("payments", file);
    });
    returnRequests.forEach(async (file) => {
      formData.append("returnRequests", file);
    });

    await post(formData);
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
      // const blob = await response.blob()
      //    var fileName = response.getResponseHeader("fileName") //if you have the fileName header available
      //    var link=document.createElement('a');
      //    link.href=window.URL.createObjectURL(blob);
      //    link.download=fileName;
      //    link.click();
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
    <Section innerWidth="xl" id="upload-docs" position="relative">
      <form onSubmit={onSubmit}>
        <FormControl p={16} pb={4} isInvalid={!!errors.payments} isRequired>
          <FormLabel>{`Загрузить платежные поручения`}</FormLabel>

          <FileUpload
            id="payments"
            accept={
              ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            }
            multiple
            register={register("payments", { validate: validateFiles })}
          >
            <Button w={"full"} leftIcon={<Icon as={FiFile} />}>
              Загрузить
            </Button>
          </FileUpload>

          {paymentsFiles && (
            <Flex direction="row" flexWrap="wrap" maxWidth="full">
              {Array.from(paymentsFiles).map((file, index) => (
                <FilePreview key={index} name={file.name} />
              ))}
            </Flex>
          )}

          <FormErrorMessage>
            {errors.payments && errors?.payments.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl
          p={16}
          pb={4}
          isInvalid={!!errors.returnRequests}
          isRequired
        >
          <FormLabel>{`Загрузить заявления на возврат`}</FormLabel>

          <FileUpload
            id="returnRequests"
            accept={
              ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            }
            multiple
            register={register("returnRequests", { validate: validateFiles })}
          >
            <Button w={"full"} leftIcon={<Icon as={FiFile} />}>
              Загрузить
            </Button>
          </FileUpload>

          {returnRequestsFiles && (
            <Flex direction="row" flexWrap="wrap" maxWidth="full">
              {Array.from(returnRequestsFiles).map((file, index) => (
                <FilePreview key={index} name={file.name} />
              ))}
            </Flex>
          )}

          <FormErrorMessage>
            {errors.returnRequests && errors?.returnRequests.message}
          </FormErrorMessage>
        </FormControl>

        <Button isLoading={loading} type="submit" colorScheme={"green"} m={8}>
          Добавить
        </Button>
        <Button colorScheme={"red"} m={8} onClick={() => reset()}>
          Очистить
        </Button>
      </form>
    </Section>
  );
};
