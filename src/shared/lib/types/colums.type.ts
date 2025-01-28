import {ReactNode} from 'react';

export type ColumnsType<T> = {
  header: () => ReactNode;
  cell: (row: T) => ReactNode;
  actionClick?: () => void;
};
