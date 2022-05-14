import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Section } from "components/section";

import { PasswordField } from "./password-field";
import { ButtonLink } from "components/navigation/button-link";

export default function RegistrationForm() {
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
            <Stack spacing="5">
              <FormControl>
                <FormLabel htmlFor="text">Имя</FormLabel>
                <Input id="firstName" type="text" />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="text">Фамилия</FormLabel>
                <Input id="lastName" type="text" />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input id="email" type="email" />
              </FormControl>
              <PasswordField />
            </Stack>
            <Stack spacing="6">
              <Button colorScheme="purple" variant="solid">Зарегистрироваться</Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Section>
  );
}
