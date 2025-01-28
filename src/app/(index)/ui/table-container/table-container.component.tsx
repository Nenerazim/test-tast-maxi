'use client';

import {useDispatch, useSelector} from 'react-redux';
import {SharedUi, SharedLib} from '@shared';
import {UserType, UserLib} from '@units/user';
import Style from '@app/(index)/style.module.scss';
import Link from 'next/link';
import {RootState} from '@widgets/redux-provider';
import {useMemo} from 'react';

export function TableContainer() {
  const dispatch = useDispatch();

  const columns = useMemo<SharedLib.Types.ColumnsType<UserType.TUserEntity>[]>(() => {
    const handleSort = (field: keyof UserType.TUserEntity | 'zipcode') => {
      dispatch(UserLib.Store.sortUsers(field));
      dispatch(UserLib.Store.toggleSortOrder());
    };
    return [
      {header: () => 'Id', cell: (row) => row?.id, actionClick: () => handleSort('id')},
      {header: () => 'Фото', cell: (row) => <span className={Style.thImg}>{row?.name?.[0]}</span>},
      {header: () => 'Имя', cell: (row) => row?.name, actionClick: () => handleSort('name')},
      {header: () => 'Никнейм', cell: (row) => row?.username},
      {header: () => 'Почта', cell: (row) => row?.email},
      {header: () => 'Телефон', cell: (row) => row?.phone},
      {
        header: () => 'Почтовый индек',
        cell: (row) => (row?.address?.zipcode ? row.address?.zipcode : '-'),
        actionClick: () => handleSort('zipcode')
      },
      {
        header: () => '',
        cell: (row) => (
          <Link href={`/confirm-delete/${row.id}`}>
            <SharedUi.Icon width="1.5rem" height="1.5rem" name="close" />
          </Link>
        )
      }
    ];
  }, [dispatch]);

  const userListStore = useSelector((state: RootState) => state.users.users);

  return <SharedUi.Table<UserType.TUserEntity> rows={userListStore} columns={columns} />;
}
