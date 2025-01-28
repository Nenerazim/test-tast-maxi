'use client';

import React, {useEffect, useRef} from 'react';
import {SharedLib, SharedUi} from '@shared';
import {useRouter} from 'next/navigation';
import styles from './style.module.scss';

type ModalTemplateProps = {
  needClickOutside?: boolean;
  children: React.ReactNode;
};

export function ModalTemplate({children, needClickOutside = true}: ModalTemplateProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        router.back();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [router]);

  SharedLib.Hook.useClickOutside(modalRef, () => needClickOutside && router.back());

  return (
    <div className={styles['modal-overlay']}>
      <div className={styles['modal-background']} />
      <div className={styles['modal-content']}>
        <div ref={modalRef} className={styles['modal-box']}>
          <button className={styles['modal-close-btn']} onClick={() => router.back()}>
            <SharedUi.Icon width="1.875rem" height="1.875rem" name="cross" />
          </button>
          {children}
        </div>
      </div>
    </div>
  );
}
