'use client';

import {SharedUi} from '@shared';
import {useRouter} from 'next/navigation';
import {useDispatch} from 'react-redux';
import {UserLib} from '@units/user';
import toast from 'react-hot-toast';

type ActionsProps = {
  userId: string;
};

export function Actions({userId}: ActionsProps) {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(UserLib.Store.deleteUser(Number(userId)));
    toast.success(`Вы успешно удалили пользователя №${userId}`);
    router.back();
  };

  return (
    <>
      <SharedUi.Button full theme="light" onClick={handleDelete}>
        Да
      </SharedUi.Button>
      <SharedUi.Button onClick={() => router.back()} full>
        Нет
      </SharedUi.Button>
    </>
  );
}
