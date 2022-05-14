export const validateEmail = (value: string) => {
  const regex = /\S+@\S+\.\S+/;
  if (value && (value === "" || regex.test(value))) {
    return true;
  } else {
    return "Пожалуйста, используйте вальдный Email адрес";
  }
};

export const validatePassword = (value?: string) => {
  if (value && (value === " " || value.length < 6)) {
    return "Пожалуйста, введите пароль, содержащий более 6 символов";
  } else {
    return true;
  }
};

export const validateName = (value?: string) => {
  if (value && (value === " " || value.length < 1)) {
    return "Пожалуйста, введите имя или фамилию";
  } else {
    return true;
  }
};
