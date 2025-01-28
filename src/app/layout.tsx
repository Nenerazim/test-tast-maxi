import {ReactNode} from 'react';
import {Metadata} from 'next';
import {MainLayout} from '@widgets/main-layout';
import {cookies} from 'next/headers';
import {Roboto} from 'next/font/google';
import {ReduxProvider} from '@widgets/redux-provider';
import {Toaster} from 'react-hot-toast';
import '@shared/styles/app.scss';

const roboto = Roboto({
  weight: '400',
  subsets: ['latin']
});

type DefaultLayoutProps = {
  children: ReactNode;
  modal?: ReactNode;
};

export const metadata: Metadata = {
  title: 'Макси тестовое задание',
  description: 'Тестовое задание для Макси',
  keywords: 'Таблица с юзерами',
  icons: [
    {url: '/favicon.svg'},
    {url: '/favicon-48x48.png', type: 'image/png', sizes: '48x48'},
    {url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32'},
    {url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16'}
  ]
};

export default async function DefaultLayout({children, modal}: DefaultLayoutProps) {
  const cookieStore = await cookies();
  const theme = (cookieStore.get('theme')?.value as 'light' | 'dark') ?? 'light';

  return (
    <html className={roboto.className} lang="ru">
      <body className={theme}>
        <ReduxProvider>
          <div>{modal}</div>
          <MainLayout>
            <div className="application">
              <MainLayout.Header currentTheme={theme} />
              <div className="content">{children}</div>
              <MainLayout.Footer />
            </div>
          </MainLayout>
        </ReduxProvider>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
