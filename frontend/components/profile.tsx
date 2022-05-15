import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { IUser } from "store/auth-store";
import { context } from "store/root-store";
import useFetch from "use-http";
import { Section } from "./section";

function ProfileWithImage() {
  const { get, response, loading, error } = useFetch<IUser>();

  const { authStore } = useContext(context);

  const toast = useToast();

  useEffect(() => {
    const getData = async () => {
      await get("/me");
    };
    getData();

    if (error || !response.ok) {
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
      authStore.setUser(response.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Section innerWidth="xl" position="relative" id="profile">
      <Center py={6}>
        <Box
          maxW={"270px"}
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          boxShadow={"2xl"}
          rounded={"md"}
          overflow={"hidden"}
        >
          {loading ? (
            <Spinner size={"xl"} />
          ) : (
            <>
              <Image
                h={"120px"}
                w={"full"}
                src={
                  "https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
                }
                objectFit={"cover"}
                alt="Back"
              />
              <Flex justify={"center"} mt={-12}>
                <Avatar
                  size={"xl"}
                  src={
                    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                  }
                  css={{
                    border: "2px solid white",
                  }}
                />
              </Flex>

              <Box p={6}>
                <Stack spacing={0} align={"center"} mb={5}>
                  <Heading
                    fontSize={"2xl"}
                    fontWeight={500}
                    fontFamily={"body"}
                  >
                    {authStore.user?.name}
                  </Heading>
                  <Text color={"gray.500"}>{authStore.user?.email}</Text>
                </Stack>

                <Button
                  w={"full"}
                  mt={8}
                  color={"white"}
                  rounded={"md"}
                  _hover={{
                    transform: "translateY(-2px)",
                    boxShadow: "lg",
                  }}
                >
                  Посмотреть загруженные файлы
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Center>
    </Section>
  );
}

export default observer(ProfileWithImage);
