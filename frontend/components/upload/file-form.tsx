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
import { useForm } from "react-hook-form";
import useFetch from "use-http";
import { FormField } from "./form-field";

type FormValues = {
  file_: FileList;
};

export const FileForm = () => {
  const {
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();
  const { post, response, loading, error } = useFetch();

  const toast = useToast();

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

  const titles = ["платежные поручения", "заявки на возврат"];

  return (
    <Section innerWidth="xl" id="upload-docs" position="relative">
      <form onSubmit={onSubmit}>
        {titles.map((title, index) => (
          <>
            <FormField key={index} title={title} />
          </>
        ))}

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
