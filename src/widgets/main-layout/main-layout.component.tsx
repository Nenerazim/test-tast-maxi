import {HeaderComponent, FooterComponent} from './ui';
import {ReactNode} from 'react';

type DefaultLayoutProps = {
  children?: ReactNode;
};

export function MainLayout({children}: DefaultLayoutProps) {
  return <div>{children}</div>;
}
MainLayout.Header = HeaderComponent;
MainLayout.Footer = FooterComponent;
