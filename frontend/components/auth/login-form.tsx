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

export default function LoginForm() {
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
            <Stack spacing="5">
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input id="email" type="email" />
              </FormControl>
              <PasswordField />
            </Stack>
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
