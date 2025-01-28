import {ReactNode} from 'react';
import Style from './Style.module.scss';
import clsx from 'clsx';
import Link from 'next/link';

type ButtonProps = {
  full?: boolean;
  children?: ReactNode;
  theme?: 'light' | 'dark';
  size?: 'six' | 'five';
  disabled?: boolean;
  onClick?: () => void;
  href?: string;
};

export function Button({children, size = 'five', theme = 'dark', onClick, disabled, full, href}: ButtonProps) {
  if (!href) {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={clsx(Style[theme], Style[size], disabled && Style.disabled, Style.button, full && Style.full)}
      >
        {children}
      </button>
    );
  }

  return (
    <Link href={href} className={clsx(Style[theme], Style[size], disabled && Style.disabled, Style.button, full && Style.full)}>
      {children}
    </Link>
  );
}
