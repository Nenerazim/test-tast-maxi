import {isValidNumber} from 'libphonenumber-js';

export type ValidatorData = {
  val: string | number | boolean | File | undefined;
  listValues: unknown;
};

export type ValidationResult = string | undefined;

type Validator = (data: ValidatorData) => ValidationResult;

export const file = (customMessage?: string): Validator => {
  const message = customMessage ?? 'Загруженный файл некорректен';
  return ({val}: ValidatorData) => {
    if (val) {
      return val instanceof File && val.size > 0 ? undefined : message;
    }
    return undefined;
  };
};

export const required = (customMessage?: string): Validator => {
  const message = customMessage ?? 'Это поле обязательно для заполнения';
  return ({val}: ValidatorData) => {
    const stringedVal = String(val ?? '');
    return stringedVal && stringedVal.length ? undefined : message;
  };
};

export const minLength = (min: number, customMessage?: string): Validator => {
  const message = customMessage ?? `Минимальная длина ${min} символов`;
  return ({val}: ValidatorData) => {
    const stringedVal = String(val ?? '');
    return stringedVal && stringedVal.length >= min ? undefined : message;
  };
};

export const maxLength = (max: number, customMessage?: string): Validator => {
  const message = customMessage ?? `Максимальная длина ${max} символов`;
  return ({val}: ValidatorData) => {
    const stringedVal = String(val ?? '');
    return stringedVal && stringedVal.length <= max ? undefined : message;
  };
};

export const email = (customMessage?: string): Validator => {
  const message = customMessage ?? 'Введите корректный адрес электронной почты';
  const emailRegExp =
    /^(?:[A-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0B\x0C\x0E-\x1F\x21\x23-\x5B\x5D-\x7F]|[\x01-\x09\x0B\x0C\x0E-\x7F])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9]{2,}(?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0B\x0C\x0E-\x1F\x21-\x5A\x53-\x7F]|\\[\x01-\x09\x0B\x0C\x0E-\x7F])+)\])$/i;
  return ({val}: ValidatorData) => {
    const stringedVal = String(val ?? '');
    return emailRegExp.test(stringedVal) ? undefined : message;
  };
};

export const sameAs = (key: string, customMessage?: string): Validator => {
  const message = customMessage ?? 'Значения должны совпадать';
  return ({val, listValues}: ValidatorData) =>
    String(val ?? '') === String((listValues as Record<string, unknown>)?.[key] ?? '') ? undefined : message;
};

export const checked = (customMessage?: string): Validator => {
  const message = customMessage ?? 'Это поле обязательно для заполнения';
  return ({val}: ValidatorData) => (val ? undefined : message);
};

export const onlyLetters = (customMessage?: string): Validator => {
  const message = customMessage ?? 'Это поле может содержать только буквы';
  const lettersRegex = /^[а-яА-Яa-zA-Z]+$/;
  return ({val}: ValidatorData) => {
    const stringedVal = String(val ?? '');
    return lettersRegex.test(stringedVal) ? undefined : message;
  };
};

export const isInteger = (customMessage?: string): Validator => {
  const message = customMessage ?? 'Значение должно быть целым числом';
  return ({val}: ValidatorData) => (Number.isInteger(Number(val)) ? undefined : message);
};

export const notLessThan = (value: number, customMessage?: string): Validator => {
  const message = customMessage ?? `Значение должно быть не меньше ${value}`;
  return ({val}: ValidatorData) => (Number(val) >= value ? undefined : message);
};

export const isValidPhone = (customMessage?: string): Validator => {
  const message = customMessage ?? 'Неверный формат номера телефона';
  return ({val}: ValidatorData) => {
    return val && isValidNumber(val as string, 'RU') ? void 0 : message;
  };
};

export const validate = <T>(data: Partial<T>, rules: Partial<Record<keyof T, Validator[]>>) => {
  const errors: Partial<Record<keyof T, string | undefined>> = {};
  let isValid = true;

  for (const key in rules) {
    const fieldRules = rules[key];
    for (const rule of fieldRules ?? []) {
      const error = rule({
        val: (data as Record<string, string | number | boolean | File | undefined>)[key],
        listValues: data
      });
      if (error) {
        errors[key] = error;
        isValid = false;
        break;
      }
    }
  }

  return {isValid, errors};
};
