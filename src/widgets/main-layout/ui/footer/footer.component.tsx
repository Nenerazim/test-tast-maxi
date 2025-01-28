import Link from 'next/link';
import {SharedUi} from '@shared';
import Style from './style.module.scss';

export function FooterComponent() {
  return (
    <footer className={Style.footer}>
      <nav className={Style.nav}>
        <ul>
          <li>
            <Link href="/">На главную</Link>
          </li>
          <li>
            <a href="tel:89997911735">89997911735</a>
          </li>
          <li>
            <a href="mailto:gondor230@gmail.com">gondor230@gmail.com</a>
          </li>
        </ul>
      </nav>
      <Link href="/">
        <SharedUi.Icon width="4rem" height="4rem" name="logo" />
      </Link>
    </footer>
  );
}
