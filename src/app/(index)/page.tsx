import {SharedUi} from '@shared';
import {UserApi} from '@units/user';
import Style from './style.module.scss';
import {InputAction, TableContainer, UserProvider} from './ui';

export default async function PageHome() {
  const userList = await UserApi.getUserList();

  return (
    <main className={Style.main}>
      <div className={Style.actionsTable}>
        <div className={Style.sortContainer}>
          <InputAction />
        </div>
        <SharedUi.Button theme="light" href="/create-user">
          Добавить нового юзера
        </SharedUi.Button>
      </div>
      <section>
        <UserProvider userList={userList}>
          <TableContainer />
        </UserProvider>
      </section>
    </main>
  );
}
