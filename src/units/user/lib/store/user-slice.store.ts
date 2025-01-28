import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {UserType} from '@units/user';
import {SharedLib} from '@shared';

type TCreateUser = {
  name: string;
  email: string;
  phone: string;
  username: string;
  zipcode: string;
};

type UsersState = {
  users: UserType.TUserEntity[];
  originalUsers: UserType.TUserEntity[];
  sortOrder: 'asc' | 'desc';
};

const initialState: UsersState = {
  users: [],
  originalUsers: [],
  sortOrder: 'asc'
};

export const userSlice = createSlice({
  name: SharedLib.Enums.NameSlice.USERS,
  initialState,
  reducers: {
    addUsers: (state, action: PayloadAction<UserType.TUserEntity[]>) => {
      if (state.originalUsers.length === 0) {
        state.originalUsers = action.payload;
        state.users = action.payload;
      }
    },

    addUser: (state, action: PayloadAction<TCreateUser>) => {
      const formatUser: UserType.TUserEntity = {
        id: state.originalUsers.length + 1,
        name: action.payload.name,
        email: action.payload.email,
        phone: action.payload.phone,
        username: action.payload.username,
        address: {
          zipcode: action.payload.zipcode
        }
      };

      state.originalUsers.push(formatUser);
      state.users.push(formatUser);
    },

    deleteUser: (state, action: PayloadAction<number>) => {
      state.originalUsers = state.originalUsers.filter((user) => user.id !== action.payload);
      state.users = state.users.filter((user) => user.id !== action.payload);
    },

    sortUsers: (state, action: PayloadAction<keyof UserType.TUserEntity | 'zipcode'>) => {
      const field = action.payload;
      const order = state.sortOrder;

      state.users = [...state.originalUsers].sort((a, b) => {
        let comparison = 0;

        switch (true) {
          case field === 'zipcode':
            comparison = (a.address?.zipcode || '').localeCompare(b.address?.zipcode || '');
            break;
          case typeof a[field as keyof UserType.TUserEntity] === 'string' && typeof b[field as keyof UserType.TUserEntity] === 'string':
            comparison = (a[field] as string).localeCompare(b[field] as string);
            break;
          case typeof a[field as keyof UserType.TUserEntity] === 'number' && typeof b[field as keyof UserType.TUserEntity] === 'number':
            comparison = (a[field] as number) - (b[field] as number);
            break;
        }

        return order === 'asc' ? comparison : -comparison;
      });
    },

    toggleSortOrder: (state) => {
      state.sortOrder = state.sortOrder === 'asc' ? 'desc' : 'asc';
    },

    filterUsers: (state, action: PayloadAction<{field: keyof UserType.TUserEntity; value: string}>) => {
      const {field, value} = action.payload;
      state.users = state.originalUsers.filter((user) => {
        if (typeof user[field] === 'string') {
          return (user[field] as string).toLowerCase().includes(value.toLowerCase());
        }
        return false;
      });
    }
  }
});

export const {addUser, deleteUser, sortUsers, filterUsers, addUsers, toggleSortOrder} = userSlice.actions;

export const userReducer = userSlice.reducer;
