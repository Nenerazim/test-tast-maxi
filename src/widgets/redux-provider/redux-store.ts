import {configureStore} from '@reduxjs/toolkit';
import {UserLib} from '@units/user';
export const store = configureStore({
  reducer: {users: UserLib.Store.userReducer}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
