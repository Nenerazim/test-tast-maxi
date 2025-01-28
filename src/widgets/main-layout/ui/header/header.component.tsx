'use client';

import {SharedUi} from '@shared';
import Cookie from 'js-cookie';
import {useCallback, useState} from 'react';
import Style from './style.module.scss';
import Link from 'next/link';

type HeaderProps = {
  currentTheme: 'light' | 'dark';
};

export function HeaderComponent({currentTheme}: HeaderProps) {
  const [theme, setNewTheme] = useState<'light' | 'dark'>(currentTheme);

  const setTheme = useCallback(() => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    Cookie.set('theme', newTheme, {expires: 7, path: ''});
    document.body.className = newTheme;
    setNewTheme(newTheme);
  }, [theme]);

  return (
    <header className={Style.header}>
      <nav>
        <Link href="/">
          <SharedUi.Icon width="3rem" height="3rem" name="logo" />
        </Link>
      </nav>
      <button className={Style.switchTheme} onClick={() => setTheme()}>
        <SharedUi.Icon width="1.5rem" height="1.5rem" name={`${theme}-icon`} />
      </button>
    </header>
  );
}
