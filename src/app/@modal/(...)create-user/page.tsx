'use client';

import {SharedUi, SharedLib} from '@shared';
import {FormEvent, useState} from 'react';
import {useDispatch} from 'react-redux';
import {UserLib} from '@units/user';
import Style from './style.module.scss';
import {useRouter} from 'next/navigation';
import toast from 'react-hot-toast';

type TCreateUser = {
  name: string;
  email: string;
  phone: string;
  username: string;
  zipcode: string;
};
const {required, email, isValidPhone, validate} = SharedLib.Utils;

const rules = {
  email: [email(), required()],
  name: [required()],
  username: [required()],
  phone: [required(), isValidPhone()]
};

export default function CreateUserModal() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [userForm, setUserForm] = useState<Partial<TCreateUser>>({});
  const [error, setError] = useState<Partial<TCreateUser>>({});

  const fillForm = (event: string, type: keyof TCreateUser) => {
    if (error[type]) {
      setError((prevState) => ({
        ...prevState,
        [type]: undefined
      }));
    }
    setUserForm((prevState) => ({
      ...prevState,
      [type]: event
    }));
  };

  const submitForm = (e?: FormEvent<HTMLFormElement>) => {
    const result = validate<TCreateUser>(userForm, rules);
    e?.preventDefault();
    if (result.isValid) {
      dispatch(UserLib.Store.addUser(userForm as TCreateUser));
      router.back();
      toast.success(`Пользователь успешно добавлен`);
    } else {
      setError(result.errors);
    }
  };

  return (
    <SharedUi.ModalTemplate>
      <div className={Style.createModalContainer}>
        <h3>Добавить пользователя</h3>
        <form onSubmit={submitForm} className={Style.formContainer}>
          <SharedUi.Input value={userForm.name} onChange={(value) => fillForm(value, 'name')} error={error.name} label="Имя" placeholder="Имя" />
          <SharedUi.Input
            value={userForm.username}
            onChange={(value) => fillForm(value, 'username')}
            error={error.username}
            placeholder="Никнейм"
            label="Никнейм	"
          />
          <SharedUi.Input
            value={userForm.email}
            onChange={(value) => fillForm(value, 'email')}
            error={error.email}
            placeholder="Почта"
            label="Почта"
          />
          <SharedUi.Input
            value={userForm.phone}
            onChange={(value) => fillForm(value, 'phone')}
            error={error.phone}
            placeholder="Телефон"
            label="Телефон"
            mask="phone"
          />
          <SharedUi.Input
            value={userForm.zipcode}
            onChange={(value) => fillForm(value, 'zipcode')}
            error={error.zipcode}
            placeholder="Почтовый индек"
            label="Почтовый индек"
          />
          <SharedUi.Button>Добавить</SharedUi.Button>
        </form>
      </div>
    </SharedUi.ModalTemplate>
  );
}

// name, - обязательное
// username, - обязательное
// email, - обязательное + проверка корректности введенной почты
// phone - обязательное (маска формата +7 999 999-99-99)
// zipcode - не обязательное
