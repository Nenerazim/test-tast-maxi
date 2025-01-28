'use client';

import {Provider} from 'react-redux';
import {ReactNode} from 'react';
import {store} from './redux-store.ts';
type ReduxProviderProps = {
  children: ReactNode;
};

export function ReduxProvider({children}: ReduxProviderProps) {
  return <Provider store={store}>{children}</Provider>;
}
