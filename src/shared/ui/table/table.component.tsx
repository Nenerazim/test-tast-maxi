import {SharedLib} from '@shared';
import styles from './style.module.scss';
import clsx from 'clsx';

type TableProps<T> = {
  rows: T[];
  columns: SharedLib.Types.ColumnsType<T>[];
};

export function Table<T>({rows, columns}: TableProps<T>) {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={`${index}-th`} onClick={column.actionClick} className={clsx(styles.tableHeader, column.actionClick && styles.thAction)}>
                {column.header()}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className={styles.tableRow}>
              {columns.map((column, index) => (
                <td key={`${index}-td`} className={styles.tableCell}>
                  {column.cell(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {rows.length === 0 && <span className={styles.notFound}>Ничего не найдено</span>}
    </div>
  );
}
