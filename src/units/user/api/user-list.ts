import {SharedApi, SharedLib} from '@shared';
import {UserType} from '@units/user';

export const getUserList = async () => {
  return await SharedApi.baseClient.get<SharedLib.Types.BaseErrorResponseType, UserType.TUserEntity[], undefined>(
    'https://jsonplaceholder.typicode.com/users'
  );
};
