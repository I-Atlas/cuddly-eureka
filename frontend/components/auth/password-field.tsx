import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
  useDisclosure,
  useMergeRefs,
} from "@chakra-ui/react";
import React from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { HiEye, HiEyeOff } from "react-icons/hi";

interface PasswordFieldProps {
  register: UseFormRegisterReturn;
  isInvalid: boolean;
  error?: FieldError;
}

export const PasswordField = React.forwardRef<
  HTMLInputElement,
  PasswordFieldProps
>(({ register, isInvalid, error }, ref) => {
  const { isOpen, onToggle } = useDisclosure();
  const inputRef = React.useRef<HTMLInputElement>(null);

  const mergeRef = useMergeRefs(inputRef, ref);
  const onClickReveal = () => {
    onToggle();
    if (inputRef.current) {
      inputRef.current.focus({ preventScroll: true });
    }
  };

  return (
    <FormControl isInvalid={isInvalid} isRequired>
      <FormLabel htmlFor="password">Пароль</FormLabel>
      <InputGroup>
        <InputRightElement>
          <IconButton
            variant="link"
            aria-label={isOpen ? "Mask password" : "Reveal password"}
            icon={isOpen ? <HiEyeOff /> : <HiEye />}
            onClick={onClickReveal}
          />
        </InputRightElement>
        <Input
          id="password"
          type={isOpen ? "text" : "password"}
          autoComplete="current-password"
          required
          {...register}
        />
      </InputGroup>
      <FormErrorMessage>
        {error && error.message}
      </FormErrorMessage>
    </FormControl>
  );
});

PasswordField.displayName = "PasswordField";
