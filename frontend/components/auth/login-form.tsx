import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { Section } from "components/section";

import { observer } from "mobx-react";
import { useForm } from "react-hook-form";
import { PasswordField } from "./password-field";
import { ButtonLink } from "components/navigation/button-link";
import useFetch from "use-http";
import { validateEmail, validatePassword } from "helpers/validation-helpers";
import { useLocalStorage } from "helpers/use-local-storage";
import { context } from "store/root-store";
import { IUserToAuthJSON } from "store/auth-store";
import { useContext } from "react";

type FormValues = {
  email: string;
  password: string;
};

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const { post, response, loading, error } = useFetch<IUserToAuthJSON>(
    "https://localhost:3001",
  );

  const toast = useToast();

  const { authStore } = useContext(context);

  const [token, setToken] = useLocalStorage<string>("token", "");

  const onSubmit = handleSubmit(async (data) => {
    console.log("On Submit: ", data);
    await post("/login", { ...data });
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
    } else if (response.data && response.ok) {
      const { token, last_name, first_name, email, name } = response.data;
      setToken(token);
      authStore.setUser({
        last_name,
        first_name,
        email,
        name,
      });
      authStore.setAuth(true);
      toast({
        title: "Успешный вход",
        description: "Вы успешно вошли в аккаунт",
        status: "success",
        duration: 9000,
        isClosable: true,
        variant: "solid",
      });
    }
  });

  return (
    <Section id="login-form" innerWidth="xl" position="relative">
      <Stack spacing="8">
        <Stack spacing="6">
          <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
            <Heading>Вход</Heading>
            <HStack spacing="1" justify="center">
              <Text color="muted">Нет аккаунта?</Text>
              <ButtonLink
                href="/registration"
                variant="link"
                colorScheme="purple"
              >
                Регистрация
              </ButtonLink>
            </HStack>
          </Stack>
        </Stack>
        <Box
          py={{ base: "4", sm: "8" }}
          px={{ base: "4", sm: "10" }}
          border="1px solid rgba( 255, 255, 255, 0.18 )"
          shadow="0 8px 32px 0 rgba( 31, 38, 135, 0.07 )"
          rounded="xl"
          bg={useColorModeValue(
            "rgba( 255, 255, 255, 0.25 )",
            "rgba( 22, 26, 30, 0.25 )",
          )}
          borderRadius="xl"
        >
          <Stack spacing="6">
            <form onSubmit={onSubmit}>
              <Stack spacing="5">
                <FormControl isRequired isInvalid={Boolean(errors.email)}>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    {...register("email", { validate: validateEmail })}
                    id="email"
                    type="email"
                  />
                  <FormErrorMessage>
                    {errors.email && errors?.email.message}
                  </FormErrorMessage>
                </FormControl>
                <PasswordField
                  error={errors.password}
                  isInvalid={Boolean(errors.password)}
                  register={register("password", {
                    validate: validatePassword,
                  })}
                />
              </Stack>
              <Stack pt={8} spacing="6">
                <Button
                  isLoading={loading}
                  type="submit"
                  colorScheme="purple"
                  variant="solid"
                >
                  Войти
                </Button>
              </Stack>
            </form>
            <HStack justify="flex-end">
              <Button variant="link" colorScheme="purple" size="sm">
                Забыли пароль?
              </Button>
            </HStack>
          </Stack>
        </Box>
      </Stack>
    </Section>
  );
}

export default observer(LoginForm);
