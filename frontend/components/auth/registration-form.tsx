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

import { PasswordField } from "./password-field";
import { ButtonLink } from "components/navigation/button-link";
import useFetch from "use-http";
import { useForm } from "react-hook-form";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "helpers/validation-helpers";
import { IUserToAuthJSON } from "store/auth-store";
import { useRouter } from "next/router";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export default function RegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const toast = useToast();

  const router = useRouter();

  const { post, response, loading, error } = useFetch<IUserToAuthJSON>(
    "http://localhost:9000",
  );

  const onSubmit = handleSubmit(async (data) => {
    console.log("On Submit: ", data);
    const { firstName, lastName, password, email } = data;
    await post("/register", {
      first_name: firstName,
      last_name: lastName,
      password,
      email,
    });
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
      toast({
        title: "Аккаунт создан",
        description: "Мы создали аккаунт для Вас, теперь вы можете войти",
        status: "success",
        duration: 9000,
        isClosable: true,
        variant: "solid",
      });
      setTimeout(() => router.push("/login"), 1000);
    }
  });
  return (
    <Section id="registration-form" innerWidth="xl" position="relative">
      <Stack spacing="8">
        <Stack spacing="6">
          <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
            <Heading>Регистрация</Heading>
            <HStack spacing="1" justify="center">
              <Text color="muted">Уже есть аккаунт?</Text>
              <ButtonLink href="/login" variant="link" colorScheme="purple">
                Войти
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
                <FormControl isRequired isInvalid={Boolean(errors.firstName)}>
                  <FormLabel htmlFor="text">Имя</FormLabel>
                  <Input
                    {...register("firstName", { validate: validateName })}
                    id="firstName"
                    type="text"
                  />
                  <FormErrorMessage>
                    {errors.firstName && errors?.firstName.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={Boolean(errors.lastName)} isRequired>
                  <FormLabel htmlFor="text">Фамилия</FormLabel>
                  <Input
                    {...register("lastName", { validate: validateName })}
                    id="lastName"
                    type="text"
                  />
                  <FormErrorMessage>
                    {errors.lastName && errors?.lastName.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={Boolean(errors.email)} isRequired>
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
                  Зарегистрироваться
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Section>
  );
}
