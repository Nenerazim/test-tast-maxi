'use client';

import {UserLib, UserType} from '@units/user';
import {useDispatch} from 'react-redux';
import {ReactNode} from 'react';

type UserProviderProps = {
  userList: UserType.TUserEntity[];
  children: ReactNode;
};

export function UserProvider({userList, children}: UserProviderProps) {
  const dispatch = useDispatch();
  dispatch(UserLib.Store.addUsers(userList));
  return children;
}
