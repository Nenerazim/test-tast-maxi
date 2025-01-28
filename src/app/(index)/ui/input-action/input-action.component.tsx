'use client';

import {SharedUi} from '@shared';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {UserLib} from '@units/user';

export function InputAction() {
  const [phoneInput, setPhoneInput] = useState<string>('');
  const [mailInput, setMailInput] = useState<string>('');
  const [nameInput, setNameInput] = useState<string>('');

  const dispatch = useDispatch();

  return (
    <>
      <SharedUi.Input
        onChange={(value) => {
          setPhoneInput(value);
          dispatch(UserLib.Store.filterUsers({field: 'phone', value}));
        }}
        value={phoneInput}
        label="Телефон"
        size="50"
        placeholder="Поиск по телефону"
      />
      <SharedUi.Input
        onChange={(value) => {
          setMailInput(value);
          dispatch(UserLib.Store.filterUsers({field: 'email', value}));
        }}
        value={mailInput}
        label="Почта"
        size="50"
        placeholder="Поиск по почте"
      />
      <SharedUi.Input
        onChange={(value) => {
          setNameInput(value);
          dispatch(UserLib.Store.filterUsers({field: 'name', value}));
        }}
        value={nameInput}
        label="Имя"
        size="50"
        placeholder="Поиск по имени"
      />
    </>
  );
}
